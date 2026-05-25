package delivery

import (
	"log"
	"net/http"
	"strconv"

	"github.com/d1xer111/water-transport-rental/booking-service/internal/domain"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/service"
	"github.com/gin-gonic/gin"
)

type BookingHandler struct {
	service *service.BookingService
}

func NewBookingHandler(service *service.BookingService) *BookingHandler {
	return &BookingHandler{
		service: service,
	}
}

// CreateBooking godoc
// @Summary Create booking
// @Tags bookings
// @Accept json
// @Produce json
// @Param booking body domain.Booking true "Booking"
// @Success 201 {object} map[string]interface{}
// @Router /bookings [post]
func (h *BookingHandler) CreateBooking(c *gin.Context) {
	var booking domain.Booking

	log.Println("booking-service create booking request received")

	if err := c.ShouldBindJSON(&booking); err != nil {
		log.Println("booking-service create booking validation failed:", err)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := h.service.CreateBooking(booking)
	if err != nil {
		log.Println("booking-service create booking failed:", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	SendNotification("new booking created")

	log.Println("booking-service booking created successfully")

	c.JSON(http.StatusCreated, gin.H{
		"message": "booking created",
	})
}

// GetAllBookings godoc
// @Summary Get all bookings
// @Tags bookings
// @Produce json
// @Success 200 {array} domain.Booking
// @Router /bookings [get]
func (h *BookingHandler) GetAllBookings(c *gin.Context) {
	log.Println("booking-service get all bookings request received")

	bookings, err := h.service.GetAllBookings()
	if err != nil {
		log.Println("booking-service get all bookings failed:", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	log.Println("booking-service get all bookings success")

	c.JSON(http.StatusOK, bookings)
}

// ApproveBooking godoc
// @Summary Approve booking
// @Tags bookings
// @Produce json
// @Param id path int true "Booking ID"
// @Success 200 {object} map[string]interface{}
// @Router /bookings/{id}/approve [patch]
func (h *BookingHandler) ApproveBooking(c *gin.Context) {
	idParam := c.Param("id")

	log.Println("booking-service approve booking request received:", idParam)

	id, err := strconv.Atoi(idParam)
	if err != nil {
		log.Println("booking-service approve booking invalid id:", err)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid booking id",
		})
		return
	}

	err = h.service.ApproveBooking(id)
	if err != nil {
		log.Println("booking-service approve booking failed:", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	log.Println("booking-service booking approved:", id)

	c.JSON(http.StatusOK, gin.H{
		"message": "booking approved",
	})
}

// RejectBooking godoc
// @Summary Reject booking
// @Tags bookings
// @Produce json
// @Param id path int true "Booking ID"
// @Success 200 {object} map[string]interface{}
// @Router /bookings/{id}/reject [patch]
func (h *BookingHandler) RejectBooking(c *gin.Context) {
	idParam := c.Param("id")

	log.Println("booking-service reject booking request received:", idParam)

	id, err := strconv.Atoi(idParam)
	if err != nil {
		log.Println("booking-service reject booking invalid id:", err)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid booking id",
		})
		return
	}

	err = h.service.RejectBooking(id)
	if err != nil {
		log.Println("booking-service reject booking failed:", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	log.Println("booking-service booking rejected:", id)

	c.JSON(http.StatusOK, gin.H{
		"message": "booking rejected",
	})
}
