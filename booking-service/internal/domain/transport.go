package domain

import "time"

type Transport struct {
	ID           int       `json:"id"`
	Name         string    `json:"name"`
	Description  string    `json:"description"`
	PricePerHour float64   `json:"price_per_hour"`
	Capacity     int       `json:"capacity"`
	CreatedAt    time.Time `json:"created_at"`
}
