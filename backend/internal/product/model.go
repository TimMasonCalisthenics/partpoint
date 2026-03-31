package product

func (PartProduct) TableName() string {
	return "PartProduct"
}

func (PriceListing) TableName() string {
	return "PriceListings"
}

type PartProduct struct {
	ID             int     `json:"id" gorm:"primaryKey;column:id"`
	SKU            string  `json:"sku" gorm:"column:sku"`
	Name           string  `json:"name" gorm:"column:name"`
	Brand          string  `json:"brand" gorm:"column:brand"`
	Description    string  `json:"description" gorm:"column:description"`
	ImageURL       string  `json:"imageURL" gorm:"column:imageURL"`
	ExtraImages    string  `json:"extraImages" gorm:"column:extraImages;type:jsonb;default:'[]'"`
	Specifications string  `json:"specifications" gorm:"column:specifications;type:jsonb"`
	Tags           string  `json:"tags" gorm:"column:tags;type:jsonb"`
	BasePrice      float64 `json:"basePrice" gorm:"column:basePrice"`
	PromoPrice     float64 `json:"promoPrice" gorm:"column:promoPrice"`
	Stock          int     `json:"stock" gorm:"column:stock"`
	AffiliateLink  string  `json:"affiliateLink" gorm:"column:affiliateLink"`
	CategoryID     int     `json:"categoryId" gorm:"column:categoryId"`
	VehicleID      int     `json:"vehicleId" gorm:"column:vehicleId"`
}

type ProductResponse struct {
	PartProduct
	Prices []PriceListing `json:"prices"`
}

type PriceListing struct {
	ID         int     `json:"id"`
	Price      float64 `json:"price"`
	ProductURL string  `json:"productURL"`
	ProductID  int     `json:"productId" gorm:"column:productId"`
	StoreID    int     `json:"storeId" gorm:"column:storeId"`

	Store Store `json:"store" gorm:"foreignKey:StoreID"`
}

type Store struct {
	ID               int     `json:"id" gorm:"primaryKey;column:id"`
	Name             string  `json:"name" gorm:"column:name"`
	WebsiteBaseURL   string  `json:"websiteBaseURL" gorm:"column:websiteBaseURL"`
	ReliabilityScore float64 `json:"reliabilityScore" gorm:"column:reliabilityScore"`
}

func (Store) TableName() string {
	return "Store"
}
