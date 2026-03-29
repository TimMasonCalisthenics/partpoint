package category

type Category struct {
	ID          int    `gorm:"column:id;primaryKey" json:"id"`
	Name        string `gorm:"column:name" json:"name"`
	Description string `gorm:"column:description" json:"description"`
}

func (Category) TableName() string {
	return "Category"
}
