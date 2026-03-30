package category

import "gorm.io/gorm"

type CategoryRepository interface {
	Create(category *Category) error
	GetAll() ([]Category, error)
	GetByID(id int) (Category, error)
	Update(category *Category) error
	Delete(id int) error
}

type categoryRepository struct {
	db *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepository{db}
}

func (r *categoryRepository) Create(category *Category) error {
	return r.db.Create(category).Error
}

func (r *categoryRepository) GetAll() ([]Category, error) {
	var categories []Category
	err := r.db.Find(&categories).Error
	return categories, err
}

func (r *categoryRepository) GetByID(id int) (Category, error) {
	var category Category
	err := r.db.First(&category, "id = ?", id).Error
	return category, err
}

func (r *categoryRepository) Update(category *Category) error {
	return r.db.Save(category).Error
}

func (r *categoryRepository) Delete(id int) error {
	return r.db.Delete(&Category{}, "id = ?", id).Error
}
