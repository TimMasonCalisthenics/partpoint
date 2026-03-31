package user

import (
	"gorm.io/gorm"
)

type UserRepository interface {
	GetByID(id int) (User, error)
	FindAll() ([]User, error)
	Update(id int, data map[string]interface{}) error
	Delete(id int) error
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

func (r *userRepository) FindAll() ([]User, error) {
	var users []User
	err := r.db.Find(&users).Error
	return users, err
}

func (r *userRepository) Update(id int, data map[string]interface{}) error {
	return r.db.Model(&User{}).Where("id = ?", id).Updates(data).Error
}

func (r *userRepository) Delete(id int) error {
	return r.db.Delete(&User{}, id).Error
}

// func (r *userRepository) GetFavourites(userID int) ([]Favourite, error) {
// 	var favs []Favourite
// 	err := r.db.Where("userId = ?", userID).Find(&favs).Error
// 	return favs, err
// }

// func (r *userRepository) AddFavourite(fav Favourite) (Favourite, error) {
// 	err := r.db.Create(&fav).Error
// 	return fav, err
// }
