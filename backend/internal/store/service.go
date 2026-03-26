package store

type StoreService interface {
	GetAll() ([]Store, error)
	GetByID(id int) (Store, error)
	Create(store Store) (Store, error)
	Update(store Store) (Store, error)
	Delete(id int) error
}

type storeService struct {
	repo StoreRepository
}

func NewStoreService(r StoreRepository) StoreService {
	return &storeService{r}
}

func (s *storeService) GetAll() ([]Store, error) {
	return s.repo.GetAll()
}

func (s *storeService) GetByID(id int) (Store, error) {
	return s.repo.GetByID(id)
}

func (s *storeService) Create(store Store) (Store, error) {
	return s.repo.Create(store)
}

func (s *storeService) Update(store Store) (Store, error) {
	return s.repo.Update(store)
}

func (s *storeService) Delete(id int) error {
	return s.repo.Delete(id)
}
