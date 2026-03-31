package auth

import (
	"crypto/rand"
	"errors"
	"log"
	"math/big"
	"time"
)

type UserService interface {
	GetUsers() ([]User, error)
	CreateUser(user User) (User, error)

	Register(user User) (User, error)
	VerifyOTP(req VerifyRequest) error
	Login(req LoginRequest) (User, error)
	Logout() error
}

func generateOTP() string {
	const digits = "0123456789"
	result := make([]byte, 6)
	for i := 0; i < 6; i++ {
		num, _ := rand.Int(rand.Reader, big.NewInt(int64(len(digits))))
		result[i] = digits[num.Int64()]
	}
	return string(result)
}

type userService struct {
	repo UserRepository
}

func NewUserService(repo UserRepository) UserService {
	return &userService{repo: repo}
}

func (s *userService) GetUsers() ([]User, error) {
	return s.repo.GetAll()
}

func (s *userService) CreateUser(user User) (User, error) {
	return s.repo.Create(user)
}

// REGISTER
func (s *userService) Register(user User) (User, error) {
	if user.Email == "" || user.Password == "" {
		return user, errors.New("email or password required")
	}

	user.OTP = generateOTP()
	user.OTPExpiry = time.Now().Add(5 * time.Minute)
	user.IsVerified = false

	log.Println("=====================================================")
	log.Printf(" [MOCK EMAIL] To: %s\n", user.Email)
	log.Printf("   Please use this OTP to verify your account: %s\n", user.OTP)
	log.Println("=====================================================")

	return s.repo.Create(user)
}

func (s *userService) VerifyOTP(req VerifyRequest) error {
	user, err := s.repo.FindByIdentifier(req.Email)
	if err != nil || user.ID == 0 {
		return errors.New("user not found")
	}

	if user.IsVerified {
		return errors.New("already verified")
	}

	if time.Now().After(user.OTPExpiry) {
		return errors.New("otp expired")
	}

	if user.OTP != req.OTP {
		return errors.New("invalid otp")
	}

	user.IsVerified = true
	user.OTP = ""
	return s.repo.Update(user)
}

// LOGIN
func (s *userService) Login(req LoginRequest) (User, error) {
	// ค้นหาด้วย email หรือ username
	user, err := s.repo.FindByIdentifier(req.Identifier)
	if err != nil || user.ID == 0 {
		return user, errors.New("user not found")
	}

	// เช็ค verified
	if !user.IsVerified {
		return user, errors.New("please verify your OTP first")
	}

	// เช็ค password
	if user.Password != req.Password {
		return user, errors.New("invalid password")
	}

	return user, nil
}

// LOGOUT
func (s *userService) Logout() error {
	return nil
}
