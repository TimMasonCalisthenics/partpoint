package middleware

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)


var jwtSecret []byte

func init() {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Fatal("JWT_SECRET not set")
	}
	jwtSecret = []byte(secret)
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Println("=== AUTH MIDDLEWARE RUNNING ===")
		// อ่าน token จาก cookie
		tokenString, err := c.Cookie("token")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "token required"})
			c.Abort()
			return
		}

		// Parse และ verify token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method")
			}
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			c.Abort()
			return
		}

		// ดึง claims ออกมา
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid claims"})
			c.Abort()
			return
		}

		// ดึง user_id จาก token
		userIDFloat, ok := claims["user_id"].(float64)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid user_id"})
			c.Abort()
			return
		}

		userID := int(userIDFloat)

		// set ให้ handler ใช้
		c.Set("userID", userID)

		// (optional) ถ้ามี role ใน JWT
		if role, ok := claims["role"].(string); ok {
			c.Set("role", strings.ToLower(role)) // normalize to lowercase
		}

		c.Next()

		log.Println("USER ID FROM TOKEN:", userID)
	}
}

// ตรวจสอบว่าเป็น admin
func AdminMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Println("=== ADMIN MIDDLEWARE RUNNING ===")

		role, exists := c.Get("role")

		log.Println("ROLE FROM TOKEN:", role)
		log.Printf("TYPE: %T\n", role)

		// Case-insensitive check
		roleStr, _ := role.(string)
		if !exists || strings.ToLower(roleStr) != "admin" {
			c.JSON(http.StatusForbidden, gin.H{"error": "admin access required"})
			c.Abort()
			return
		}
		c.Next()
	}
}
