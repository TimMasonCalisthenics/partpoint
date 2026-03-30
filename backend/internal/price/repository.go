package price

import "gorm.io/gorm"

type PriceRepository interface {
	GetByProductID(productID int) ([]PriceListing, error)
}

type priceRepo struct {
	db *gorm.DB
}

func NewPriceRepository(db *gorm.DB) PriceRepository {
	return &priceRepo{db}
}

func (r *priceRepo) GetByProductID(productID int) ([]PriceListing, error) {
	var prices []PriceListing

	err := r.db.
		Preload("Store").
		Where(`"productId" = ?`, productID).
		Find(&prices).Error

	return prices, err
}
