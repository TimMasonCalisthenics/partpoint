package user

type UserService interface {
	GetProfile(userID int) (User, error)
	ListAll() ([]User, error)
	UpdateUser(id int, data map[string]interface{}) error
	DeleteUser(id int) error
}

type userService struct {
	repo UserRepository
}

func NewUserService(r UserRepository) UserService {
	return &userService{r}
}

func (s *userService) GetProfile(userID int) (User, error) {
	return s.repo.GetByID(userID)
}

func (s *userService) ListAll() ([]User, error) {
	return s.repo.FindAll()
}

func (s *userService) UpdateUser(id int, data map[string]interface{}) error {
	return s.repo.Update(id, data)
}

func (s *userService) DeleteUser(id int) error {
	return s.repo.Delete(id)
}

// func (s *userService) GetUserFavourites(userID int) ([]Favourite, error) {
// 	return s.repo.GetFavourites(userID)
// }

// func (s *userService) AddFavourite(userID int, productID int) (Favourite, error) {
// 	fav := Favourite{
// 		UserID:    userID,
// 		ProductID: productID,
// 	}
// 	return s.repo.AddFavourite(fav)
// }
