package main

import (
	"context"
	"log"
	"os"

	"github.com/d1xer111/water-transport-rental/auth-service/internal/delivery"
	"github.com/d1xer111/water-transport-rental/auth-service/internal/repository"
	"github.com/d1xer111/water-transport-rental/auth-service/internal/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	log.Println("auth-service starting")

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("auth-service failed to load .env file:", err)
	}

	log.Println("auth-service env loaded")
	log.Println("DB_HOST =", os.Getenv("DB_HOST"))
	log.Println("DB_PORT =", os.Getenv("DB_PORT"))
	log.Println("DB_USER =", os.Getenv("DB_USER"))
	log.Println("DB_NAME =", os.Getenv("DB_NAME"))

	conn, err := repository.ConnectDB()
	if err != nil {
		log.Fatal("auth-service database connection failed:", err)
	}

	log.Println("auth-service database connected")

	defer func() {
		log.Println("auth-service database connection closing")
		conn.Close(context.Background())
	}()

	userRepo := repository.NewUserRepository(conn)
	authService := service.NewAuthService(userRepo)
	authHandler := delivery.NewAuthHandler(authService)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	}))

	r.GET("/ping", func(c *gin.Context) {
		log.Println("auth-service ping request received")

		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	auth := r.Group("/auth")
	{
		auth.POST("/register", authHandler.Register)
		auth.POST("/login", authHandler.Login)
	}

	protected := r.Group("/api")
	protected.Use(delivery.AuthMiddleware())
	{
		protected.GET("/profile", func(c *gin.Context) {
			log.Println("auth-service profile request received")

			userID, _ := c.Get("user_id")
			role, _ := c.Get("role")

			c.JSON(200, gin.H{
				"user_id": userID,
				"role":    role,
			})
		})
	}

	log.Println("auth-service HTTP server started on port 8080")

	if err := r.Run(":8080"); err != nil {
		log.Fatal("auth-service HTTP server failed:", err)
	}
}
