package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"backend/internal/auth"
	"backend/internal/category"
	"backend/internal/favourite"
	"backend/internal/middleware"
	"backend/internal/price"
	"backend/internal/product"
	"backend/internal/router"
	"backend/internal/store"
	"backend/internal/upload"
	"backend/internal/user"
	"backend/internal/vehicle"
)

func main() {
	// โหลด .env
	if err := godotenv.Load(); err != nil {
		log.Println("Info: .env file not found")
	}

	// DB config
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		dbHost, dbUser, dbPass, dbName, dbPort,
	)

	// connect DB
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Connected to Database!")

	// Auto-migrate our updated models
	err = db.AutoMigrate(
		&product.PartProduct{},
		&auth.User{},
	)
	if err != nil {
		log.Println("Warning: Failed to auto-migrate PartProduct schema:", err)
	}

	// สร้างบัญชี Admin เริ่มต้น (ถ้ายังไม่มี)
	var adminCount int64
	db.Model(&auth.User{}).Where("role = ?", "admin").Count(&adminCount)
	if adminCount == 0 {
		db.Create(&auth.User{
			Username:   "PARTPOINT ADMIN",
			Email:      "admin@partpoint.com",
			Password:   "admin1234",
			Role:       "admin",
			IsVerified: true,
		})
		log.Println("⭐ Created default Admin account: admin@partpoint.com / admin1234")
	}

	r := gin.Default()

	// =========================
	// SETUP CORS
	// =========================
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // อนุญาตให้ Frontend ของเรายิงเข้ามาได้
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// =========================
	// AUTH MODULE
	// =========================
	authRepo := auth.NewUserRepository(db)
	authService := auth.NewUserService(authRepo)
	authHandler := auth.NewUserHandler(authService)

	r.POST("/register", authHandler.Register)
	r.POST("/verify-otp", authHandler.VerifyOTP)
	r.POST("/login", authHandler.Login)

	// =========================
	// USER PROTECTED (login only)
	// =========================
	protected := r.Group("")
	protected.Use(middleware.AuthMiddleware())

	protected.POST("/logout", authHandler.Logout)

	// =========================
	// ADMIN PROTECTED (login + admin)
	// =========================
	adminProtected := r.Group("")
	adminProtected.Use(middleware.AuthMiddleware())
	adminProtected.Use(middleware.AdminMiddleware())

	// =========================
	// PRODUCT MODULE
	// =========================
	productRepo := product.NewProductRepository(db)
	productService := product.NewProductService(productRepo)
	productHandler := product.NewProductHandler(productService)

	router.SetupProductRoutes(r, adminProtected, productHandler)

	// =========================
	// PRICE MODULE
	// =========================
	priceRepo := price.NewPriceRepository(db)
	priceService := price.NewPriceService(priceRepo)
	priceHandler := price.NewPriceHandler(priceService)

	router.SetupPriceRoutes(r, priceHandler)

	// =========================
	// STORE MODULE
	// =========================
	storeRepo := store.NewStoreRepository(db)
	storeService := store.NewStoreService(storeRepo)
	storeHandler := store.NewStoreHandler(storeService)

	router.SetupStoreRoutes(r, adminProtected, storeHandler)

	// =========================
	// USER PROFILE MODULE
	// =========================
	userRepo := user.NewUserRepository(db)
	userService := user.NewUserService(userRepo)
	userHandler := user.NewUserHandler(userService)

	router.SetupUserRoutes(protected, userHandler)

	// =========================
	// FAVORITE MODULE
	// =========================
	favRepo := favourite.NewFavouriteRepository(db)
	favService := favourite.NewFavouriteService(favRepo)
	favHandler := favourite.NewFavouriteHandler(favService)

	router.SetupFavouriteRoutes(protected, favHandler)

	// =========================
	// VEHICLE MODULE
	// =========================
	vehicleRepo := vehicle.NewVehicleRepository(db)
	vehicleService := vehicle.NewVehicleService(vehicleRepo)
	vehicleHandler := vehicle.NewVehicleHandler(vehicleService)

	router.SetupVehicleRoutes(r, adminProtected, vehicleHandler)

	// =========================
	// CATEGORY MODULE
	// =========================
	categoryRepo := category.NewCategoryRepository(db)
	categoryService := category.NewCategoryService(categoryRepo)
	categoryHandler := category.NewCategoryHandler(categoryService)

	router.SetupCategoryRoutes(r, adminProtected, categoryHandler)

	// =========================
	// UPLOAD MODULE (รูปสินค้า)
	// =========================
	uploadDir := "./uploads"
	uploadHandler := upload.NewUploadHandler(uploadDir)

	// Serve uploaded files as static
	r.Static("/uploads", uploadDir)

	// Upload endpoints (admin only)
	adminProtected.POST("/upload", uploadHandler.UploadImage)
	adminProtected.POST("/upload/multiple", uploadHandler.UploadMultipleImages)

	log.Println("Server running on http://localhost:8080")

	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
