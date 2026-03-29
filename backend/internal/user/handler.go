package user

import (
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
