package main

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"backend/internal/auth"
	"backend/internal/category"
	"backend/internal/dashboard"
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

func normalizePostgresURL(urlStr string) string {
	if urlStr == "" {
		return ""
	}

	if strings.Contains(urlStr, "sslmode=") {
		return urlStr
	}

	if strings.Contains(urlStr, "?") {
		return urlStr + "&sslmode=require"
	}

	return urlStr + "?sslmode=require"
}

func main() {
	// โหลด .env
	if err := godotenv.Load(); err != nil {
		log.Println("Info: .env file not found")
	}

	// DB config
	databaseURL := os.Getenv("DATABASE_URL")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	var dsn string
	supabaseURL := os.Getenv("SUPABASE_DATABASE_URL")

	if databaseURL != "" {
		dsn = normalizePostgresURL(databaseURL)
		log.Println("Using DATABASE_URL from environment")
	} else if supabaseURL != "" {
		dsn = normalizePostgresURL(supabaseURL)
		log.Println("Using SUPABASE_DATABASE_URL from environment")
	} else {
		dsn = fmt.Sprintf(
			"host=%s user=%s password=%s dbname=%s port=%s sslmode=require",
			dbHost, dbUser, dbPass, dbName, dbPort,
		)
		log.Println("Using DB_* variables from environment")
	}

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
		&favourite.Favourite{},
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

	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		frontendURL = "http://localhost:5173"
	}

	// =========================
	// SETUP CORS
	// =========================
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{frontendURL}, // อนุญาตให้ Frontend ของเรายิงเข้ามาได้
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
	// DASHBOARD MODULE
	// =========================
	dashHandler := dashboard.NewDashboardHandler(db)
	router.SetupDashboardRoutes(adminProtected, dashHandler)

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
	router.SetupUserAdminRoutes(adminProtected, userHandler)

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

	serverPort := os.Getenv("PORT")
	if serverPort == "" {
		serverPort = "8080"
	}

	log.Printf("Server running on http://localhost:%s\n", serverPort)

	if err := r.Run(":" + serverPort); err != nil {
		log.Fatal(err)
	}
}
