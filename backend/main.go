package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"partpoint-backend/prisma/db"
)

func main() {
	// โหลด .env
	if err := godotenv.Load(); err != nil {
		log.Println("Info: .env file not found")
	}

	// Connect DB
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		log.Fatal(err)
	}
	defer client.Prisma.Disconnect()

	log.Println("Connected to Database!")

	// Gin server
	r := gin.Default()

	r.GET("/api/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello from Go Backend!",
		})
	})

	log.Println("🚀 Server running on http://localhost:8080")
	r.Run(":8080")
}