package main

import (
	"fmt"
	"log"
	"os"
	"time"
	"strings"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// PartProduct struct to match database schema
type PartProduct struct {
	ID             uint      `gorm:"primaryKey;column:id"`
	CategoryID     int       `gorm:"index;column:categoryId"`
	Subcategory    string    `gorm:"size:255;column:subcategory"`
	Function       string    `gorm:"size:255;column:function"`
	Name           string    `gorm:"size:255;not null;column:name"`
	Brand          string    `gorm:"size:255;column:brand"`
	Description    string    `gorm:"type:text;column:description"`
	BasePrice      float64   `gorm:"type:decimal(10,2);column:basePrice"`
	PromoPrice     float64   `gorm:"type:decimal(10,2);column:promoPrice"`
	ImageURL       string    `gorm:"size:255;column:imageURL"`
	AffiliateLink  string    `gorm:"size:255;column:affiliateLink"`
	Specifications string    `gorm:"type:text;column:specifications"` // JSON string
	Tags           string    `gorm:"type:text;column:tags"`           // JSON string
	CreatedAt      time.Time `gorm:"autoCreateTime;column:createdAt"`
	UpdatedAt      time.Time `gorm:"autoUpdateTime;column:updatedAt"`
}

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
		log.Fatal("DATABASE_URL not found in .env")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Connected to Database for seeding...")

	// Auto-migrate the table if it's missing or changed
	db.AutoMigrate(&PartProduct{})

	// Data to seed
	products := []PartProduct{
		// CATEGORY 1: TIRES
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
			CategoryID:  1,
			Subcategory: "ยาง SUV",
			Function:    "SUV",
			Name:        "BRIDGESTONE Ecopia H/L 001",
			Brand:       "Bridgestone",
			Description: "ยางสำหรับรถ SUV ที่เน้นความนุ่มนวล ประหยัดน้ำมัน และอายุการใช้งานยาวนาน",
			BasePrice:   4200,
			ImageURL:    "/Example_product_pic/product2.1.png",
			AffiliateLink: "https://www.bridgestone.co.th",
			Tags:        `["Eco", "Comfort"]`,
		},

		// CATEGORY 2: WHEELS
		{
			ID:          21,
			CategoryID:  2,
			Subcategory: "แม็กซิ่ง",
			Function:    "style",
			Name:        "VOLK RACING TE37 SAGA S-Plus 18x9.5",
			Brand:       "Volk Racing",
			Description: "ล้อ Forged อันเป็นตำนานให้น้ำหนักที่เบาเป็นพิเศษและความแข็งแรงสูงสุด นิยมที่สุดในกลุ่มรถซิ่ง",
			BasePrice:   85000,
			ImageURL:    "/Example_product_pic/Product6.1.jpg",
			AffiliateLink: "https://www.rayswheels.co.jp",
			Tags:        `["Legend", "Forged"]`,
		},
		{
			ID:          22,
			CategoryID:  2,
			Subcategory: "แม็กหรู",
			Function:    "premium",
			Name:        "BBS LM Diamond Black - 19 inch",
			Brand:       "BBS",
			Description: "ล้อ 2 ชิ้นระดับพรีเมียมจากเยอรมัน ดีไซน์คลาสสิกข้ามกาลเวลา",
			BasePrice:   120000,
			ImageURL:    "/Example_product_pic/Product6.2.jpg",
			AffiliateLink: "https://www.bbs.com",
			Tags:        `["Premium", "Classic"]`,
		},

		// CATEGORY 3: OIL
		{
			ID:          3,
			CategoryID:  3,
			Subcategory: "สังเคราะห์แท้",
			Function:    "engine-protection",
			Name:        "Mobil 1 Full Synthetic 5W-30",
			Brand:       "Mobil 1",
			Description: "น้ำมันเครื่องสังเคราะห์แท้ 100% ปกป้องเครื่องยนต์สูงสุด และช่วยประหยัดน้ำมันเชื้อเพลิง",
			BasePrice:   2150,
			ImageURL:    "/CarPart/oilcan.png",
			AffiliateLink: "https://www.mobil.com",
			Tags:        `["Eco", "Full Synthetic"]`,
		},
		{
			ID:          4,
			CategoryID:  3,
			Subcategory: "สังเคราะห์แท้",
			Function:    "performance",
			Name:        "LIQUI MOLY Molygen New Generation 5W-40",
			Brand:       "Liqui Moly",
			Description: "น้ำมันเครื่องสารสีเรืองแสงเอกลักษณ์เฉพาะตัว ช่วยลดแรงเสียดทานและปกป้องการสึกหรอได้ดีเยี่ยม",
			BasePrice:   2450,
			ImageURL:    "/Example_product_pic/Product1.1.png",
			AffiliateLink: "https://www.liqui-moly.com",
			Tags:        `["Performance", "Tech"]`,
		},

		// CATEGORY 4: SHOCKS
		{
			ID:          6,
			CategoryID:  4,
			Subcategory: "สตรัทปรับเกลียว",
			Function:    "performance",
			Name:        "OHLINS Road & Track - Coilover Kit",
			Brand:       "Ohlins",
			Description: "โช้คอัพระดับโลกที่มาพร้อมเทคโนโลยี DFV ให้ความนุ่มนวลบนถนนและสมรรถนะสูงสุดในสนามแข่ง",
			BasePrice:   85000,
			ImageURL:    "/Example_product_pic/product3.5.jpg",
			AffiliateLink: "https://www.ohlins.com",
			Tags:        `["Professional", "Track"]`,
		},
		{
			ID:          7,
			CategoryID:  4,
			Subcategory: "โช้คมาตรฐาน",
			Function:    "comfort",
			Name:        "KYB New SR Special",
			Brand:       "KYB",
			Description: "โช้คอัพสมรรถนะสูงที่มาทดแทนของเดิมได้ทันที ให้การทรงตัวที่ดีขึ้นโดยไม่เสียความนุ่มนวล",
			BasePrice:   18500,
			ImageURL:    "/Example_product_pic/product3.1.jpg",
			AffiliateLink: "https://www.kyb.co.th",
			Tags:        `["Best Value", "Comfort"]`,
		},

		// CATEGORY 5: BRAKES
		{
			ID:          11,
			CategoryID:  5,
			Subcategory: "ชุดเบรกใหญ่",
			Function:    "performance",
			Name:        "BREMBO GT Systems - 6 Piston Red",
			Brand:       "Brembo",
			Description: "ชุดเบรกสมรรถนะสูงที่ออกแบบมาเพื่อการใช้งานหนักโดยเฉพาะ ทนความร้อนเยี่ยม",
			BasePrice:   145000,
			ImageURL:    "/CarPart/car_break.png",
			AffiliateLink: "https://www.brembo.com",
			Tags:        `["Performance", "Big Brake"]`,
		},
		{
			ID:          12,
			CategoryID:  5,
			Subcategory: "ผ้าเบรกซิ่ง",
			Function:    "racing",
			Name:        "ENDLESS MX72 Brake Pads",
			Brand:       "Endless",
			Description: "ผ้าเบรกที่ใช้ได้ทั้งถนนและสนาม มั่นใจทุกแรงกด ทนร้อนได้ถึง 700 องศา",
			BasePrice:   9500,
			ImageURL:    "/Example_product_pic/Product4.2.jpg",
			AffiliateLink: "https://www.endless-sport.co.jp",
			Tags:        `["Racing", "Ceramic"]`,
		},

		// CATEGORY 6: BATTERY
		{
			ID:          31,
			CategoryID:  6,
			Subcategory: "แบตเตอรี่แห้ง",
			Function:    "reliable",
			Name:        "AMARON Pro DIN80 Maintenance Free",
			Brand:       "Amaron",
			Description: "แบตเตอรี่ที่ขึ้นชื่อเรื่องความทนทานเป็นอันดับหนึ่ง อายุการใช้งานยาวนานกว่าปกติ 2 เท่า",
			BasePrice:   4500,
			ImageURL:    "/CarPart/Car_Battery.png",
			AffiliateLink: "https://www.amaron.in",
			Tags:        `["Durable", "Long Life"]`,
		},

		// CATEGORY 7: ENGINE PARTS
		{
			ID:          41,
			CategoryID:  7,
			Subcategory: "ชุดจุดระเบิด",
			Function:    "efficiency",
			Name:        "NGK Iridium IX Spark Plugs - Set of 4",
			Brand:       "NGK",
			Description: "หัวเทียนเข็มอิริเดียม ให้การจุดระเบิดที่รวดเร็วและแม่นยำ ช่วยลดอาการสะดุดของเครื่องยนต์",
			BasePrice:   1600,
			ImageURL:    "/CarPart/piston_metal.png",
			AffiliateLink: "https://www.ngk.com",
			Tags:        `["Best Seller", "Efficiency"]`,
		},
		{
			ID:          42,
			CategoryID:  7,
			Subcategory: "ชุดลูกสูบ",
			Function:    "performance",
			Name:        "CP-CARRILLO Forged Pistons 86mm",
			Brand:       "CP-Carrillo",
			Description: "ลูกสูบฟอร์จระดับโลก ออกแบบมาเพื่อรองรับบูสต์สูงและแรงม้ามหาศาล",
			BasePrice:   28000,
			ImageURL:    "/CarPart/piston_metal.png",
			AffiliateLink: "https://www.cp-carrillo.com",
			Tags:        `["Forged", "High Strength"]`,
		},

		// CATEGORY 8: PERFORMANCE UPGRADES
		{
			ID:          51,
			CategoryID:  8,
			Subcategory: "ระบบอัดอากาศ",
			Function:    "performance",
			Name:        "HKS Super SQV IV Black Edition",
			Brand:       "HKS",
			Description: "โบลว์ออฟวาล์วเสียงอันเป็นเอกลักษณ์ ช่วยถอนบูสต์ส่วนเกิน ปกป้องใบเทอร์โบ",
			BasePrice:   8500,
			ImageURL:    "/CarPart/piston_metal.png",
			AffiliateLink: "https://www.hks-power.co.jp",
			Tags:        `["Turbo", "Style"]`,
		},
		{
			ID:          52,
			CategoryID:  8,
			Subcategory: "กรองอากาศ",
			Function:    "efficiency",
			Name:        "K&N High-Flow Air Filter - Washable",
			Brand:       "K&N",
			Description: "กรองอากาศที่ล้างทำความสะอาดได้ ช่วยให้อากาศไหลเวียนได้ดีขึ้น เพิ่มแรงม้าอย่างเห็นได้ชัด",
			BasePrice:   3500,
			ImageURL:    "/CarPart/tire_rebg.png",
			AffiliateLink: "https://www.knfilters.com",
			Tags:        `["Eco", "Efficiency"]`,
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
			// Found, update it
			db.Model(&existing).Updates(p)
			log.Printf("🔄 Updated: %s\n", p.Name)
		}
	}

	fmt.Println("-------------------------------------------")
	fmt.Println("🚀 Seeding products finalized!")
}
