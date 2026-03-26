package store

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type StoreHandler struct {
	service StoreService
}

func NewStoreHandler(s StoreService) *StoreHandler {
	return &StoreHandler{s}
}

// GET /stores
func (h *StoreHandler) GetStores(c *gin.Context) {
	stores, err := h.service.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, stores)
}

// GET /stores/:id
func (h *StoreHandler) GetStoreByID(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	store, err := h.service.GetByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "store not found"})
		return
	}

	c.JSON(http.StatusOK, store)
}

// POST /stores
func (h *StoreHandler) CreateStore(c *gin.Context) {
	var store Store

	if err := c.ShouldBindJSON(&store); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newStore, err := h.service.Create(store)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, newStore)
}

// PUT /stores/:id
func (h *StoreHandler) UpdateStore(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	var store Store
	if err := c.ShouldBindJSON(&store); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	store.ID = id

	updated, err := h.service.Update(store)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, updated)
}

// DELETE /stores/:id
func (h *StoreHandler) DeleteStore(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	err := h.service.Delete(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}
