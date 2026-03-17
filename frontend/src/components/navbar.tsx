import { Link } from 'react-router-dom';
// เรียกใช้ไอคอนจาก lucide-react (ที่เพิ่งลงไป)
import { Search, User } from 'lucide-react';

export default function Navbar() {
  // สร้างรายการเมนูไว้เพื่อวนลูปสร้างตัวคั่น (Divider) ง่ายๆ
  const navLinks = [
    { name: 'หน้าหลัก', path: '/' },
    { name: 'รวมสินค้า', path: '/products' },
    { name: 'แบรนด์', path: '/brands' },
    { name: 'เทียบสินค้า', path: '/compare' },
    { name: 'เกี่ยวกับเรา', path: '/about' },
  ];

  return (
    // --- ส่วน Container หลัก ---
    // เปลี่ยนพื้นหลังเป็นสีดำสนิท (bg-black)
    // เพิ่มขอบล่างสีแดงหนาๆ (border-b-4 border-red-600)
    // สีตัวอักษรหลักเป็นสีขาว (text-white)
    <nav className="bg-black border-b-4 border-red-600 sticky top-0 z-50 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group no-underline">

          {/* 1. รูปโลโก้ (เฟืองหมุน) */}
          <div className="relative w-14 h-14 flex items-center justify-center">
             <img src="/partpointLogowhite.png" alt="PARTPOINT Gear" className="w-full h-full object-contain" />
          </div>

          {/* 2. ข้อความโลโก้ */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold tracking-tight leading-none flex items-center">
              <span className="text-white">PART</span>
              <span className="text-red-600 ml-1">POINT</span>
            </h1>
            {/* ขีดเส้นใต้ (ถ้าต้องการ) */}
            {/* <div className="h-0.5 bg-red-600 w-full my-0.5"></div> */}
          </div>

        </Link>



        {/* ================= โซนขวา: ค้นหา, ล็อกอิน และเมนู ================= */}
        {/* ใช้ flex-col เพื่อจัดเรียงเป็น 2 แถว (บน/ล่าง) และ items-end เพื่อชิดขวา */}
        <div className="flex flex-col items-end gap-3">

          {/* --- แถวบน: ช่องค้นหา + ปุ่ม Login --- */}
          <div className="flex items-center gap-6">
            {/* ช่องค้นหา (ธีมมืด) */}
            {/* พื้นหลังสีเทาเข้ม (bg-neutral-800) */}
            <div className="hidden md:flex items-center bg-neutral-800 rounded-full px-4 py-1.5 w-[350px] border border-neutral-700 focus-within:border-red-600 transition group">
              <input
                type="text"
                placeholder="ค้นหา..."
                className="bg-transparent outline-none w-full text-sm text-black-300 placeholder-black-500"
              />
              {/* ไอคอนแว่นขยายสีแดง */}
              <Search className="text-red-600 w-5 h-5 group-focus-within:scale-110 transition" />
            </div>

            {/* ปุ่มลงชื่อเข้าใช้ */}
            <Link to="/login" className="flex items-center gap-2 group">
              <span className="text-red-600 font-bold text-base group-hover:text-white transition">ลงชื่อเข้าใช้</span>
              {/* ไอคอนคนสีแดง */}
              <User className="text-red-600 w-7 h-7 group-hover:text-white transition transform group-hover:scale-110" />
            </Link>
          </div>

          {/* --- แถวล่าง: เมนูนำทาง (มีเส้นคั่น) --- */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                // สร้างเส้นคั่น (border-r) ยกเว้นตัวสุดท้าย
                className={`
                            px-4 py-1 text-sm font-bold text-gray-100 hover:text-red-500 transition relative
                            ${index !== navLinks.length - 1 ? 'border-r-2 border-gray-600' : ''}
                        `}
              >
                {link.name}
                {/* ลูกเล่นเส้นแดงวิ่งด้านล่างเมื่อ Hover */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}