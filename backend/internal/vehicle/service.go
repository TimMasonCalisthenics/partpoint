package vehicle

type VehicleService interface {
	Create(vehicle *Vehicle) error
	GetAll() ([]Vehicle, error)
	GetByID(id int) (Vehicle, error)
	Update(vehicle *Vehicle) error
	Delete(id int) error
}

type vehicleService struct {
	repo VehicleRepository
}

func NewVehicleService(r VehicleRepository) VehicleService {
	return &vehicleService{r}
}

func (s *vehicleService) Create(vehicle *Vehicle) error {
	return s.repo.Create(vehicle)
}

func (s *vehicleService) GetAll() ([]Vehicle, error) {
	return s.repo.GetAll()
}

func (s *vehicleService) GetByID(id int) (Vehicle, error) {
	return s.repo.GetByID(id)
}

func (s *vehicleService) Update(vehicle *Vehicle) error {
	return s.repo.Update(vehicle)
}

func (s *vehicleService) Delete(id int) error {
	return s.repo.Delete(id)
}
