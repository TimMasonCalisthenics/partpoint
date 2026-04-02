package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type PartProduct struct {
	ID             uint    `json:"id"`
	Name           string  `json:"name"`
	Brand          string  `json:"brand"`
	BasePrice      float64 `json:"basePrice"`
	ImageURL       string  `json:"imageURL"`
	Tags           string  `json:"tags"`
}

func main() {
	godotenv.Load()
	dsn := os.Getenv("DATABASE_URL")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	var products []PartProduct
	db.Table("part_products").Find(&products)
	
	fmt.Printf("%-3s | %-40s | %-10s | %-20s\n", "ID", "Name", "Price", "ImageURL")
	fmt.Println("--------------------------------------------------------------------------------")
	for _, p := range products {
		fmt.Printf("%-3d | %-40s | %-10.2f | %-20s\n", p.ID, p.Name, p.BasePrice, p.ImageURL)
	}
}
