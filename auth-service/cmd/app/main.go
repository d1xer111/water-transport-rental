package main

import (
	"log"

	"water-transport-rental/auth-service/internal/database"
	"water-transport-rental/auth-service/internal/handler"
	"water-transport-rental/auth-service/internal/middleware"
	"water-transport-rental/auth-service/internal/repository"
	"water-transport-rental/auth-service/internal/service"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	conn, err := database.ConnectDB()

	if err != nil {
		log.Fatal("Database connection failed")
	}

	defer conn.Close(nil)

	userRepo := repository.NewUserRepository(conn)

	authService := service.NewAuthService(userRepo)

	authHandler := handler.NewAuthHandler(authService)

	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
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
protected.Use(middleware.AuthMiddleware())
{
	protected.GET("/profile", func(c *gin.Context) {
		userID, _ := c.Get("user_id")
		role, _ := c.Get("role")

		c.JSON(200, gin.H{
			"user_id": userID,
			"role":    role,
		})
	})
}

	r.Run(":8080")
}
