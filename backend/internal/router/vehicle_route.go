package router

import (
	"backend/internal/vehicle"

	"github.com/gin-gonic/gin"
)

func SetupVehicleRoutes(r *gin.Engine, protected *gin.RouterGroup, h *vehicle.VehicleHandler) {

	// public
	v := r.Group("/vehicles")
	{
		v.GET("", h.GetAll)
		v.GET("/:id", h.GetByID)
	}

	// protected
	vAuth := protected.Group("/vehicles")
	{
		vAuth.POST("", h.Create)
		vAuth.PUT("/:id", h.Update)
		vAuth.DELETE("/:id", h.Delete)
	}
}
