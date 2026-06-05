package repository

import (
	"context"

	"github.com/d1xer111/water-transport-rental/booking-service/internal/domain"

	"github.com/jackc/pgx/v5/pgxpool"
)

type TransportRepository struct {
	db *pgxpool.Pool
}

func NewTransportRepository(db *pgxpool.Pool) *TransportRepository {
	return &TransportRepository{
		db: db,
	}
}

func (r *TransportRepository) CreateTransport(t domain.Transport) error {
	query := `
		INSERT INTO transports
		(name, description, price_per_hour, capacity)
		VALUES ($1, $2, $3, $4)
	`

	_, err := r.db.Exec(
		context.Background(),
		query,
		t.Name,
		t.Description,
		t.PricePerHour,
		t.Capacity,
	)

	return err
}

func (r *TransportRepository) DeleteAll() {
	_, _ = r.db.Exec(context.Background(), "DELETE FROM transports")
}

func (r *TransportRepository) ResetSequence() {
	_, _ = r.db.Exec(context.Background(), "ALTER SEQUENCE transports_id_seq RESTART WITH 1")
}

func (r *TransportRepository) GetAllTransports() ([]domain.Transport, error) {
	query := `
		SELECT id, name, description,
		price_per_hour, capacity, created_at
		FROM transports
	`

	rows, err := r.db.Query(context.Background(), query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var transports []domain.Transport

	for rows.Next() {
		var t domain.Transport

		err := rows.Scan(
			&t.ID,
			&t.Name,
			&t.Description,
			&t.PricePerHour,
			&t.Capacity,
			&t.CreatedAt,
		)

		if err != nil {
			return nil, err
		}

		transports = append(transports, t)
	}

	return transports, nil
}
