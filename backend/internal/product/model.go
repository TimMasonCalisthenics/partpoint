package product

func (PartProduct) TableName() string {
	return "PartProduct"
}

func (PriceListing) TableName() string {
	return "PriceListings"
}

type PartProduct struct {
	ID             int    `json:"id" gorm:"primaryKey;column:id"`
	Name           string `json:"name" gorm:"column:name"`
	Description    string `json:"description" gorm:"column:description"`
	ImageURL       string `json:"imageURL" gorm:"column:imageURL"`
	Specifications string `json:"specifications" gorm:"column:specifications"`
	CategoryID     int    `json:"categoryId" gorm:"column:categoryId"`
	VehicleID      int    `json:"vehicleId" gorm:"column:vehicleId"`
}

type ProductResponse struct {
	PartProduct
	Prices []PriceListing `json:"prices"`
}

type PriceListing struct {
	ID         int     `json:"id"`
	Price      float64 `json:"price"`
	ProductURL string  `json:"productURL"`
	ProductID  int     `json:"productId"`
	StoreID    int     `json:"storeId"`
}
