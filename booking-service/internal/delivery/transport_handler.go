package delivery

import (
	"net/http"

	"github.com/d1xer111/water-transport-rental/booking-service/internal/domain"
	"github.com/d1xer111/water-transport-rental/booking-service/internal/service"
	"github.com/d1xer111/water-transport-rental/booking-service/pkg/logger"

	"github.com/gin-gonic/gin"
)

type TransportHandler struct {
	service *service.TransportService
}

func NewTransportHandler(service *service.TransportService) *TransportHandler {
	return &TransportHandler{
		service: service,
	}
}

// CreateTransport godoc
// @Summary Create transport
// @Description Create new water transport
// @Tags transports
// @Accept json
// @Produce json
// @Param transport body model.Transport true "Transport"
// @Success 201 {object} map[string]string
// @Router /transports [post]
func (h *TransportHandler) CreateTransport(c *gin.Context) {
	var transport domain.Transport

	if err := c.ShouldBindJSON(&transport); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := h.service.CreateTransport(transport)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	logger.Log.Info("transport created")

	c.JSON(http.StatusCreated, gin.H{
		"message": "transport created",
	})
}

// GetAllTransports godoc
// @Summary Get all transports
// @Description Get list of transports
// @Tags transports
// @Produce json
// @Success 200 {array} model.Transport
// @Router /transports [get]
func (h *TransportHandler) GetAllTransports(c *gin.Context) {
	transports, err := h.service.GetAllTransports()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, transports)
}
