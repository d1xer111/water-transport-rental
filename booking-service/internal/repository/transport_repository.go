package repository

import (
	"context"

	"water-transport-rental/booking-service/internal/model"

	"github.com/jackc/pgx/v5"
)

type TransportRepository struct {
	db *pgx.Conn
}

func NewTransportRepository(db *pgx.Conn) *TransportRepository {
	return &TransportRepository{
		db: db,
	}
}

func (r *TransportRepository) CreateTransport(t model.Transport) error {
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

func (r *TransportRepository) GetAllTransports() ([]model.Transport, error) {
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

	var transports []model.Transport

	for rows.Next() {
		var t model.Transport

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
