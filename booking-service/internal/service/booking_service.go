package service

import (
	"github.com/d1xer111/water-transport-rental/booking-service/internal/domain"
)

type BookingRepositoryInterface interface {
	CreateBooking(b domain.Booking) error
	GetAllBookings() ([]domain.Booking, error)
	UpdateBookingStatus(id int, status string) error
}

type BookingService struct {
	repo BookingRepositoryInterface
}

func NewBookingService(repo BookingRepositoryInterface) *BookingService {
	return &BookingService{
		repo: repo,
	}
}

func (s *BookingService) CreateBooking(b domain.Booking) error {
	if b.Status == "" {
		b.Status = "pending"
	}

	return s.repo.CreateBooking(b)
}

func (s *BookingService) GetAllBookings() ([]domain.Booking, error) {
	return s.repo.GetAllBookings()
}

func (s *BookingService) ApproveBooking(id int) error {
	return s.repo.UpdateBookingStatus(id, "approved")
}

func (s *BookingService) RejectBooking(id int) error {
	return s.repo.UpdateBookingStatus(id, "cancelled")
}