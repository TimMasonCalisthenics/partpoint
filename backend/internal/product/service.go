package product

type ProductService interface {
	GetAll() ([]PartProduct, error)
	GetByID(id int) (ProductResponse, error)
	Create(PartProduct) (PartProduct, error)
	Update(PartProduct) (PartProduct, error)
	Delete(id int) error
	Search(name string, categoryID, vehicleID int) ([]PartProduct, error)
}

type productService struct {
	repo ProductRepository
}

func (s *productService) Create(p PartProduct) (PartProduct, error) {
	return s.repo.Create(p)
}

func (s *productService) Update(p PartProduct) (PartProduct, error) {
	return s.repo.Update(p)
}

func (s *productService) Delete(id int) error {
	return s.repo.Delete(id)
}

func (s *productService) GetAll() ([]PartProduct, error) {
	return s.repo.FindAll()
}

func NewProductService(r ProductRepository) ProductService {
	return &productService{r}
}

func (s *productService) GetByID(id int) (ProductResponse, error) {
	return s.repo.GetWithPrices(id)
}

func (s *productService) Search(name string, categoryID, vehicleID int) ([]PartProduct, error) {
	return s.repo.Search(name, categoryID, vehicleID)
}
