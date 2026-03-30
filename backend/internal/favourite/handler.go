package favourite

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type FavouriteHandler struct {
	service FavouriteService
}

func NewFavouriteHandler(s FavouriteService) *FavouriteHandler {
	return &FavouriteHandler{s}
}

// POST /favourite
func (h *FavouriteHandler) ToggleFavourite(c *gin.Context) {
	var req struct {
		ProductID int `json:"productId"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIDRaw, _ := c.Get("userID")
	userID := userIDRaw.(int)

	status, err := h.service.Toggle(userID, req.ProductID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": status,
	})
}

// GET /favourite
func (h *FavouriteHandler) GetMyFavourite(c *gin.Context) {
	userIDRaw, _ := c.Get("userID")
	userID := userIDRaw.(int)

	data, err := h.service.GetUserFav(userID)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, data)
}
