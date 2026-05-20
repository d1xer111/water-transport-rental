package service

import (
	"water-transport-rental/booking-service/internal/model"
)

type TransportRepositoryInterface interface {
	CreateTransport(t model.Transport) error
	GetAllTransports() ([]model.Transport, error)
}

type TransportService struct {
	repo TransportRepositoryInterface
}

func NewTransportService(
	repo TransportRepositoryInterface,
) *TransportService {

	return &TransportService{
		repo: repo,
	}
}

func (s *TransportService) CreateTransport(
	t model.Transport,
) error {

	return s.repo.CreateTransport(t)
}

func (s *TransportService) GetAllTransports() (
	[]model.Transport,
	error,
) {

	return s.repo.GetAllTransports()
}