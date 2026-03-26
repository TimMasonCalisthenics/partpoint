package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"backend/internal/auth"
	"backend/internal/middleware"
	"backend/internal/product"
	"backend/internal/router"
)

func main() {
	// โหลด .env
	if err := godotenv.Load(); err != nil {
		log.Println("Info: .env file not found")
	}

	// อ่าน config DB จาก .env
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	// สร้าง DSN แบบถูกต้อง
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		dbHost, dbUser, dbPass, dbName, dbPort,
	)

	// เปิด connection
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Connected to Database!")

	// Auto migrate สร้างตาราง User
	if err := db.AutoMigrate(&auth.User{}); err != nil {
		log.Fatal("AutoMigrate failed:", err)
	}

	r := gin.Default()

	// --- Auth module routes ---
	userService := auth.NewUserService(auth.NewUserRepository(db)) // db ต้องสร้างก่อน
	userHandler := auth.NewUserHandler(userService)
	// userRepo := auth.NewUserRepository(db)

	// protected routes
	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/profile", func(c *gin.Context) {
			c.JSON(200, gin.H{"message": "this is protected"})
		})
		protected.POST("/logout", userHandler.Logout)
	}

	r.POST("/register", userHandler.Register)
	r.POST("/login", userHandler.Login)
	r.POST("/logout", userHandler.Logout)

	productRepo := product.NewProductRepository(db)
	productService := product.NewProductService(productRepo)
	productHandler := product.NewProductHandler(productService)

	router.SetupProductRoutes(r, productHandler)

	log.Println("Server running on http://localhost:8080")

	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
