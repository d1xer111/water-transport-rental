package service

import (
	"github.com/d1xer111/water-transport-rental/booking-service/internal/domain"
)

type TransportRepositoryInterface interface {
	CreateTransport(t domain.Transport) error
	GetAllTransports() ([]domain.Transport, error)
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
	t domain.Transport,
) error {

	return s.repo.CreateTransport(t)
}

func (s *TransportService) GetAllTransports() (
	[]domain.Transport,
	error,
) {

	return s.repo.GetAllTransports()
}
