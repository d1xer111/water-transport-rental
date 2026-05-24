// @title Booking Service API
// @version 1.0
// @description Water transport booking service
// @host localhost:8081
// @BasePath /
package main

import (
	"context"
	"log"

	_ "github.com/d1xer111/water-transport-rental/booking-service/docs"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/delivery"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/repository"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/service"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
	log.Println("booking-service starting")

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("booking-service failed to load .env file:", err)
	}

	log.Println("booking-service env loaded")

	conn, err := repository.ConnectDB()
	if err != nil {
		log.Fatal("booking-service database connection failed:", err)
	}

	log.Println("booking-service database connected")

	defer func() {
		log.Println("booking-service database connection closing")
		conn.Close(context.Background())
	}()

	transportRepo := repository.NewTransportRepository(conn)
	transportService := service.NewTransportService(transportRepo)
	transportHandler := delivery.NewTransportHandler(transportService)

	bookingRepo := repository.NewBookingRepository(conn)
	bookingService := service.NewBookingService(bookingRepo)
	bookingHandler := delivery.NewBookingHandler(bookingService)

	r := gin.Default()

	go delivery.HandleMessages()
	log.Println("booking-service websocket message handler started")

	r.GET("/ping", func(c *gin.Context) {
		log.Println("booking-service ping request received")

		c.JSON(200, gin.H{
			"message": "booking service working",
		})
	})

	r.GET("/ws", delivery.HandleConnections)

	r.POST("/transports", transportHandler.CreateTransport)
	r.GET("/transports", transportHandler.GetAllTransports)

	r.POST("/bookings", bookingHandler.CreateBooking)
	r.GET("/bookings", bookingHandler.GetAllBookings)

	r.PATCH(
		"/bookings/:id/approve",
		delivery.AdminOnly(),
		bookingHandler.ApproveBooking,
	)

	r.PATCH(
		"/bookings/:id/reject",
		delivery.AdminOnly(),
		bookingHandler.RejectBooking,
	)

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	log.Println("booking-service HTTP server started on port 8081")

	if err := r.Run(":8081"); err != nil {
		log.Fatal("booking-service HTTP server failed:", err)
	}
}
