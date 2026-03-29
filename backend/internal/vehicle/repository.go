package vehicle

import "gorm.io/gorm"

type VehicleRepository interface {
	Create(vehicle *Vehicle) error
	GetAll() ([]Vehicle, error)
	GetByID(id int) (Vehicle, error)
	Update(vehicle *Vehicle) error
	Delete(id int) error
}

type vehicleRepository struct {
	db *gorm.DB
}

func NewVehicleRepository(db *gorm.DB) VehicleRepository {
	return &vehicleRepository{db}
}

func (r *vehicleRepository) Create(vehicle *Vehicle) error {
	return r.db.Create(vehicle).Error
}

func (r *vehicleRepository) GetAll() ([]Vehicle, error) {
	var vehicles []Vehicle
	err := r.db.Find(&vehicles).Error
	return vehicles, err
}

func (r *vehicleRepository) GetByID(id int) (Vehicle, error) {
	var vehicle Vehicle
	err := r.db.First(&vehicle, "id = ?", id).Error
	return vehicle, err
}

func (r *vehicleRepository) Update(vehicle *Vehicle) error {
	return r.db.Save(vehicle).Error
}

func (r *vehicleRepository) Delete(id int) error {
	return r.db.Delete(&Vehicle{}, "id = ?", id).Error
}
