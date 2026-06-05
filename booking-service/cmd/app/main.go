package main

import (
	"context"
	"log"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	_ "github.com/d1xer111/water-transport-rental/booking-service/docs"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/delivery"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/domain"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/images"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/repository"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

var imageDir string

func autoMigrate(pool *pgxpool.Pool) {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS transports (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			description TEXT,
			price_per_hour NUMERIC(10,2) NOT NULL,
			capacity INT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS bookings (
			id SERIAL PRIMARY KEY,
			user_id INT NOT NULL,
			transport_id INT REFERENCES transports(id) ON DELETE CASCADE,
			booking_date DATE NOT NULL,
			hours INT NOT NULL,
			status VARCHAR(50) DEFAULT 'pending',
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,
	}

	for _, q := range queries {
		_, err := pool.Exec(context.Background(), q)
		if err != nil {
			log.Fatalf("migration failed: %v", err)
		}
	}
	log.Println("migrations applied successfully")
}

func seedTransports(repo *repository.TransportRepository) {
	existing, err := repo.GetAllTransports()
	if err != nil {
		log.Printf("seed: error checking transports: %v", err)
		return
	}
	if len(existing) > 0 {
		log.Printf("seed: clearing %d stale transports and resetting ID sequence", len(existing))
		repo.DeleteAll()
		repo.ResetSequence()
	}

	seeds := []struct {
		name        string
		description string
		price       float64
		capacity    int
	}{
		{"Океанская безмятежность", "Роскошная яхта премиум-класса для незабываемых путешествий. Идеально подходит для мероприятий и отдыха.", 15000, 12},
		{"Дух наветренной стороны", "Элегантная парусная лодка для любителей морских приключений и романтических прогулок.", 8500, 6},
		{"Водная искра", "Скоростной гидроцикл для активного отдыха и водных развлечений.", 3500, 2},
		{"Капитанский бриз", "Комфортабельный катер для семейных прогулок и рыбалки. Оснащен всем необходимым.", 7000, 8},
		{"Морской дракон", "Эксклюзивная гоночная яхта для опытных мореплавателей.", 22000, 10},
		{"Лазурный берег", "Просторный катамаран для путешествий большой компанией. Устойчив и безопасен.", 12000, 16},
	}

	for _, s := range seeds {
		err := repo.CreateTransport(domain.Transport{
			Name:         s.name,
			Description:  s.description,
			PricePerHour: s.price,
			Capacity:     s.capacity,
		})
		if err != nil {
			log.Printf("seed error: %v", err)
		}
	}
	log.Printf("seeded %d transports", len(seeds))
}

func main() {
	log.Println("booking-service starting")

	wd, _ := os.Getwd()
	imageDir = filepath.Join(wd, "static", "images")
	log.Printf("image directory: %s", imageDir)

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("booking-service failed to load .env file:", err)
	}

	pool, err := repository.ConnectDB()
	if err != nil {
		log.Fatal("booking-service database connection failed:", err)
	}

	defer func() {
		log.Println("booking-service database pool closing")
		pool.Close()
	}()

	autoMigrate(pool)

	transportRepo := repository.NewTransportRepository(pool)
	transportService := service.NewTransportService(transportRepo)
	transportHandler := delivery.NewTransportHandler(transportService)

	bookingRepo := repository.NewBookingRepository(pool)
	bookingService := service.NewBookingService(bookingRepo)
	bookingHandler := delivery.NewBookingHandler(bookingService)

	seedTransports(transportRepo)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	}))

	go delivery.HandleMessages()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "booking service working"})
	})

	r.GET("/ws", delivery.HandleConnections)

	r.POST("/transports", transportHandler.CreateTransport)
	r.GET("/transports", transportHandler.GetAllTransports)

	r.POST("/bookings", bookingHandler.CreateBooking)
	r.GET("/bookings", bookingHandler.GetAllBookings)

	r.PATCH("/bookings/:id/approve", delivery.AdminOnly(), bookingHandler.ApproveBooking)
	r.PATCH("/bookings/:id/reject", delivery.AdminOnly(), bookingHandler.RejectBooking)

	r.GET("/images/:id", func(c *gin.Context) {
		idStr := strings.TrimSuffix(c.Param("id"), filepath.Ext(c.Param("id")))
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "invalid id"})
			return
		}
		localPath := filepath.Join(imageDir, idStr+".jpg")
		if _, err := os.Stat(localPath); err == nil {
			c.Header("Cache-Control", "public, max-age=86400")
			c.File(localPath)
			return
		}
		data, err := images.GenerateBoatImage(id)
		if err != nil {
			c.JSON(500, gin.H{"error": "failed to generate image"})
			return
		}
		c.Header("Content-Type", "image/png")
		c.Header("Cache-Control", "public, max-age=86400")
		c.Data(200, "image/png", data)
	})

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	log.Println("booking-service HTTP server started on port 8081")

	if err := r.Run(":8081"); err != nil {
		log.Fatal("booking-service HTTP server failed:", err)
	}
}
