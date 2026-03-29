package router

import (
	"backend/internal/category"

	"github.com/gin-gonic/gin"
)

func SetupCategoryRoutes(r *gin.Engine, protected *gin.RouterGroup, h *category.CategoryHandler) {

	// public
	c := r.Group("/categories")
	{
		c.GET("", h.GetAll)
		c.GET("/:id", h.GetByID)
	}

	// protected
	cAuth := protected.Group("/categories")
	{
		cAuth.POST("", h.Create)
		cAuth.PUT("/:id", h.Update)
		cAuth.DELETE("/:id", h.Delete)
	}
}
