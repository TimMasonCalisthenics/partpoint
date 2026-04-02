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

	fmt.Println("🚀 Wiping AI-seeded products (IDs: 1, 2, 3, 4, 6, 7, 11, 12, 21, 22, 31, 41, 42, 51, 52)...")

	// Delete specific seeded products
	targetIDs := []int{1, 2, 3, 4, 6, 7, 11, 12, 21, 22, 31, 41, 42, 51, 52}
	
	result := db.Exec("DELETE FROM part_products WHERE id IN (?)", targetIDs)
	if result.Error != nil {
		log.Fatal(result.Error)
	}

	fmt.Printf("✅ Success! Deleted %d AI-seeded products.\n", result.RowsAffected)
	fmt.Println("-------------------------------------------")
}
