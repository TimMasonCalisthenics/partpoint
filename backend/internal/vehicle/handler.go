package vehicle

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type VehicleHandler struct {
	service VehicleService
}

func NewVehicleHandler(s VehicleService) *VehicleHandler {
	return &VehicleHandler{s}
}

// POST /vehicles
func (h *VehicleHandler) Create(c *gin.Context) {
	var vehicle Vehicle
	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.Create(&vehicle); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, vehicle)
}

// GET /vehicles
func (h *VehicleHandler) GetAll(c *gin.Context) {
	vehicles, err := h.service.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, vehicles)
}

// GET /vehicles/:id
func (h *VehicleHandler) GetByID(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	vehicle, err := h.service.GetByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "vehicle not found"})
		return
	}

	c.JSON(http.StatusOK, vehicle)
}

// PUT /vehicles/:id
func (h *VehicleHandler) Update(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	var vehicle Vehicle
	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	vehicle.ID = id

	if err := h.service.Update(&vehicle); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, vehicle)
}

// DELETE /vehicles/:id
func (h *VehicleHandler) Delete(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	if err := h.service.Delete(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}
