package repository

import (
	"context"

	"github.com/d1xer111/water-transport-rental/auth-service/internal/model"
	"github.com/jackc/pgx/v5"
)

type UserRepository struct {
	conn *pgx.Conn
}

func NewUserRepository(conn *pgx.Conn) *UserRepository {
	return &UserRepository{
		conn: conn,
	}
}

func (r *UserRepository) CreateUser(user model.User) error {
	query := `
		INSERT INTO users (username, email, password, role)
		VALUES ($1, $2, $3, $4)
	`

	_, err := r.conn.Exec(
		context.Background(),
		query,
		user.Username,
		user.Email,
		user.Password,
		"user",
	)

	return err
}

func (r *UserRepository) GetUserByEmail(email string) (model.User, error) {
	var user model.User

	query := `
		SELECT id, username, email, password, role
		FROM users
		WHERE email=$1
	`

	err := r.conn.QueryRow(
		context.Background(),
		query,
		email,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Password,
		&user.Role,
	)

	return user, err
}