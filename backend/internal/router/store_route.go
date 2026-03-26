package router

import (
	"backend/internal/store"

	"github.com/gin-gonic/gin"
)

func SetupStoreRoutes(r *gin.Engine, h *store.StoreHandler) {
	storeGroup := r.Group("/stores")
	{
		storeGroup.GET("", h.GetStores)
		storeGroup.GET("/:id", h.GetStoreByID)
		storeGroup.POST("", h.CreateStore)
		storeGroup.PUT("/:id", h.UpdateStore)
		storeGroup.DELETE("/:id", h.DeleteStore)
	}
}
