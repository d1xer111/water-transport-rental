package repository

import (
	"context"

	"water-transport-rental/booking-service/internal/model"

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

func (r *BookingRepository) CreateBooking(b model.Booking) error {
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

func (r *BookingRepository) GetAllBookings() ([]model.Booking, error) {
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

	var bookings []model.Booking

	for rows.Next() {
		var b model.Booking

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