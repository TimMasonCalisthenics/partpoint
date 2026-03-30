package auth

import "errors"

type UserService interface {
	GetUsers() ([]User, error)
	CreateUser(user User) (User, error)

	Register(user User) (User, error)
	Login(req LoginRequest) (User, error)
	Logout() error
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
	return s.repo.Create(user)
}

// LOGIN
func (s *userService) Login(req LoginRequest) (User, error) {
	// ค้นหาด้วย email หรือ username
	user, err := s.repo.FindByIdentifier(req.Identifier)
	if err != nil || user.ID == 0 {
		return user, errors.New("user not found")
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
