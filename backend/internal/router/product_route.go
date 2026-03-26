package router

import (
	"backend/internal/product"

	"github.com/gin-gonic/gin"
)

func SetupProductRoutes(r *gin.Engine, productHandler *product.ProductHandler) {

	api := r.Group("/products")

	// ===== Guest =====
	api.GET("", productHandler.GetProducts)        // search + filter
	api.GET("/:id", productHandler.GetProductByID) // detail + compare price

	// ===== Admin =====
	api.POST("", productHandler.CreateProduct)
	api.PUT("/:id", productHandler.UpdateProduct)
	api.DELETE("/:id", productHandler.DeleteProduct)
}
