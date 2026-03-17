import { Link } from 'react-router-dom';
import { User, Lock } from 'lucide-react'; // นำเข้าไอคอนรูปคนและแม่กุญแจ

export default function LoginPage() {
  return (
    // พื้นหลังคลุมเต็มหน้าจอ จัดให้อยู่กึ่งกลาง
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative font-sans"
      style={{ backgroundImage: "url('/bmw_m2_login.png')" }} // <-- หารูปรถสวยๆ มาตั้งชื่อนี้ไว้ใน public นะครับ
    >
      {/* แผ่นฟิล์มสีดำคลุมทับรูปภาพพื้นหลัง ให้ตัวหนังสือและกล่องเด้งขึ้นมา */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* ================= กล่องเนื้อหาตรงกลาง ================= */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center px-4">

        {/* 1. โซนโลโก้ (อยู่เหนือกล่องล็อกอิน) */}
        <div className="mb-6 flex flex-col items-center">
          {/* โลโก้รูปเฟือง (ใช้รูปจาก public) */}
          <img src="/partpointLogo.png" alt="PARTPOINT Logo" className="w-20 h-20 mb-2 object-contain" />
          
          {/* ชื่อเว็บ */}
          <h1 className="text-4xl font-orbitron tracking-widest italic flex">
            <span className="text-white">PART</span>
            <span className="text-red-600">POINT</span>
          </h1>
          <p className="text-gray-300 text-[0.65rem] tracking-[0.2em] mt-1 uppercase">Best automotive part finder</p>
        </div>

        {/* 2. กล่องฟอร์มเข้าสู่ระบบ (สีเทาเข้ม) */}
        <div className="bg-[#2a2a2a] w-full rounded-2xl p-8 md:p-10 shadow-2xl">
          <h2 className="text-2xl font-bold text-white text-center mb-8">เข้าสู่ระบบ</h2>

          <form className="flex flex-col gap-6">

            {/* ช่องชื่อผู้ใช้งาน */}
            <div className="relative">
              {/* ไอคอน User */}
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="text-white w-6 h-6" />
              </div>
              <input 
                type="text" 
                placeholder="กรอกชื่อผู้ใช้งาน" 
                // พื้นหลังดำ ขอบแดง ตามรูปเป๊ะ
                className="w-full bg-black text-white pl-12 pr-4 py-3.5 rounded-xl border-2 border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-white font-medium"
              />
            </div>

            {/* ช่องรหัสผ่าน */}
            <div className="relative">
              {/* ไอคอน Lock */}
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="text-white w-6 h-6" />
              </div>
              <input 
                type="password" 
                placeholder="รหัสผ่าน" 
                // พื้นหลังดำ ขอบขาว (แต่คลิกแล้วจะเปลี่ยนเป็นขอบแดง)
                className="w-full bg-black text-white pl-12 pr-4 py-3.5 rounded-xl border-2 border-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 placeholder-white font-medium transition"
              />
            </div>

            {/* ปุ่มเข้าสู่ระบบ */}
            <div className="mt-4 flex justify-center">
              <button 
                type="button" 
                // ไล่สีแดงจากบนลงล่างให้ดูมีมิติ
                className="bg-gradient-to-b from-[#e62020] to-[#991515] hover:from-red-500 hover:to-red-700 text-white font-bold text-lg py-3 px-12 rounded-xl transition transform hover:scale-105 shadow-[0_4px_15px_rgba(229,32,32,0.4)] flex items-center gap-1"
              >
                เข้าสู่ระบบ<span className="text-sm tracking-tighter mt-0.5">&gt;&gt;</span>
              </button>
            </div>

          </form>

          {/* 3. ลิงก์สมัครสมาชิก */}
          <div className="mt-8 text-center">
            <span className="text-gray-300 text-sm font-medium">ยังไม่มีสมาชิก? </span>
            <Link to="/register" className="text-red-600 font-bold text-sm hover:text-white transition">
              สมัครสมาชิก
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}