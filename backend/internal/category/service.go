package category

type CategoryService interface {
	Create(category *Category) error
	GetAll() ([]Category, error)
	GetByID(id int) (Category, error)
	Update(category *Category) error
	Delete(id int) error
}

type categoryService struct {
	repo CategoryRepository
}

func NewCategoryService(r CategoryRepository) CategoryService {
	return &categoryService{r}
}

func (s *categoryService) Create(category *Category) error {
	return s.repo.Create(category)
}

func (s *categoryService) GetAll() ([]Category, error) {
	return s.repo.GetAll()
}

func (s *categoryService) GetByID(id int) (Category, error) {
	return s.repo.GetByID(id)
}

func (s *categoryService) Update(category *Category) error {
	return s.repo.Update(category)
}

func (s *categoryService) Delete(id int) error {
	return s.repo.Delete(id)
}
