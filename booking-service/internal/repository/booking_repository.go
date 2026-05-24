package repository

import (
	"context"

	"github.com/d1xer111/water-transport-rental/booking-service/internal/domain"

	"github.com/jackc/pgx/v5"
)

type BookingRepository struct {
	db *pgx.Conn
}

func NewBookingRepository(db *pgx.Conn) *BookingRepository {
	return &BookingRepository{
		db: db,
	}
}

func (r *BookingRepository) CreateBooking(b domain.Booking) error {
	query := `
		INSERT INTO bookings
		(user_id, transport_id, booking_date, hours, status)
		VALUES ($1, $2, $3, $4, $5)
	`

	_, err := r.db.Exec(
		context.Background(),
		query,
		b.UserID,
		b.TransportID,
		b.BookingDate,
		b.Hours,
		b.Status,
	)

	return err
}

func (r *BookingRepository) GetAllBookings() ([]domain.Booking, error) {
	query := `
		SELECT id, user_id, transport_id,
		booking_date, hours, status, created_at
		FROM bookings
	`

	rows, err := r.db.Query(context.Background(), query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var bookings []domain.Booking

	for rows.Next() {
		var b domain.Booking

		err := rows.Scan(
			&b.ID,
			&b.UserID,
			&b.TransportID,
			&b.BookingDate,
			&b.Hours,
			&b.Status,
			&b.CreatedAt,
		)

		if err != nil {
			return nil, err
		}

		bookings = append(bookings, b)
	}

	return bookings, nil
}

func (r *BookingRepository) UpdateBookingStatus(
	id int,
	status string,
) error {

	query := `
		UPDATE bookings
		SET status=$1
		WHERE id=$2
	`

	_, err := r.db.Exec(
		context.Background(),
		query,
		status,
		id,
	)

	return err
}
