package store

import "gorm.io/gorm"

type StoreRepository interface {
	GetAll() ([]Store, error)
	GetByID(id int) (Store, error)
	Create(store Store) (Store, error)
	Update(store Store) (Store, error)
	Delete(id int) error
}

type storeRepository struct {
	db *gorm.DB
}

func NewStoreRepository(db *gorm.DB) StoreRepository {
	return &storeRepository{db}
}

func (r *storeRepository) GetAll() ([]Store, error) {
	var stores []Store
	err := r.db.Find(&stores).Error
	return stores, err
}

func (r *storeRepository) GetByID(id int) (Store, error) {
	var store Store
	err := r.db.First(&store, id).Error
	return store, err
}

func (r *storeRepository) Create(store Store) (Store, error) {
	err := r.db.Create(&store).Error
	return store, err
}

func (r *storeRepository) Update(store Store) (Store, error) {
	err := r.db.Save(&store).Error
	return store, err
}

func (r *storeRepository) Delete(id int) error {
	return r.db.Delete(&Store{}, id).Error
}
