package price

type PriceService interface {
	GetByProductID(productID int) ([]PriceListing, error)
}

type priceService struct {
	repo PriceRepository
}

func NewPriceService(r PriceRepository) PriceService {
	return &priceService{r}
}

func (s *priceService) GetByProductID(productID int) ([]PriceListing, error) {
	return s.repo.GetByProductID(productID)
}
