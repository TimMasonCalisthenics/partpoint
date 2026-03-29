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
	"backend/internal/category"
	"backend/internal/favourite"
	"backend/internal/middleware"
	"backend/internal/price"
	"backend/internal/product"
	"backend/internal/router"
	"backend/internal/store"
	"backend/internal/user"
	"backend/internal/vehicle"
)

func main() {
	// โหลด .env
	if err := godotenv.Load(); err != nil {
		log.Println("Info: .env file not found")
	}

	// อ่าน config DB
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

	r := gin.Default()

	// =========================
	// AUTH MODULE
	// =========================
	authRepo := auth.NewUserRepository(db)
	authService := auth.NewUserService(authRepo)
	authHandler := auth.NewUserHandler(authService)

	r.POST("/register", authHandler.Register)
	r.POST("/login", authHandler.Login)

	// =========================
	// PROTECTED ROUTES
	// =========================
	protected := r.Group("")
	protected.Use(middleware.AuthMiddleware())

	protected.POST("/logout", authHandler.Logout)

	// =========================
	// PRODUCT MODULE
	// =========================
	productRepo := product.NewProductRepository(db)
	productService := product.NewProductService(productRepo)
	productHandler := product.NewProductHandler(productService)

	router.SetupProductRoutes(r, productHandler)

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

	router.SetupStoreRoutes(r, storeHandler)

	// =========================
	// USER PROFILE MODULE
	// =========================
	userRepo := user.NewUserRepository(db)
	userService := user.NewUserService(userRepo)
	userHandler := user.NewUserHandler(userService)

	// ส่ง protected group เข้าไปเลย ป้องกัน route ซ้ำ + บังคับ auth
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

	router.SetupVehicleRoutes(r, protected, vehicleHandler) //public

	// =========================
	// CATEGORY MODULE
	// =========================
	categoryRepo := category.NewCategoryRepository(db)
	categoryService := category.NewCategoryService(categoryRepo)
	categoryHandler := category.NewCategoryHandler(categoryService)

	router.SetupCategoryRoutes(r, protected, categoryHandler) //public

	log.Println("Server running on http://localhost:8080")

	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
