package service

import (
	"testing"

	"water-transport-rental/booking-service/internal/model"
	"water-transport-rental/booking-service/internal/mocks"

	"github.com/stretchr/testify/assert"
)

func TestCreateTransport(t *testing.T) {
	mockRepo := new(mocks.TransportRepositoryMock)

	service := NewTransportService(mockRepo)

	transport := model.Transport{
		Name:         "Test Boat",
		Description:  "Test",
		PricePerHour: 100,
		Capacity:     5,
	}

	mockRepo.
		On("CreateTransport", transport).
		Return(nil)

	err := service.CreateTransport(transport)

	assert.NoError(t, err)

	mockRepo.AssertExpectations(t)
}

func TestGetAllTransports(t *testing.T) {
	mockRepo := new(mocks.TransportRepositoryMock)

	service := NewTransportService(mockRepo)

	transports := []model.Transport{
		{
			ID:           1,
			Name:         "Boat",
			Description:  "Desc",
			PricePerHour: 200,
			Capacity:     4,
		},
	}

	mockRepo.
		On("GetAllTransports").
		Return(transports, nil)

	result, err := service.GetAllTransports()

	assert.NoError(t, err)

	assert.Len(t, result, 1)

	assert.Equal(t, "Boat", result[0].Name)

	mockRepo.AssertExpectations(t)
}