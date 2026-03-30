package router

import (
	"backend/internal/store"

	"github.com/gin-gonic/gin"
)

func SetupStoreRoutes(r *gin.Engine, admin *gin.RouterGroup, h *store.StoreHandler) {

	// PUBLIC
	s := r.Group("/stores")
	{
		s.GET("", h.GetStores)
		s.GET("/:id", h.GetStoreByID)
	}

	// ADMIN ONLY
	sAdmin := admin.Group("/stores")
	{
		sAdmin.POST("", h.CreateStore)
		sAdmin.PUT("/:id", h.UpdateStore)
		sAdmin.DELETE("/:id", h.DeleteStore)
	}
}
