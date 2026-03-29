package user

type UserService interface {
	GetProfile(userID int) (User, error)
	// GetUserFavourites(userID int) ([]Favourite, error)
	// AddFavourite(userID int, productID int) (Favourite, error)
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
