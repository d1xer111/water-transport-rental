CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    transport_id INT REFERENCES transports(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    hours INT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);