package user

import (
	"time"
)

func (User) TableName() string {
	return "User"
}

type User struct {
	ID        int       `json:"id" gorm:"primaryKey;column:id"`
	Email     string    `json:"email" gorm:"column:email"`
	Password  string    `json:"-" gorm:"column:password"` // ไม่ส่ง password กลับ
	Role      string    `json:"role" gorm:"column:role"`
	CreatedAt time.Time `json:"createdAt" gorm:"column:createdAt"`
}

// type Favourite struct {
// 	ID        int `json:"id" gorm:"primaryKey;column:id"`
// 	UserID    int `json:"userId" gorm:"column:userId"`
// 	ProductID int `json:"productId" gorm:"column:productId"`
// }
