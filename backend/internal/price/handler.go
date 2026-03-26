package price

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type PriceHandler struct {
	service PriceService
}

func NewPriceHandler(s PriceService) *PriceHandler {
	return &PriceHandler{s}
}

func (h *PriceHandler) GetPricesByProductID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid product id"})
		return
	}

	prices, err := h.service.GetByProductID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, prices)
}
