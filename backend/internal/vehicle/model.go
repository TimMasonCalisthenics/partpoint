package vehicle

type Vehicle struct {
	ID    int    `gorm:"column:id;primaryKey" json:"id"`
	Brand string `gorm:"column:brand" json:"brand"`
	Model string `gorm:"column:model" json:"model"`
	Year  int    `gorm:"column:year" json:"year"`
	Type  string `gorm:"column:type" json:"type"`
}

// บังคับชื่อ table = Vehicle (ไม่ให้เป็น vehicles)
func (Vehicle) TableName() string {
	return "vehicles"
}

