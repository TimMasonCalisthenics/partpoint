package favourite

func (Favourite) TableName() string {
	return "favorites"
}


type Favourite struct {
	ID        int `json:"id" gorm:"primaryKey;column:id"`
	UserID    int `json:"userId" gorm:"column:userId"`
	ProductID int `json:"productId" gorm:"column:productId"`
}
