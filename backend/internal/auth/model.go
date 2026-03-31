package auth

import "time"

type User struct {
	ID       int    `json:"id" gorm:"primaryKey;autoIncrement"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password   string    `json:"password"`
	Role       string    `json:"role,omitempty"`
	IsVerified bool      `json:"isVerified" gorm:"column:is_verified;default:false"`
	OTP        string    `json:"-" gorm:"column:otp"`
	OTPExpiry  time.Time `json:"-" gorm:"column:otp_expiry"`
}

func (User) TableName() string {
	return "User"
}

// ใช้ตอน login
type LoginRequest struct {
	Identifier string `json:"identifier"` // จะเป็น email หรือ username
	Password   string `json:"password"`
}

type VerifyRequest struct {
	Email string `json:"email"`
	OTP   string `json:"otp"`
}
