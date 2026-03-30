package favourite

import "gorm.io/gorm"

type FavouriteRepository interface {
	Add(fav Favourite) error
	Remove(userID int, productID int) error
	GetByUser(userID int) ([]Favourite, error)
	Exists(userID int, productID int) (bool, error)
	GetUserFavWithProduct(userID int) ([]map[string]interface{}, error)
}

type favouriteRepository struct {
	db *gorm.DB
}

func NewFavouriteRepository(db *gorm.DB) FavouriteRepository {
	return &favouriteRepository{db}
}

func (r *favouriteRepository) Add(fav Favourite) error {
	return r.db.Create(&fav).Error
}

func (r *favouriteRepository) Remove(userID int, productID int) error {
	return r.db.Where(`"userId" = ? AND "productId" = ?`, userID, productID).
		Delete(&Favourite{}).Error
}

func (r *favouriteRepository) GetByUser(userID int) ([]Favourite, error) {
	var favs []Favourite
	err := r.db.Where(`"userId" = ?`, userID).Find(&favs).Error
	return favs, err
}

func (r *favouriteRepository) Exists(userID int, productID int) (bool, error) {
	var count int64
	err := r.db.Model(&Favourite{}).
		Where(`"userId" = ? AND "productId" = ?`, userID, productID).
		Count(&count).Error

	return count > 0, err
}

func (r *favouriteRepository) GetUserFavWithProduct(userID int) ([]map[string]interface{}, error) {
	var results []map[string]interface{}

	err := r.db.Table("Favorite").
		Select(`
			"Favorite"."id" as fav_id,
			"PartProduct"."id" as product_id,
			"PartProduct"."name",
			"PartProduct"."description",
			"PartProduct"."imageURL",
			"Vehicle"."brand",
			"Vehicle"."model",
			"Vehicle"."year"
		`).
		Joins(`JOIN "PartProduct" ON "PartProduct"."id" = "Favorite"."productId"`).
		Joins(`LEFT JOIN "Vehicle" ON "Vehicle"."id" = "PartProduct"."vehicleId"`).
		Where(`"Favorite"."userId" = ?`, userID).
		Scan(&results).Error

	return results, err
}
