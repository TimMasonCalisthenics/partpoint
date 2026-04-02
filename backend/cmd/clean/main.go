package main

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func normalizePostgresURL(urlStr string) string {
	if urlStr == "" {
		return ""
	}
	params := "sslmode=require&default_query_exec_mode=exec"
	if strings.Contains(urlStr, "?") {
		return urlStr + "&" + params
	}
	return urlStr + "?" + params
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Info: .env file not found")
	}

	dsn := normalizePostgresURL(os.Getenv("DATABASE_URL"))
	if dsn == "" {
		dsn = normalizePostgresURL(os.Getenv("SUPABASE_DATABASE_URL"))
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("🚀 Cleaning up invalid products (Name is empty or ID is 0)...")

	// Delete products with empty name or BasePrice = 0 if they look like placeholders
	result := db.Exec("DELETE FROM part_products WHERE name = '' OR name IS NULL OR id = 0")
	if result.Error != nil {
		log.Fatal(result.Error)
	}

	fmt.Printf("✅ Deleted %d invalid rows.\n", result.RowsAffected)
}
