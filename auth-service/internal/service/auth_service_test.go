package service

import (
	"errors"
	"testing"

	"github.com/d1xer111/water-transport-rental/auth-service/internal/domain"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"golang.org/x/crypto/bcrypt"
)

type MockUserRepository struct {
	mock.Mock
}

func (m *MockUserRepository) CreateUser(user domain.User) error {
	args := m.Called(user)
	return args.Error(0)
}

func (m *MockUserRepository) GetUserByEmail(email string) (domain.User, error) {
	args := m.Called(email)
	return args.Get(0).(domain.User), args.Error(1)
}

func TestRegisterSuccess(t *testing.T) {
	repo := new(MockUserRepository)
	service := NewAuthService(repo)

	req := domain.RegisterRequest{
		Username: "Admin",
		Email:    "admin@test.com",
		Password: "admin123",
	}

	repo.On("CreateUser", mock.AnythingOfType("domain.User")).Return(nil)

	err := service.Register(req)

	assert.NoError(t, err)
	repo.AssertExpectations(t)
}

func TestRegisterRepositoryError(t *testing.T) {
	repo := new(MockUserRepository)
	service := NewAuthService(repo)

	req := domain.RegisterRequest{
		Username: "Admin",
		Email:    "admin@test.com",
		Password: "admin123",
	}

	repo.On("CreateUser", mock.AnythingOfType("domain.User")).Return(errors.New("db error"))

	err := service.Register(req)

	assert.Error(t, err)
	repo.AssertExpectations(t)
}

func TestLoginSuccess(t *testing.T) {
	repo := new(MockUserRepository)
	service := NewAuthService(repo)

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.DefaultCost)

	user := domain.User{
		ID:       1,
		Username: "Admin",
		Email:    "admin@test.com",
		Password: string(hashedPassword),
		Role:     "admin",
	}

	repo.On("GetUserByEmail", "admin@test.com").Return(user, nil)

	result, err := service.Login(domain.LoginRequest{
		Email:    "admin@test.com",
		Password: "admin123",
	})

	assert.NoError(t, err)
	assert.Equal(t, "Admin", result.Username)
	assert.Equal(t, "admin", result.Role)
	repo.AssertExpectations(t)
}

func TestLoginInvalidEmail(t *testing.T) {
	repo := new(MockUserRepository)
	service := NewAuthService(repo)

	repo.On("GetUserByEmail", "wrong@test.com").Return(domain.User{}, errors.New("not found"))

	_, err := service.Login(domain.LoginRequest{
		Email:    "wrong@test.com",
		Password: "admin123",
	})

	assert.Error(t, err)
	assert.Equal(t, "invalid email", err.Error())
	repo.AssertExpectations(t)
}

func TestLoginInvalidPassword(t *testing.T) {
	repo := new(MockUserRepository)
	service := NewAuthService(repo)

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.DefaultCost)

	user := domain.User{
		Email:    "admin@test.com",
		Password: string(hashedPassword),
	}

	repo.On("GetUserByEmail", "admin@test.com").Return(user, nil)

	_, err := service.Login(domain.LoginRequest{
		Email:    "admin@test.com",
		Password: "wrong",
	})

	assert.Error(t, err)
	assert.Equal(t, "invalid password", err.Error())
	repo.AssertExpectations(t)
}