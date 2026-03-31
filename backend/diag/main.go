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
	if err := godotenv.Load("../.env"); err != nil {
		log.Println("Info: .env file not found")
	}

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		databaseURL = os.Getenv("SUPABASE_DATABASE_URL")
	}
	dsn := normalizePostgresURL(databaseURL)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	var tables []string
	db.Raw("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'").Scan(&tables)

	fmt.Println("Table Row Counts:")
	for _, t := range tables {
		var count int64
		// Quote the table name to handle MixedCase properly
		db.Table(fmt.Sprintf("%q", t)).Count(&count)
		fmt.Printf("- %-20s : %d rows\n", t, count)
	}
}

