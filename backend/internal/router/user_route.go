package router

import (
	"backend/internal/user"

	"github.com/gin-gonic/gin"
)

func SetupUserRoutes(r *gin.RouterGroup, handler *user.UserHandler) {
	r.GET("/profile", handler.GetProfile)
	// r.GET("/favourites", handler.GetFavourites)
	// r.POST("/favourites", handler.AddFavourite)
}
