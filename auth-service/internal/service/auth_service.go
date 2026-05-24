package service

import (
	"errors"

	"github.com/d1xer111/water-transport-rental/auth-service/internal/domain"
	"github.com/d1xer111/water-transport-rental/auth-service/internal/repository"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	userRepo *repository.UserRepository
}

func NewAuthService(userRepo *repository.UserRepository) *AuthService {
	return &AuthService{
		userRepo: userRepo,
	}
}

func (s *AuthService) Register(req domain.RegisterRequest) error {
	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(req.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return err
	}

	user := domain.User{
		Username: req.Username,
		Email:    req.Email,
		Password: string(hashedPassword),
		Role:     "user",
	}

	return s.userRepo.CreateUser(user)
}

func (s *AuthService) Login(req domain.LoginRequest) (domain.User, error) {
	user, err := s.userRepo.GetUserByEmail(req.Email)

	if err != nil {
		return domain.User{}, errors.New("invalid email")
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(req.Password),
	)

	if err != nil {
		return domain.User{}, errors.New("invalid password")
	}

	return user, nil
}
