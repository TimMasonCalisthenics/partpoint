package router

import (
	"backend/internal/user"

	"github.com/gin-gonic/gin"
)

func SetupUserRoutes(r *gin.RouterGroup, handler *user.UserHandler) {
	r.GET("/profile", handler.GetProfile)
}

func SetupUserAdminRoutes(r *gin.RouterGroup, handler *user.UserHandler) {
	r.GET("/users", handler.ListUsers)
	r.PUT("/users/:id/role", handler.UpdateRole)
	r.PUT("/users/:id/status", handler.UpdateStatus)
}
