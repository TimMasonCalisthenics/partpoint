package router

import (
	"backend/internal/vehicle"

	"github.com/gin-gonic/gin"
)

func SetupVehicleRoutes(rg *gin.RouterGroup, h *vehicle.VehicleHandler) {
	v := rg.Group("/vehicles")
	{
		v.POST("", h.Create)
		v.GET("", h.GetAll)
		v.GET("/:id", h.GetByID)
		v.PUT("/:id", h.Update)
		v.DELETE("/:id", h.Delete)
	}
}
