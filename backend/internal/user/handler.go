package user

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	service UserService
}

func NewUserHandler(s UserService) *UserHandler {
	return &UserHandler{s}
}

// GET /api/profile
func (h *UserHandler) GetProfile(c *gin.Context) {
	userIDRaw, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	userID, ok := userIDRaw.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "invalid userID"})
		return
	}

	user, err := h.service.GetProfile(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// PUT /api/profile
func (h *UserHandler) UpdateProfile(c *gin.Context) {
	userIDRaw, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	userID, ok := userIDRaw.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "invalid userID"})
		return
	}

	var req struct {
		Username        string `json:"username"`
		Email           string `json:"email"`
		CurrentPassword string `json:"currentPassword"`
		NewPassword     string `json:"newPassword"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updates := map[string]interface{}{}
	if req.Username != "" {
		updates["username"] = req.Username
	}
	if req.Email != "" {
		updates["email"] = req.Email
	}

	if req.NewPassword != "" {
		if req.CurrentPassword == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "current password required"})
			return
		}
		user, err := h.service.GetProfile(userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to verify user"})
			return
		}
		if user.Password != req.CurrentPassword {
			c.JSON(http.StatusBadRequest, gin.H{"error": "current password incorrect"})
			return
		}
		updates["password"] = req.NewPassword
	}

	if len(updates) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "no update fields provided"})
		return
	}

	if err := h.service.UpdateUser(userID, updates); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "profile updated"})
}

// GET /admin/users
func (h *UserHandler) ListUsers(c *gin.Context) {
	users, err := h.service.ListAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}

// PUT /admin/users/:id/role
func (h *UserHandler) UpdateRole(c *gin.Context) {
	idStr := c.Param("id")
	var body struct {
		Role string `json:"role"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var id int
	fmt.Sscanf(idStr, "%d", &id)

	err := h.service.UpdateUser(id, map[string]interface{}{"role": body.Role})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "role updated"})
}

// PUT /admin/users/:id/status
func (h *UserHandler) UpdateStatus(c *gin.Context) {
	idStr := c.Param("id")
	var body struct {
		IsEnabled bool `json:"isEnabled"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var id int
	fmt.Sscanf(idStr, "%d", &id)

	err := h.service.UpdateUser(id, map[string]interface{}{"isEnabled": body.IsEnabled})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "status updated"})
}

// // GET /api/favourites
// func (h *UserHandler) GetFavourites(c *gin.Context) {
// 	userIDRaw, exists := c.Get("userID")
// 	if !exists {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
// 		return
// 	}

// 	userID, ok := userIDRaw.(int)
// 	if !ok {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "invalid userID"})
// 		return
// 	}

// 	favs, err := h.service.GetUserFavourites(userID)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, favs)
// }

// // POST /api/favourites
// func (h *UserHandler) AddFavourite(c *gin.Context) {
// 	userIDRaw, exists := c.Get("userID")
// 	if !exists {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
// 		return
// 	}

// 	userID, ok := userIDRaw.(int)
// 	if !ok {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "invalid userID"})
// 		return
// 	}

// 	var body struct {
// 		ProductID int `json:"productId"`
// 	}

// 	if err := c.ShouldBindJSON(&body); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	fav, err := h.service.AddFavourite(userID, body.ProductID)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, fav)
// }
