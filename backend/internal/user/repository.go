package user

import (
	"gorm.io/gorm"
)

type UserRepository interface {
	GetByID(id int) (User, error)
	GetFavourites(userID int) ([]Favourite, error)
	AddFavourite(fav Favourite) (Favourite, error)
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db}
}

func (r *userRepository) GetByID(id int) (User, error) {
	var u User
	err := r.db.First(&u, id).Error
	return u, err
}

func (r *userRepository) GetFavourites(userID int) ([]Favourite, error) {
	var favs []Favourite
	err := r.db.Where("userId = ?", userID).Find(&favs).Error
	return favs, err
}

func (r *userRepository) AddFavourite(fav Favourite) (Favourite, error) {
	err := r.db.Create(&fav).Error
	return fav, err
}
