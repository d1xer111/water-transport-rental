package delivery

import (
	"log"
	"net/http"

	"github.com/d1xer111/water-transport-rental/auth-service/internal/domain"
	"github.com/d1xer111/water-transport-rental/auth-service/internal/service"
	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	authService *service.AuthService
}

func NewAuthHandler(authService *service.AuthService) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

// Register godoc
// @Summary Register user
// @Description Creates a new user account
// @Tags auth
// @Accept json
// @Produce json
// @Param user body domain.RegisterRequest true "Register data"
// @Success 201 {object} map[string]interface{}
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /auth/register [post]
func (h *AuthHandler) Register(c *gin.Context) {
	var req domain.RegisterRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		log.Println("auth-service register request validation failed:", err)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	log.Println("auth-service register request received:", req.Email)

	err := h.authService.Register(req)
	if err != nil {
		log.Println("auth-service register failed:", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	log.Println("auth-service user registered:", req.Email)

	c.JSON(http.StatusCreated, gin.H{
		"message": "user created",
	})
}

// Login godoc
// @Summary Login user
// @Description Authenticates user by email and password
// @Tags auth
// @Accept json
// @Produce json
// @Param user body domain.LoginRequest true "Login data"
// @Success 200 {object} map[string]interface{}
// @Failure 400 {object} map[string]interface{}
// @Failure 401 {object} map[string]interface{}
// @Router /auth/login [post]
func (h *AuthHandler) Login(c *gin.Context) {
	var req domain.LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		log.Println("auth-service login request validation failed:", err)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	log.Println("auth-service login request received:", req.Email)

	user, err := h.authService.Login(req)
	if err != nil {
		log.Println("auth-service login failed:", err)

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "invalid credentials",
		})
		return
	}

	log.Println("auth-service login success:", user.Email)

	c.JSON(http.StatusOK, gin.H{
		"username": user.Username,
		"role":     user.Role,
	})
}