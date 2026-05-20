// @title Booking Service API
// @version 1.0
// @description Water transport booking service
// @host localhost:8081
// @BasePath /
package main

import (
	"log"

	"github.com/d1xer111/water-transport-rental/booking-service/internal/database"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/handler"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/repository"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/service"
	_ "github.com/d1xer111/water-transport-rental/booking-service/docs"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/logger"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/websocket"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/middleware"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
	logger.InitLogger()

	defer logger.Log.Sync()

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	conn, err := database.ConnectDB()

	if err != nil {
		log.Fatal("Database connection failed")
	}

	defer conn.Close(nil)

	transportRepo := repository.NewTransportRepository(conn)

	transportService := service.NewTransportService(transportRepo)

	transportHandler := handler.NewTransportHandler(transportService)

	bookingRepo := repository.NewBookingRepository(conn)

	bookingService := service.NewBookingService(bookingRepo)

	bookingHandler := handler.NewBookingHandler(bookingService)

	r := gin.Default()

	go websocket.HandleMessages()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "booking service working",
		})
	})

	r.GET("/ws", websocket.HandleConnections)

	r.POST("/transports", transportHandler.CreateTransport)

	r.GET("/transports", transportHandler.GetAllTransports)

	r.POST("/bookings", bookingHandler.CreateBooking)

	r.GET("/bookings", bookingHandler.GetAllBookings)

	r.PATCH(
	"/bookings/:id/approve",
	middleware.AdminOnly(),
	bookingHandler.ApproveBooking,
	)

	r.PATCH(
	"/bookings/:id/reject",
	middleware.AdminOnly(),
	bookingHandler.RejectBooking,
	)

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Run(":8081")
}