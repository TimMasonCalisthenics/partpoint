package dashboard

import (
	"net/http"
	"backend/internal/auth"
	"backend/internal/product"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type DashboardStats struct {
	TotalProducts int64                   `json:"totalProducts"`
	TotalUsers    int64                   `json:"totalUsers"`
	LowStockCount int64                   `json:"lowStockCount"`
	RecentProducts []product.PartProduct  `json:"recentProducts"`
	LowStockItems  []product.PartProduct  `json:"lowStockItems"`
}

type DashboardHandler struct {
	db *gorm.DB
}

func NewDashboardHandler(db *gorm.DB) *DashboardHandler {
	return &DashboardHandler{db}
}

func (h *DashboardHandler) GetStats(c *gin.Context) {
	var stats DashboardStats

	// 1. Total Products
	h.db.Model(&product.PartProduct{}).Count(&stats.TotalProducts)

	// 2. Total Users
	h.db.Model(&auth.User{}).Count(&stats.TotalUsers)

	// 3. Low Stock Count (Stock < 10)
	h.db.Model(&product.PartProduct{}).Where("stock < ?", 10).Count(&stats.LowStockCount)

	// 4. Recent Products (Last 5)
	h.db.Order("created_at desc").Limit(5).Find(&stats.RecentProducts)

	// 5. Low Stock Items (Last 5)
	h.db.Where("stock < ?", 10).Order("stock asc").Limit(5).Find(&stats.LowStockItems)

	c.JSON(http.StatusOK, stats)
}
