package router

import (
	"backend/internal/dashboard"

	"github.com/gin-gonic/gin"
)

func SetupDashboardRoutes(r *gin.RouterGroup, handler *dashboard.DashboardHandler) {
	r.GET("/stats", handler.GetStats)
}
