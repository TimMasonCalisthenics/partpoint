package router

import (
	"backend/internal/price"

	"github.com/gin-gonic/gin"
)

func SetupPriceRoutes(r *gin.Engine, priceHandler *price.PriceHandler) {
	api := r.Group("/products")

	// PUBLIC ONLY
	api.GET("/:id/prices", priceHandler.GetPricesByProductID)
}
