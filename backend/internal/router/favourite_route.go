package router

import (
	"backend/internal/favourite"

	"github.com/gin-gonic/gin"
)

func SetupFavouriteRoutes(rg *gin.RouterGroup, h *favourite.FavouriteHandler) {
	fav := rg.Group("/fav")
	{
		fav.POST("", h.ToggleFavourite)
		fav.GET("", h.GetMyFavourite)
	}
}
