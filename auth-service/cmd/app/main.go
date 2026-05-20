package main

import (
	"log"
	"os"

	"github.com/d1xer111/water-transport-rental/auth-service/internal/database"
	"github.com/d1xer111/water-transport-rental/auth-service/internal/handler"
	"github.com/d1xer111/water-transport-rental/auth-service/internal/middleware"
	"github.com/d1xer111/water-transport-rental/auth-service/internal/repository"
	"github.com/d1xer111/water-transport-rental/auth-service/internal/service"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/gin-contrib/cors"
)

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	log.Println("DB_HOST =", os.Getenv("DB_HOST"))
	log.Println("DB_PORT =", os.Getenv("DB_PORT"))
	log.Println("DB_USER =", os.Getenv("DB_USER"))
	log.Println("DB_NAME =", os.Getenv("DB_NAME"))

	conn, err := database.ConnectDB()

	if err != nil {
		log.Fatal(err)
	}

	defer conn.Close(nil)

	userRepo := repository.NewUserRepository(conn)

	authService := service.NewAuthService(userRepo)

	authHandler := handler.NewAuthHandler(authService)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
    AllowOrigins: []string{"http://localhost:5173"},
    AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
    AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
}))

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