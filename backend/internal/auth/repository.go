package auth

import (
	"log"

	"gorm.io/gorm"
)

type UserRepository interface {
	GetAll() ([]User, error)
	Create(user User) (User, error)
	FindByEmail(email string) (User, error) // 👈 เพิ่ม
}

type userRepo struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepo{db: db}
}

func (r *userRepo) Create(user User) (User, error) {
	if err := r.db.Create(&user).Error; err != nil {
		log.Println("Failed to insert user:", err)
		return User{}, err
	}
	log.Println("Inserted user:", user)
	return user, nil
}

func (r *userRepo) GetAll() ([]User, error) {
	var users []User
	if err := r.db.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

func (r *userRepo) FindByEmail(email string) (User, error) {
	var user User
	if err := r.db.Where("email = ?", email).First(&user).Error; err != nil {
		return User{}, err
	}
	return user, nil
}
