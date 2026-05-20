package service

import (
	sharedjwt "github.com/d1xer111/water-transport-rental/pkg/jwt"

	"errors"

	"github.com/d1xer111/water-transport-rental/auth-service/internal/model"
	"github.com/d1xer111/water-transport-rental/auth-service/internal/repository"

	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	repo *repository.UserRepository
}

func NewAuthService(repo *repository.UserRepository) *AuthService {
	return &AuthService{
		repo: repo,
	}
}

func (s *AuthService) Register(req model.RegisterRequest) error {
	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(req.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return err
	}

	user := model.User{
		Email:        req.Email,
		PasswordHash: string(hashedPassword),
		Role:         "user",
	}

	return s.repo.CreateUser(user)
}

func (s *AuthService) Login(req model.LoginRequest) (string, error) {
	user, err := s.repo.GetUserByEmail(req.Email)

	if err != nil {
		return "", errors.New("invalid email or password")
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.PasswordHash),
		[]byte(req.Password),
	)

	if err != nil {
		return "", errors.New("invalid email or password")
	}

	token, err := sharedjwt.GenerateToken(
	user.ID,
	user.Role,
)

	if err != nil {
		return "", err
	}

	return token, nil
}
