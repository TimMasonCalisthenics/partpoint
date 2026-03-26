package product

import "gorm.io/gorm"

type ProductRepository interface {
	FindAll() ([]PartProduct, error)
	FindByID(id int) (PartProduct, error)
	Create(product PartProduct) (PartProduct, error)
	Update(product PartProduct) (PartProduct, error)
	Delete(id int) error
	Search(name string, categoryID, vehicleID int) ([]PartProduct, error)
	GetWithPrices(id int) (ProductResponse, error)
}

type productRepo struct {
	db *gorm.DB
}

func (r *productRepo) Create(product PartProduct) (PartProduct, error) {
	err := r.db.Create(&product).Error
	return product, err
}

func (r *productRepo) FindAll() ([]PartProduct, error) {
	var products []PartProduct
	err := r.db.Find(&products).Error
	return products, err
}

func (r *productRepo) FindByID(id int) (PartProduct, error) {
	var product PartProduct
	err := r.db.First(&product, id).Error
	return product, err
}

func (r *productRepo) Update(product PartProduct) (PartProduct, error) {
	err := r.db.Save(&product).Error
	return product, err
}

func (r *productRepo) Delete(id int) error {
	return r.db.Delete(&PartProduct{}, id).Error
}

func NewProductRepository(db *gorm.DB) ProductRepository {
	return &productRepo{db}
}

func (r *productRepo) Search(name string, categoryID, vehicleID int) ([]PartProduct, error) {
	var products []PartProduct

	query := r.db

	if name != "" {
		query = query.Where("name ILIKE ?", "%"+name+"%")
	}
	if categoryID != 0 {
		query = query.Where("category_id = ?", categoryID)
	}
	if vehicleID != 0 {
		query = query.Where("vehicle_id = ?", vehicleID)
	}

	err := query.Find(&products).Error
	return products, err
}

func (r *productRepo) GetWithPrices(id int) (ProductResponse, error) {
	var product PartProduct
	var prices []PriceListing

	if err := r.db.First(&product, id).Error; err != nil {
		return ProductResponse{}, err
	}

	r.db.Where("product_id = ?", id).Find(&prices)

	return ProductResponse{
		PartProduct: product,
		Prices:      prices,
	}, nil
}
