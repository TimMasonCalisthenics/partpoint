package router

import (
    "github.com/gin-gonic/gin"
    "backend/internal/auth"
    "gorm.io/gorm"
)

func SetupAuthRoutes(r *gin.Engine, db *gorm.DB) {
    // สร้าง repository/service/handler ด้วย db
    userRepo := auth.NewUserRepository(db)
    userService := auth.NewUserService(userRepo)
    userHandler := auth.NewUserHandler(userService)

    // routes
    r.POST("/register", userHandler.Register) //URL http://localhost:8080/register
    r.POST("/verify-otp", userHandler.VerifyOTP)
    r.POST("/login", userHandler.Login)
    r.POST("/logout", userHandler.Logout)
}