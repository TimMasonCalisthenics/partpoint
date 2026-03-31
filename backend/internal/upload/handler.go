package upload

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

// UploadHandler จัดการการอัปโหลดภาพสินค้า
type UploadHandler struct {
	uploadDir string
}

func NewUploadHandler(uploadDir string) *UploadHandler {
	// สร้างโฟลเดอร์ uploads ถ้ายังไม่มี
	os.MkdirAll(uploadDir, os.ModePerm)
	return &UploadHandler{uploadDir: uploadDir}
}

func (h *UploadHandler) buildImageURL(c *gin.Context, filename string) string {
	if baseURL := os.Getenv("BACKEND_URL"); baseURL != "" {
		return strings.TrimRight(baseURL, "/") + "/uploads/" + filename
	}

	scheme := "http"
	if c.Request.TLS != nil || c.GetHeader("X-Forwarded-Proto") == "https" {
		scheme = "https"
	}

	host := c.Request.Host
	return fmt.Sprintf("%s://%s/uploads/%s", scheme, host, filename)
}

// UploadImage รับไฟล์รูปภาพ 1 ไฟล์ แล้วบันทึกลงโฟลเดอร์ uploads
func (h *UploadHandler) UploadImage(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบไฟล์รูปภาพ"})
		return
	}

	// สร้างชื่อไฟล์ที่ไม่ซ้ำ
	ext := filepath.Ext(file.Filename)
	newFilename := fmt.Sprintf("product_%d%s", time.Now().UnixMilli(), ext)
	savePath := filepath.Join(h.uploadDir, newFilename)

	// บันทึกไฟล์
	if err := c.SaveUploadedFile(file, savePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "บันทึกไฟล์ล้มเหลว"})
		return
	}

	// ส่ง URL กลับ (เส้นทางที่ Frontend เข้าถึงได้)
	imageURL := h.buildImageURL(c, newFilename)
	c.JSON(http.StatusOK, gin.H{
		"url":      imageURL,
		"filename": newFilename,
	})
}

// UploadMultipleImages รับไฟล์รูปภาพหลายไฟล์ แล้วบันทึกลงโฟลเดอร์ uploads
func (h *UploadHandler) UploadMultipleImages(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบไฟล์รูปภาพ"})
		return
	}

	files := form.File["images"]
	if len(files) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบไฟล์รูปภาพ"})
		return
	}

	var urls []string
	for _, file := range files {
		ext := filepath.Ext(file.Filename)
		newFilename := fmt.Sprintf("product_%d%s", time.Now().UnixNano(), ext)
		savePath := filepath.Join(h.uploadDir, newFilename)

		if err := c.SaveUploadedFile(file, savePath); err != nil {
			continue
		}
		urls = append(urls, h.buildImageURL(c, newFilename))
	}

	c.JSON(http.StatusOK, gin.H{
		"urls": urls,
	})
}
