package service

import (
	"water-transport-rental/booking-service/internal/model"
	"water-transport-rental/booking-service/internal/repository"
)

type BookingService struct {
	repo *repository.BookingRepository
}

func NewBookingService(repo *repository.BookingRepository) *BookingService {
	return &BookingService{
		repo: repo,
	}
}

func (s *BookingService) CreateBooking(b model.Booking) error {
	if b.Status == "" {
		b.Status = "pending"
	}

	return s.repo.CreateBooking(b)
}

func (s *BookingService) GetAllBookings() ([]model.Booking, error) {
	return s.repo.GetAllBookings()
}

func (s *BookingService) ApproveBooking(id int) error {
	return s.repo.UpdateBookingStatus(id, "approved")
}

func (s *BookingService) RejectBooking(id int) error {
	return s.repo.UpdateBookingStatus(id, "cancelled")
}