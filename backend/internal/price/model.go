package price

func (PriceListing) TableName() string {
	return "PriceListing"
}

func (Store) TableName() string {
	return "Store"
}

type PriceListing struct {
	ID          int     `gorm:"column:id;primaryKey"`
	Price       float64 `gorm:"column:price"`
	ProductURL  string  `gorm:"column:productURL"`
	LastUpdated string  `gorm:"column:lastUpdated"`
	ProductID   int     `gorm:"column:productId"`
	StoreID     int     `gorm:"column:storeId"`

	Store Store `gorm:"foreignKey:StoreID"`
}
type Store struct {
	ID               int     `json:"id" gorm:"column:id;primaryKey"`
	Name             string  `json:"name" gorm:"column:name"`
	WebsiteBaseURL   string  `json:"websiteBaseURL" gorm:"column:websiteBaseURL"`
	ReliabilityScore float64 `json:"reliabilityScore" gorm:"column:reliabilityScore"`
}
