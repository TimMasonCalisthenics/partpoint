# 🚗 PARTPOINT - Best Automotive Part Finder

**PARTPOINT** คือเว็บแอปพลิเคชันที่เป็นศูนย์รวมข้อมูลและแหล่งขายชิ้นส่วนรถยนต์ โดยมีวัตถุประสงค์เพื่อช่วยให้ผู้รักการแต่งรถสามารถ **เปรียบเทียบราคา (Price Comparison)** และเข้าถึงข้อมูลอะไหล่ที่ **ถูกต้องแม่นยำ** ได้ง่ายขึ้น โดยระบบจะทำหน้าที่ชี้เป้าแหล่งขาย (Redirect) ไปยังร้านค้าภายนอก


## ✨ ฟีเจอร์หลัก (Key Features)

อ้างอิงจากความต้องการของผู้ใช้และระบบ (User & System Requirements):

* **🔍 Search & Filter:** ค้นหาอะไหล่ได้เจาะจงตาม **ยี่ห้อ (Brand), รุ่น (Model), และปี (Year)** ของรถยนต์
* **📂 Categorization:** แยกหมวดหมู่สินค้าชัดเจน เช่น ภายนอก (Exterior), ภายใน (Interior), และเครื่องยนต์ (Engine)
* **⚖️ Price Comparison:** เปรียบเทียบราคาอะไหล่ชิ้นเดียวกันจากหลายร้านค้า (Stores)
* **🔗 Store Redirect:** ระบบจะพาผู้ใช้ไปยังหน้าร้านค้าที่มีของขายจริง
* **👤 Membership:** ระบบสมัครสมาชิกและเข้าสู่ระบบสำหรับผู้ใช้งาน

## 🛠️ Tech Stack

โปรเจ็คนี้ใช้สถาปัตยกรรมแบบ **Client-Server (3 Tier Architecture)**:

**Frontend (Presentation Tier):**
* React (TypeScript)
* Vite
* Tailwind CSS

**Backend (Logic Tier):**
* Golang (Go)
* Prisma ORM
* Clean / Layered Architecture

**Database (Data Tier):**
* PostgreSQL

---

## 🚀 วิธีการติดตั้งและรันโปรเจ็ค (Installation)

โปรเจ็คนี้เป็นแบบ **Monorepo** (รวม Frontend และ Backend ไว้ในที่เดียว) กรุณาทำตามขั้นตอนดังนี้:

### 1. Prerequisites (สิ่งที่ต้องมี)
* [Node.js](https://nodejs.org/) (v18+)
* [Go](https://go.dev/) (v1.20+)
* [PostgreSQL](https://www.postgresql.org/)

### 2. Clone Repository
```bash
git clone https://github.com/TimMasonCalisthenics/partpoint.git
cd partpoint
