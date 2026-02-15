package main

import (
	"encoding/json"
	"log"
	"net/http"

	"partpoint-backend/prisma/db" // เช็คชื่อ module ใน go.mod ให้ตรงกัน

	"github.com/joho/godotenv"
)

func main() {
	// 1. โหลด .env
	if err := godotenv.Load(); err != nil {
		log.Println("Info: .env file not found")
	}

	// 2. เชื่อมต่อ Database
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err := client.Prisma.Disconnect(); err != nil {
			panic(err)
		}
	}()

	log.Println("✅ Connected to Database!")

	// 3. สร้าง Server และ API ง่ายๆ
	http.HandleFunc("/api/test", func(w http.ResponseWriter, r *http.Request) {
		// เปิด CORS ให้ Frontend (Port 5173) เข้าถึงได้
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Content-Type", "application/json")

		response := map[string]string{"message": "Hello from Go Backend!"}
		json.NewEncoder(w).Encode(response)
	})

	log.Println("🚀 Server running on http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
