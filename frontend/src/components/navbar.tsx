import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { compareItems } = useCompare();
  const navLinks = [
    { name: 'หน้าหลัก', path: '/' },
    { name: 'รวมสินค้า', path: '/products' },
    { name: 'แบรนด์', path: '/brands' },
    { name: 'เทียบสินค้า', path: '/compare' },
    { name: 'เกี่ยวกับเรา', path: '/about' },
  ];


  return (
    <nav className="bg-black border-b-4 border-red-600 sticky top-0 z-50 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group no-underline">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <img src="/partpointLogowhite.png" alt="PARTPOINT Gear" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold tracking-tight leading-none flex items-center">
              <span className="text-white">PART</span>
              <span className="text-red-600 ml-1">POINT</span>
            </h1>
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

            {/* ข้อมูลผู้ใช้ หรือ ปุ่มลงชื่อเข้าใช้ */}
            {user ? (
              <div className="flex items-center gap-4">
                
                {/* ชื่อผู้ใช้ */}
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="text-red-500 w-6 h-6" />
                  <span className="font-bold text-sm hidden md:block">{user.username}</span>
                </div>

                {/* ปุ่มไปหน้าแอดมิน หรือ บัญชีผู้ใช้ */}
                {user.role?.toLowerCase() === 'admin' ? (
                  <Link 
                    to="/admin/dashboard" 
                    className="text-xs bg-red-600 text-white border border-red-500 px-3 py-1.5 rounded-full hover:bg-white hover:text-red-600 transition-all font-bold shadow-lg shadow-red-600/20"
                  >
                    หน้าควบคุม
                  </Link>

                ) : (
                  <Link 
                    to="/dashboard" 
                    className="text-xs bg-red-600/20 text-red-500 border border-red-500/30 px-3 py-1.5 rounded-full hover:bg-red-600 hover:text-white transition-all font-bold"
                  >
                    บัญชีของฉัน
                  </Link>
                )}


                {/* ปุ่มออกจากระบบ */}
                <button 
                  onClick={logout}
                  className="text-xs font-bold text-gray-400 hover:text-red-500 transition underline underline-offset-4"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 group pr-2">
                <span className="text-red-600 font-bold text-base group-hover:text-white transition">ลงชื่อเข้าใช้</span>
                <User className="text-red-600 w-7 h-7 group-hover:text-white transition transform group-hover:scale-110" />
              </Link>
            )}
          </div>

          {/* --- แถวล่าง: เมนูนำทาง (มีเส้นคั่น) --- */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                // สร้างเส้นคั่น (border-r) ยกเว้นตัวสุดท้าย
                className={`
                            px-4 py-1 text-sm font-bold text-gray-100 hover:text-red-500 transition relative group flex items-center
                            ${index !== navLinks.length - 1 ? 'border-r-2 border-gray-600' : ''}
                        `}
              >
                {link.name}
                {link.name === 'เทียบสินค้า' && compareItems.length > 0 && (
                  <span className="ml-1.5 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full leading-none min-w-[18px] text-center shadow-lg shadow-red-600/20">
                    {compareItems.length}
                  </span>
                )}

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