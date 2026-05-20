package model

import "time"

type Booking struct {
	ID          int       `json:"id"`
	UserID      int       `json:"user_id"`
	TransportID int       `json:"transport_id"`
	BookingDate time.Time `json:"booking_date"`
	Hours       int       `json:"hours"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
}
