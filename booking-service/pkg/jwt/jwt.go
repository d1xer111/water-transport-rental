package pkg

import (
	"errors"
	"os"

	gojwt "github.com/golang-jwt/jwt/v5"
)

func ParseToken(tokenString string) (gojwt.MapClaims, error) {
	secret := os.Getenv("JWT_SECRET")

	token, err := gojwt.Parse(tokenString, func(token *gojwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(gojwt.MapClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}