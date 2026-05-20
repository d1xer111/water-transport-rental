package mocks

import (
	"github.com/d1xer111/water-transport-rental/booking-service/internal/model"

	"github.com/stretchr/testify/mock"
)

type TransportRepositoryMock struct {
	mock.Mock
}

func (m *TransportRepositoryMock) CreateTransport(
	t model.Transport,
) error {

	args := m.Called(t)

	return args.Error(0)
}

func (m *TransportRepositoryMock) GetAllTransports() (
	[]model.Transport,
	error,
) {

	args := m.Called()

	return args.Get(0).([]model.Transport), args.Error(1)
}