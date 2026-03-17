import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    // คลุมทั้งหน้าจอ (min-h-screen) และใช้ flex แบ่งซ้าย-ขวา พื้นหลังสีดำเข้ม
    <div className="min-h-screen flex bg-[#111111] font-sans">
      
      {/* ================= ฝั่งซ้าย: รูปภาพพื้นหลัง ================= */}
      {/* hidden md:block คือ ซ่อนในมือถือ แต่จอใหญ่ให้แสดงผลกินพื้นที่ 50% (w-1/2) */}
      {/* border-r-[3px] border-red-600 คือ เส้นคั่นสีแดงฝั่งขวาของรูป */}
      <div 
        className="hidden md:block w-1/2 bg-cover bg-center border-r-[3px] border-red-600 relative"
        style={{ backgroundImage: "url('/dodgehellcat.png')" }} // <-- อย่าลืมเอารูปไปใส่ใน public
      >
        {/* ใส่ overlay สีดำบางๆ ทับรูปนิดหน่อยเพื่อความเท่ (ถ้าไม่ชอบลบออกได้) */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* ================= ฝั่งขวา: ฟอร์ม Login ================= */}
      {/* w-full หรือ 50% ในจอใหญ่ จัดให้อยู่กึ่งกลาง */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 relative">
        
        {/* กล่องเนื้อหาฟอร์ม */}
        <div className="w-full max-w-md">
          
          {/* 1. โลโก้ */}
          <h1 className="text-4xl font-extrabold mb-10 tracking-wide">
            <span className="text-white">PART</span>
            <span className="text-red-600 ml-2">POINT</span>
          </h1>

          {/* 2. ฟอร์ม */}
          <form className="flex flex-col gap-5">
            
            {/* ช่องชื่อผู้ใช้งาน */}
            <div>
              <label className="block text-red-600 font-bold mb-2 text-lg">ชื่อผู้ใช้งาน</label>
              <input 
                type="text" 
                placeholder="กรอกชื่อผู้ใช้" 
                className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900 bg-white"
              />
            </div>

            {/* ช่องรหัสผ่าน */}
            <div>
              <label className="block text-red-600 font-bold mb-2 text-lg">รหัสผ่าน</label>
              <input 
                type="password" 
                placeholder="กรอกรหัสผ่าน" 
                className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900 bg-white"
              />
            </div>

            {/* ลืมรหัสผ่าน */}
            <div className="flex justify-end mt-[-10px]">
              <Link to="/forgot-password" className="text-red-600 text-sm font-bold hover:text-white transition">
                ลืมรหัสผ่าน ?
              </Link>
            </div>

            {/* ปุ่มเข้าสู่ระบบ */}
            <div className="flex justify-center mt-2">
              <button 
                type="button" 
                className="bg-[#e62020] hover:bg-red-700 text-white font-bold text-lg py-2 px-12 rounded-lg transition transform hover:scale-105 shadow-[0_4px_14px_0_rgba(229,32,32,0.39)]"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>

          {/* 3. ลิงก์ไปหน้าสมัครสมาชิก (จัดชิดขวาล่าง) */}
          <div className="mt-16 text-right">
            <p className="text-gray-400 text-sm mb-1">ยังไม่มี สมาชิก?</p>
            <Link to="/register" className="text-red-600 font-bold text-lg hover:text-white transition">
              สมัครสมาชิก
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}