package auth

type User struct {
	ID       int    `json:"id" gorm:"primaryKey;autoIncrement"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role,omitempty"`
}

func (User) TableName() string {
	return "User"
}

// ใช้ตอน login
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
