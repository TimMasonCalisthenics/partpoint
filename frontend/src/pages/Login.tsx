import { useState, useEffect } from 'react';

import { User, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, login } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role?.toLowerCase() === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();
    if (!identifier || !password) {
      setErrorMsg('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user);
        // admin → หน้าควบคุม, user ปกติ → หน้าหลัก
        if (data.user?.role?.toLowerCase() === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }

      } else {
        setErrorMsg(data.error || 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    } finally {
      setLoading(false);
    }
  };

  return (
    // เปลี่ยนจาก justify-end pb-12 เป็น justify-center หรือเพิ่ม margin top เพื่อดันขึ้น
    // ปรับ background อิงจากรูปตัวอย่าง
    <div className="min-h-screen relative flex flex-col items-center pt-10 md:pt-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/car-17357696.jpg" 
          alt="Snow Mountain with Porsche" 
          // ให้รูปอยู่ตรงกลางตามปกติแบบภาพซ้าย
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay สีเข้มทับรูปภาพให้ตัวหนังสือเด่นขึ้น (ปรับความเข้มเป็น 70%) */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Main Content Container (ปรับให้ไม่ผูกกับ mt-auto เพื่อให้ขยับอิสระตาม pt ด้านบน) */}
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center mt-20 md:mt-16">
        
        {/* Logo Section (เอาเฉพาะแฉกออโตพาร์ทหมุนๆ) */}
        <div className="flex flex-col items-center mb-8 transform -skew-x-12">
            
            <div className="relative w-24 h-24 mb-3 flex items-center justify-center transform skew-x-12 drop-shadow-lg">
                 {/* 1. เฟืองสีขาว (หมุน) */}
                 <img src="/partpointLogowhite.png" alt="PARTPOINT Gear" className="w-full h-full object-contain" />
            </div>

            <h1 className="text-6xl md:text-7xl tracking-tighter flex items-center shadow-black drop-shadow-xl font-black mb-2">
                {/* คำว่า PART สีขาวล้วน */}
                <span className="italic pr-2 text-white">PART</span>
                {/* คำว่า POINT สีแดงทึบ */}
                <span className="text-[#FF2A2A] italic">POINT</span>
            </h1>
            <p className="text-gray-200 text-xs tracking-[0.4em] font-bold uppercase opacity-90 block transform skew-x-12">
                Best Automotive Part Finder
            </p>
        </div>

        {/* Login Box (Glassmorphism effect) */}
        <div className="bg-[#111111]/80 backdrop-blur-md border border-gray-800 rounded-3xl w-full p-8 shadow-2xl">
          
          {errorMsg && (
            <div className="mb-4 bg-red-900/30 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Username Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input 
                type="text" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="ชื่อผู้ใช้งาน หรือ อีเมล" 
                className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-red-600 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none transition-colors placeholder:text-gray-600 font-medium"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="รหัสผ่าน" 
                className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-red-600 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none transition-colors placeholder:text-gray-600 font-medium"
                required
              />
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#db2b2b] hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl py-4 mt-4 transition-all flex items-center justify-center gap-2 group shadow-[0_4px_14px_0_rgba(219,43,43,0.39)] hover:shadow-[0_6px_20px_rgba(219,43,43,0.23)] hover:-translate-y-0.5"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  เข้าสู่ระบบ 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center text-sm font-medium">
             <span className="text-gray-500">ยังไม่มีสมาชิก? </span>
             <Link to="/register" className="text-red-500 hover:text-red-400 transition-colors">
                สมัครสมาชิก
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
