package service

import (
	"errors"

	"github.com/d1xer111/water-transport-rental/auth-service/internal/domain"
	"golang.org/x/crypto/bcrypt"
)

type UserRepositoryInterface interface {
	CreateUser(user domain.User) error
	GetUserByEmail(email string) (domain.User, error)
}

type AuthService struct {
	userRepo UserRepositoryInterface
}

func NewAuthService(userRepo UserRepositoryInterface) *AuthService {
	return &AuthService{
		userRepo: userRepo,
	}
}

func (s *AuthService) Register(req domain.RegisterRequest) (domain.User, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(req.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return domain.User{}, err
	}

	user := domain.User{
		Username: req.Username,
		Email:    req.Email,
		Password: string(hashedPassword),
		Role:     "user",
	}

	err = s.userRepo.CreateUser(user)
	if err != nil {
		return domain.User{}, err
	}

	return s.userRepo.GetUserByEmail(req.Email)
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
