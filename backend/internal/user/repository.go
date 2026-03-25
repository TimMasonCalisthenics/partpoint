package user

import (
	"backend/internal/config"
)

func GetUsers() ([]User, error) {
	db := config.DB

	rows, err := db.Query(`SELECT id, email, username FROM "User"`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []User

	for rows.Next() {
		var u User
		rows.Scan(&u.ID, &u.Email, &u.Username)
		users = append(users, u)
	}

	return users, nil
}