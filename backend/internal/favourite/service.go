package favourite

type FavouriteService interface {
	Toggle(userID int, productID int) (string, error)
	GetUserFav(userID int) ([]map[string]interface{}, error)
}

type favouriteService struct {
	repo FavouriteRepository
}

func NewFavouriteService(r FavouriteRepository) FavouriteService {
	return &favouriteService{r}
}

func (s *favouriteService) Toggle(userID int, productID int) (string, error) {
	exists, err := s.repo.Exists(userID, productID)
	if err != nil {
		return "", err
	}

	if exists {
		err := s.repo.Remove(userID, productID)
		return "removed", err
	}

	err = s.repo.Add(Favourite{
		UserID:    userID,
		ProductID: productID,
	})
	return "added", err
}

func (s *favouriteService) GetUserFav(userID int) ([]map[string]interface{}, error) {
	return s.repo.GetUserFavWithProduct(userID)
}
