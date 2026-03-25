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
	userRepo := auth.NewUserRepository(db)
	userService := auth.NewUserService(userRepo)
	userHandler := auth.NewUserHandler(userService)

	r.POST("/register", userHandler.Register)
	r.POST("/login", userHandler.Login)
	r.POST("/logout", userHandler.Logout)

	// --- ถ้ามี module อื่น ๆ ก็ทำแบบเดียวกัน ---
	// productRepo := product.NewProductRepository(db)
	// productService := product.NewProductService(productRepo)
	// productHandler := product.NewProductHandler(productService)
	// r.GET("/products", productHandler.GetAll)

	log.Println("Server running on http://localhost:8080")

	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
