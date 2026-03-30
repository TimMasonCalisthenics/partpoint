package router

import (
	"backend/internal/category"

	"github.com/gin-gonic/gin"
)

func SetupCategoryRoutes(r *gin.Engine, admin *gin.RouterGroup, h *category.CategoryHandler) {

	// PUBLIC
	c := r.Group("/categories")
	{
		c.GET("", h.GetAll)
		c.GET("/:id", h.GetByID)
	}

	// ADMIN ONLY
	cAdmin := admin.Group("/categories")
	{
		cAdmin.POST("", h.Create)
		cAdmin.PUT("/:id", h.Update)
		cAdmin.DELETE("/:id", h.Delete)
	}
}
