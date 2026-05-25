package service

import (
	"errors"
	"testing"

	"github.com/d1xer111/water-transport-rental/booking-service/internal/domain"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type BookingRepositoryMock struct {
	mock.Mock
}

func (m *BookingRepositoryMock) CreateBooking(b domain.Booking) error {
	args := m.Called(b)
	return args.Error(0)
}

func (m *BookingRepositoryMock) GetAllBookings() ([]domain.Booking, error) {
	args := m.Called()
	return args.Get(0).([]domain.Booking), args.Error(1)
}

func (m *BookingRepositoryMock) UpdateBookingStatus(id int, status string) error {
	args := m.Called(id, status)
	return args.Error(0)
}

func TestCreateBookingSuccess(t *testing.T) {
	mockRepo := new(BookingRepositoryMock)
	service := NewBookingService(mockRepo)

	booking := domain.Booking{
		UserID:      1,
		TransportID: 2,
	}

	mockRepo.On("CreateBooking", mock.MatchedBy(func(b domain.Booking) bool {
		return b.Status == "pending"
	})).Return(nil)

	err := service.CreateBooking(booking)

	assert.NoError(t, err)
	mockRepo.AssertExpectations(t)
}

func TestCreateBookingWithExistingStatus(t *testing.T) {
	mockRepo := new(BookingRepositoryMock)
	service := NewBookingService(mockRepo)

	booking := domain.Booking{
		UserID:      1,
		TransportID: 2,
		Status:      "approved",
	}

	mockRepo.On("CreateBooking", booking).Return(nil)

	err := service.CreateBooking(booking)

	assert.NoError(t, err)
	mockRepo.AssertExpectations(t)
}

func TestCreateBookingError(t *testing.T) {
	mockRepo := new(BookingRepositoryMock)
	service := NewBookingService(mockRepo)

	booking := domain.Booking{
		UserID:      1,
		TransportID: 2,
	}

	mockRepo.On("CreateBooking", mock.Anything).Return(errors.New("db error"))

	err := service.CreateBooking(booking)

	assert.Error(t, err)
}

func TestGetAllBookingsSuccess(t *testing.T) {
	mockRepo := new(BookingRepositoryMock)
	service := NewBookingService(mockRepo)

	bookings := []domain.Booking{
		{ID: 1, UserID: 1, TransportID: 2, Status: "pending"},
	}

	mockRepo.On("GetAllBookings").Return(bookings, nil)

	result, err := service.GetAllBookings()

	assert.NoError(t, err)
	assert.Len(t, result, 1)
	assert.Equal(t, "pending", result[0].Status)
}

func TestApproveBooking(t *testing.T) {
	mockRepo := new(BookingRepositoryMock)
	service := NewBookingService(mockRepo)

	mockRepo.On("UpdateBookingStatus", 1, "approved").Return(nil)

	err := service.ApproveBooking(1)

	assert.NoError(t, err)
}

func TestRejectBooking(t *testing.T) {
	mockRepo := new(BookingRepositoryMock)
	service := NewBookingService(mockRepo)

	mockRepo.On("UpdateBookingStatus", 1, "cancelled").Return(nil)

	err := service.RejectBooking(1)

	assert.NoError(t, err)
}