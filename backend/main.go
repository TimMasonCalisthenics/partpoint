package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"partpoint-backend/prisma/db"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil{
		log.Println("Note: .env file not found(May use local env)")
	}
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err := client.Prisma.Disconnect(); err != nil {
			panic(err)
		}
	}()

	ctx := context.Background()

	fmt.Println("Creating product category...")
	exterior, err := client.Category.CreateOne(
		db.Category.Name.Set("Exterior"),
	).Exec(ctx)
	if err != nil {
		log.Printf("Already Exist or Error: %v", err)
	} else {
		fmt.Printf("✅ Category created: %s (ID: %d)\n", exterior.Name, exterior.ID)
	}

	fmt.Println("Adding car data")
	car, err := client.Vehicle.CreateOne(
		db.Vehicle.Brand.Set("BMW"),
		db.Vehicle.Model.Set("G20 330e"),
		db.Vehicle.Year.Set("2024"),
		db.Vehicle.Type.Set("Sedan"),
	).Exec(ctx)

	if err != nil {
		log.Fatal("Error adding car ", err)
	}

	// 4. แสดงผลลัพธ์เป็น JSON สวยๆ
	result, _ := json.MarshalIndent(car, "", "  ")
	fmt.Printf("✅ Car added successful\n%s\n", string(result))
}
