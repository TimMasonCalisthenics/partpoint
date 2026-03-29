package router

import (
	"backend/internal/product"

	"github.com/gin-gonic/gin"
)

func SetupProductRoutes(r *gin.Engine, admin *gin.RouterGroup, h *product.ProductHandler) {

	// PUBLIC
	p := r.Group("/products")
	{
		p.GET("", h.GetProducts)
		p.GET("/:id", h.GetProductByID)
	}

	// ADMIN
	pAdmin := admin.Group("/products")
	{
		pAdmin.POST("", h.CreateProduct)
		pAdmin.PUT("/:id", h.UpdateProduct)
		pAdmin.DELETE("/:id", h.DeleteProduct)
	}
}
