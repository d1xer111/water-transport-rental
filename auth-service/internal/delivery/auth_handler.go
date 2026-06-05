package delivery

import (
	"log"
	"net/http"

	"github.com/d1xer111/water-transport-rental/auth-service/internal/domain"
	"github.com/d1xer111/water-transport-rental/auth-service/internal/service"
	"github.com/d1xer111/water-transport-rental/auth-service/pkg/jwt"
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

	user, err := h.authService.Register(req)
	if err != nil {
		log.Println("auth-service register failed:", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	token, err := jwt.GenerateToken(user.ID, user.Role)
	if err != nil {
		log.Println("auth-service token generation failed:", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "token generation failed",
		})
		return
	}

	log.Println("auth-service user registered:", req.Email)

	c.JSON(http.StatusCreated, gin.H{
		"message":  "user created",
		"token":    token,
		"username": user.Username,
		"role":     user.Role,
	})
}

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

	token, err := jwt.GenerateToken(user.ID, user.Role)
	if err != nil {
		log.Println("auth-service token generation failed:", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "token generation failed",
		})
		return
	}

	log.Println("auth-service login success:", user.Email)

	c.JSON(http.StatusOK, gin.H{
		"token":    token,
		"username": user.Username,
		"role":     user.Role,
	})
}
