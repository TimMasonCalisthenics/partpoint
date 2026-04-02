package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// PartProduct struct to match database schema
type PartProduct struct {
	ID             uint      `gorm:"primaryKey"`
	CategoryID     int       `gorm:"index"`
	Subcategory    string    `gorm:"size:255"`
	Function       string    `gorm:"size:255"`
	Name           string    `gorm:"size:255;not null"`
	Brand          string    `gorm:"size:255"`
	Description    string    `gorm:"type:text"`
	BasePrice      float64   `gorm:"type:decimal(10,2)"`
	ImageURL       string    `gorm:"size:255"`
	AffiliateLink  string    `gorm:"size:255"`
	Specifications string    `gorm:"type:text"` // JSON string
	Tags           string    `gorm:"type:text"` // JSON string
	CreatedAt      time.Time `gorm:"autoCreateTime"`
	UpdatedAt      time.Time `gorm:"autoUpdateTime"`
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Info: .env file not found")
	}

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL not found in .env")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Connected to Database for seeding...")

	// Auto-migrate the table if it's missing or changed
	db.AutoMigrate(&PartProduct{})

	// Data to seed (Converted from frontend/src/pages/Products.tsx mock data)
	products := []PartProduct{
		{
			ID:          1,
			CategoryID:  1,
			Subcategory: "ยางสปอร์ต",
			Function:    "sport",
			Name:        "MICHELIN Pilot Sport 5 - 225/40ZR18",
			Brand:       "Michelin",
			Description: "ยางสปอร์ตสมรรถนะสูง ให้ความมั่นใจทั้งถนนแห้งและถนนเปียก ทนทานต่อการใช้งานด้วยโครงสร้างแข็งแรงพิเศษ",
			BasePrice:   6500,
			ImageURL:    "/CarPart/tire_rebg.png",
			AffiliateLink: "https://www.michelin.co.th",
			Tags:        `["New", "Sport"]`,
		},
		{
			ID:          2,
			CategoryID:  6,
			Function:    "premium",
			Name:        "BOSCH Hightec Silver Battery",
			Brand:       "Bosch",
			Description: "แบตเตอรี่คุณภาพสูง เทคโนโลยีเยอรมัน ให้กำลังสตาร์ทสูงและอายุการใช้งานที่ยาวนานกว่า",
			BasePrice:   3200,
			ImageURL:    "/CarPart/Car_Battery.png",
			AffiliateLink: "https://www.bosch.co.th",
			Tags:        `["Best Seller"]`,
		},
		{
			ID:          3,
			CategoryID:  3,
			Subcategory: "ยางสปอร์ต",
			Function:    "sport",
			Name:        "Mobil 1 Full Synthetic 5W-30",
			Brand:       "Mobil 1",
			Description: "น้ำมันเครื่องสังเคราะห์แท้ 100% ปกป้องเครื่องยนต์สูงสุด และช่วยประหยัดน้ำมันเชื้อเพลิง",
			BasePrice:   2150,
			ImageURL:    "/CarPart/oilcan.png",
			AffiliateLink: "https://www.mobil.com",
			Tags:        `["Eco"]`,
		},
		{
			ID:          4,
			CategoryID:  5,
			Subcategory: "เบรกสปอร์ต",
			Function:    "sport",
			Name:        "Brembo Ceramic Brake Pads",
			Brand:       "Brembo",
			Description: "ผ้าเบรกเกรดเซรามิกจาก Brembo ให้แรงเบรกคงที่ แม้ในสภาวะความร้อนสูง พร้อมลดฝุ่นบนขอบล้อ",
			BasePrice:   4500,
			ImageURL:    "/CarPart/car_break.png",
			AffiliateLink: "https://www.brembo.com",
			Tags:        `["Sport", "New"]`,
		},
		{
			ID:          5,
			CategoryID:  3,
			Subcategory: "กึ่งสังเคราะห์",
			Function:    "high-mileage",
			Name:        "น้ำมันเครื่อง Mobil 1 0W-30",
			Brand:       "Mobil",
			Description: "น้ำมันเครื่องคุณภาพสูงสำหรับเครื่องยนต์ดีเซลและเบนซิน พัฒนาสำหรับอายุการใช้งานยาวนาน",
			BasePrice:   1450,
			ImageURL:    "/Example_product_pic/product2.2.png",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          6,
			CategoryID:  4,
			Subcategory: "โช้คอัพสำหรับรถเก๋ง",
			Function:    "comfort",
			Name:        "โช้คอัพ KYB Excel-G",
			Brand:       "KYB",
			Description: "โช้คอัพคุณภาพสูงสำหรับขับขี่นุ่มนวลและควบคุมได้ดีขึ้น เหมาะกับรถเก๋งทั่วไป",
			BasePrice:   2100,
			ImageURL:    "/Example_product_pic/product3.1.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          7,
			CategoryID:  4,
			Subcategory: "โช้คอัพสำหรับกระบะ/SUV",
			Function:    "adventure",
			Name:        "โช้คอัพ Rancho RS5000",
			Brand:       "Rancho",
			Description: "โช้คอัพสำหรับรถกระบะและ SUV ให้สมรรถนะสูงทั้งทางเรียบและทางลุย",
			BasePrice:   3150,
			ImageURL:    "/Example_product_pic/product3.2.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          8,
			CategoryID:  4,
			Subcategory: "โช้คอัพสปอร์ต",
			Function:    "sport",
			Name:        "โช้คอัพ Bilstein B6",
			Brand:       "Bilstein",
			Description: "โช้คอัพสปอร์ตตัวกลาง ช่วยควบคุมตัวรถดีเยี่ยมบนถนนทั่วไปและทางโค้ง",
			BasePrice:   2800,
			ImageURL:    "/Example_product_pic/product3.3.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          9,
			CategoryID:  4,
			Subcategory: "โช้คอัพสปอร์ต",
			Function:    "comfort",
			Name:        "โช้คอัพ Monroe OESpectrum",
			Brand:       "Monroe",
			Description: "โช้คอัพที่พัฒนาด้วยระบบใหม่ ให้ประสิทธิภาพสูงและความสบายขณะขับขี่",
			BasePrice:   2500,
			ImageURL:    "/Example_product_pic/product3.4.png",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          10,
			CategoryID:  4,
			Subcategory: "โช้คอัพออฟโรด",
			Function:    "offroad",
			Name:        "โช้คอัพ FOX Performance Series",
			Brand:       "FOX",
			Description: "โช้คอัพออฟโรดสำหรับการใช้งานหนัก แข็งแรงและทนต่อการสั่นสะเทือนสูง",
			BasePrice:   4200,
			ImageURL:    "/Example_product_pic/Product3.5.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          11,
			CategoryID:  5,
			Function:    "daily",
			Name:        "เบรกดิสก์ Bosch QuietCast",
			Brand:       "Bosch",
			Description: "เบรกดิสก์คุณภาพสูงจาก Bosch ให้การเบรกที่เงียบและมีประสิทธิภาพสูง เหมาะกับรถยนต์ทั่วไป",
			BasePrice:   1800,
			ImageURL:    "/Example_product_pic/Product4.1.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          12,
			CategoryID:  5,
			Function:    "sport",
			Name:        "เบรก Brembo Sport",
			Brand:       "Brembo",
			Description: "เบรกสปอร์ตระดับพรีเมี่ยมจาก Brembo ให้สมรรถนะเบรกสูงสุดและควบคุมได้ดีเยี่ยม",
			BasePrice:   3200,
			ImageURL:    "/Example_product_pic/Product4.2.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          13,
			CategoryID:  5,
			Function:    "safety",
			Name:        "เบรก Akebono ProACT",
			Brand:       "Akebono",
			Description: "เบรกคุณภาพจากญี่ปุ่น ให้ความปลอดภัยสูงและทนทานต่อการใช้งานหนัก",
			BasePrice:   2100,
			ImageURL:    "/Example_product_pic/Product4.3.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          14,
			CategoryID:  5,
			Function:    "sport",
			Name:        "เบรก Hawk HP Plus",
			Brand:       "Hawk",
			Description: "เบรกประสิทธิภาพสูงสำหรับรถสปอร์ตและรถแต่ง ให้การหยุดรถที่รวดเร็วและแม่นยำ",
			BasePrice:   2800,
			ImageURL:    "/Example_product_pic/Product4.4.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          15,
			CategoryID:  5,
			Function:    "sport",
			Name:        "เบรก StopTech SportStop",
			Brand:       "StopTech",
			Description: "เบรกสปอร์ตที่ออกแบบมาสำหรับการใช้งานจริง ให้สมดุลระหว่างประสิทธิภาพและความทนทาน",
			BasePrice:   2500,
			ImageURL:    "/Example_product_pic/Product4.5.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          16,
			CategoryID:  5,
			Function:    "daily",
			Name:        "เบรก EBC Greenstuff",
			Brand:       "EBC",
			Description: "เบรกที่ให้ประสิทธิภาพสูงและปลอดภัยสำหรับการขับขี่ประจำวัน",
			BasePrice:   1900,
			ImageURL:    "/Example_product_pic/Product4.6.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          17,
			CategoryID:  6,
			Function:    "multipurpose",
			Name:        "แบตเตอรี่ 3K MF DIN80L",
			Brand:       "3K",
			Description: "แบตเตอรี่แห้ง Maintenance Free กำลังไฟ 80Ah สำหรับรถยนต์ขนาดกลาง",
			BasePrice:   3250,
			ImageURL:    "/Example_product_pic/Product4.7.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          18,
			CategoryID:  6,
			Function:    "premium",
			Name:        "แบตเตอรี่ VARTA Silver Dynamic 12V 70Ah",
			Brand:       "VARTA",
			Description: "แบตเตอรี่มาตรฐานยุโรประดับพรีเมียม ให้พลังสตาร์ทสูงและอายุการใช้งานยาวนาน",
			BasePrice:   3150,
			ImageURL:    "/Example_product_pic/Product5.2.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          19,
			CategoryID:  6,
			Function:    "agm",
			Name:        "แบตเตอรี่ Panasonic AGM 12V 75Ah",
			Brand:       "Panasonic",
			Description: "แบตเตอรี่ AGM สำหรับรถที่ใช้ระบบไฟฟ้าหนักและรถ hybrid ให้การคายประจุสูง",
			BasePrice:   4100,
			ImageURL:    "/Example_product_pic/Product5.3.png",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          20,
			CategoryID:  6,
			Function:    "reliable",
			Name:        "แบตเตอรี่ GS Yuasa NS70L",
			Brand:       "GS Yuasa",
			Description: "แบตเตอรี่ญี่ปุ่นยอดนิยม เหมาะกับรถยนต์ทั้งขนาดเล็กและขนาดกลาง ใช้งานมั่นใจตลอดอายุ",
			BasePrice:   3700,
			ImageURL:    "/Example_product_pic/Product5.4.png",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          21,
			CategoryID:  2,
			Function:    "style",
			Name:        "แม็ก YOKOHAMA XC-5 18\"",
			Brand:       "YOKOHAMA",
			Description: "แม็กอัลลอยขนาด 18 นิ้ว ดีไซน์ล้ำสมัย แข็งแรงทนทาน น้ำหนักเบา",
			BasePrice:   6900,
			ImageURL:    "/Example_product_pic/Product6.1.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          22,
			CategoryID:  2,
			Function:    "sport",
			Name:        "แม็ก OZ Racing HyperGT 17\"",
			Brand:       "OZ Racing",
			Description: "แม็กสปอร์ตระดับพรีเมียม สวยงาม รองรับแรงดันสูง และการขับขี่แนวสปอร์ต",
			BasePrice:   8200,
			ImageURL:    "/Example_product_pic/Product6.2.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          23,
			CategoryID:  2,
			Function:    "lightweight",
			Name:        "แม็ก Enkei RPF1 16\"",
			Brand:       "Enkei",
			Description: "แม็กน้ำหนักเบา กระจายความร้อนดี เหมาะทั้งใช้งานและแต่งรถ",
			BasePrice:   4500,
			ImageURL:    "/Example_product_pic/Product6.3.jpg",
			AffiliateLink: "autobacs.co.th",
		},
		{
			ID:          24,
			CategoryID:  2,
			Function:    "premium",
			Name:        "แม็ก Work Emotion CR kiwami 19\"",
			Brand:       "Work",
			Description: "แม็กรุ่น top-tier สำหรับผู้ต้องการแต่งรถด้วยลุคสุดพรีเมียม คงทนสวยยาวนาน",
			BasePrice:   12500,
			ImageURL:    "/Example_product_pic/Product6.4.jpg",
			AffiliateLink: "autobacs.co.th",
		},
	}

	for _, p := range products {
		var existing PartProduct
		if err := db.Where("id = ?", p.ID).First(&existing).Error; err != nil {
			// Not found, create it
			if err := db.Create(&p).Error; err != nil {
				log.Printf("Failed to seed product %d: %v\n", p.ID, err)
			} else {
				log.Printf("✅ Seeded: %s\n", p.Name)
			}
		} else {
			// Found, update it to match newest logic (e.g. categoryID)
			db.Model(&existing).Updates(p)
			log.Printf("🔄 Updated: %s\n", p.Name)
		}
	}

	fmt.Println("-------------------------------------------")
	fmt.Println("🚀 Seeding products finalized!")
}
