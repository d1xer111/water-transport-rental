package mocks

import (
	"github.com/d1xer111/water-transport-rental/booking-service/internal/domain"

	"github.com/stretchr/testify/mock"
)

type TransportRepositoryMock struct {
	mock.Mock
}

func (m *TransportRepositoryMock) CreateTransport(
	t domain.Transport,
) error {

	args := m.Called(t)

	return args.Error(0)
}

func (m *TransportRepositoryMock) GetAllTransports() (
	[]domain.Transport,
	error,
) {

	args := m.Called()

	return args.Get(0).([]domain.Transport), args.Error(1)
}
