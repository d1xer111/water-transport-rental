package delivery

import (
	sharedjwt "github.com/d1xer111/water-transport-rental/booking-service/pkg/jwt"

	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func AdminOnly() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "missing token",
			})
			c.Abort()
			return
		}

		tokenString := strings.Split(authHeader, " ")[1]

		claims, err := sharedjwt.ParseToken(tokenString)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "invalid token",
			})
			c.Abort()
			return
		}

		role := claims["role"].(string)

		if role != "admin" {
			c.JSON(http.StatusForbidden, gin.H{
				"error": "admin access only",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}
