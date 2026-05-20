package mocks

import (
	"github.com/d1xer111/water-transport-rental/auth-service/internal/model"

	"github.com/stretchr/testify/mock"
)

type UserRepositoryMock struct {
	mock.Mock
}

func (m *UserRepositoryMock) CreateUser(user model.User) error {
	args := m.Called(user)

	return args.Error(0)
}

func (m *UserRepositoryMock) GetUserByEmail(email string) (model.User, error) {
	args := m.Called(email)

	return args.Get(0).(model.User), args.Error(1)
}
