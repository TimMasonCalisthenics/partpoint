package scripts


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
	if err := godotenv.Load("../backend/.env"); err != nil {
		log.Println("Info: .env file not found")
	}

	dsn := normalizePostgresURL(os.Getenv("DATABASE_URL"))
	if dsn == "" {
		supabaseURL := os.Getenv("SUPABASE_DATABASE_URL")
		dsn = normalizePostgresURL(supabaseURL)
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	var tables []string
	db.Raw("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'").Scan(&tables)

	fmt.Println("Existing Tables:")
	for _, t := range tables {
		fmt.Println("-", t)
	}

	fmt.Println("\nChecking Products Data:")
	type Product struct {
		ID   int
		Name string
	}
	var products []Product
	db.Table("part_products").Select("id, name").Order("id asc").Scan(&products)
	for _, p := range products {
		fmt.Printf("ID: %d, Name: [%s]\n", p.ID, p.Name)
	}

	fmt.Println("\nDescribing Table: favorites")
	type ColumnInfo struct {
		ColumnName string `gorm:"column:column_name"`
		DataType   string `gorm:"column:data_type"`
	}
	var columns []ColumnInfo
	db.Raw("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'favorites'").Scan(&columns)
	for _, col := range columns {
		fmt.Printf("Column: %s, Type: %s\n", col.ColumnName, col.DataType)
	}
}
