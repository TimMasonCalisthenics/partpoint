package store

func (Store) TableName() string {
	return "Store"
}

type Store struct {
	ID               int     `json:"id" gorm:"primaryKey;column:id"`
	Name             string  `json:"name" gorm:"column:name"`
	WebsiteBaseURL   string  `json:"websiteBaseURL" gorm:"column:websiteBaseURL"`
	ReliabilityScore float64 `json:"reliabilityScore" gorm:"column:reliabilityScore"`
}
