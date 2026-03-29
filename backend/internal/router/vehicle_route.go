package router

import (
	"backend/internal/vehicle"

	"github.com/gin-gonic/gin"
)

func SetupVehicleRoutes(r *gin.Engine, admin *gin.RouterGroup, h *vehicle.VehicleHandler) {

	// PUBLIC
	v := r.Group("/vehicles")
	{
		v.GET("", h.GetAll)
		v.GET("/:id", h.GetByID)
	}

	// ADMIN ONLY
	vAdmin := admin.Group("/vehicles")
	{
		vAdmin.POST("", h.Create)
		vAdmin.PUT("/:id", h.Update)
		vAdmin.DELETE("/:id", h.Delete)
	}
}
