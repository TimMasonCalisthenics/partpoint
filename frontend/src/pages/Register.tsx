import { useState } from 'react';
import { User, Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export default function RegisterPage() {
  // สร้าง state สำหรับเปลี่ยนหน้า (1 = กรอกข้อมูล, 2 = กรอก OTP (ข้าม), 3 = สำเร็จ)
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegisterClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('รหัสผ่านไม่ตรงกัน');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // เข้าสู่ระบบ OTP Step 2
        setStep(2); 
      } else {
        setErrorMsg(data.error || 'ไม่สามารถสมัครสมาชิกได้');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setErrorMsg('กรุณากรอก OTP ให้ครบ 6 หลัก');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
         setStep(3); // ยืนยันสำเร็จ ไปหน้าสีเขียว
      } else {
         setErrorMsg(data.error || 'รหัส OTP ไม่ถูกต้องหรือหมดอายุ');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center pt-10 md:pt-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/car-17357696.jpg" 
          alt="Snow Mountain with Porsche" 
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay สีเข้มทับรูปภาพให้ตัวหนังสือเด่นขึ้น */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center mt-12 md:mt-12">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8 transform -skew-x-12">
            <div className="relative w-24 h-24 mb-3 flex items-center justify-center transform skew-x-12 drop-shadow-lg">
                 <img src="/partpointLogowhite.png" alt="PARTPOINT Gear" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-6xl md:text-7xl tracking-tighter flex items-center shadow-black drop-shadow-xl font-black mb-2">
                <span className="italic pr-2 text-white">PART</span>
                <span className="text-[#FF2A2A] italic">POINT</span>
            </h1>
            <p className="text-gray-200 text-xs tracking-[0.4em] font-bold uppercase opacity-90 block transform skew-x-12">
                Best Automotive Part Finder
            </p>
        </div>

        {/* Form Box (Glassmorphism effect) */}
        <div className="bg-[#111111]/80 backdrop-blur-md border border-gray-800 rounded-3xl w-full p-8 shadow-2xl transition-all duration-300">
          
          {step === 1 && (
            /* ================= STEP 1: กรอกข้อมูล ================= */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {errorMsg && (
                <div className="mb-4 bg-red-900/30 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium animate-in fade-in">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleRegisterClick}>
                {/* Name Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ชื่อผู้ใช้งาน" 
                    required
                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-red-600 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none transition-colors placeholder:text-gray-600 font-medium"
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="อีเมล" 
                    required
                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-red-600 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none transition-colors placeholder:text-gray-600 font-medium"
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
                    required
                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-red-600 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none transition-colors placeholder:text-gray-600 font-medium"
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="ยืนยันรหัสผ่าน" 
                    required
                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-red-600 text-white rounded-xl py-3.5 pl-12 pr-4 outline-none transition-colors placeholder:text-gray-600 font-medium"
                  />
                </div>

                {/* Register Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#db2b2b] hover:bg-red-500 disabled:opacity-50 text-white font-bold rounded-xl py-4 mt-4 transition-all flex items-center justify-center gap-2 group shadow-[0_4px_14px_0_rgba(219,43,43,0.39)] hover:shadow-[0_6px_20px_rgba(219,43,43,0.23)] hover:-translate-y-0.5"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      สมัครสมาชิก 
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-8 text-center text-sm font-medium">
                 <span className="text-gray-500">มีบัญชีอยู่แล้ว? </span>
                 <Link to="/login" className="text-red-500 hover:text-red-400 transition-colors">
                    เข้าสู่ระบบ
                 </Link>
              </div>
            </div>
          )}
          
          {step === 2 && (
            /* ================= STEP 2: ยืนยัน OTP ================= */
            <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center text-center">
              
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-red-500" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">ยืนยันตัวตน</h2>
              <p className="text-gray-400 text-sm mb-8 px-4 leading-relaxed">
                กรุณาระบุรหัส OTP 6 หลัก<br/>ที่เราได้ส่งไปยังอีเมล <span className="text-white font-bold">{email}</span> ของคุณ
              </p>

              {errorMsg && (
                <div className="mb-4 bg-red-900/30 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium animate-in fade-in">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form className="w-full space-y-6" onSubmit={handleVerifyOTP}>
                {/* OTP Input (แบบกล่องยาว ใส่ตัวเลข 6 หลัก) */}
                <div>
                  <input 
                    type="text" 
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} // รับเฉพาะตัวเลข
                    placeholder="------" 
                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-red-600 text-white rounded-xl py-4 outline-none transition-colors font-mono font-bold text-center tracking-[1em] md:tracking-[1.25em] text-2xl placeholder:text-gray-700"
                  />
                </div>

                {/* Confirm Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#db2b2b] hover:bg-red-500 disabled:opacity-50 text-white font-bold rounded-xl py-4 transition-all flex items-center justify-center gap-2 group shadow-[0_4px_14px_0_rgba(219,43,43,0.39)] hover:-translate-y-0.5"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      ยืนยัน OTP
                      <ShieldCheck className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Actions below OTP */}
              <div className="mt-8 w-full flex flex-col space-y-4 text-sm font-medium">
                 <button className="text-gray-400 hover:text-white transition-colors underline decoration-gray-600 underline-offset-4">
                    ส่งรหัสใหม่อีกครั้ง
                 </button>
                 <button 
                    onClick={() => setStep(1)} 
                    className="text-red-500 hover:text-red-400 transition-colors flex items-center justify-center gap-1 group"
                 >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                    กลับไปหน้าสมัคร
                 </button>
              </div>
            </div>
          )}

          {step === 3 && (
            /* ================= STEP 3: สำเร็จ ================= */
            <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center text-center">
              
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">สมัครสมาชิกสำเร็จ!</h2>
              <p className="text-gray-400 text-sm mb-8 px-4 leading-relaxed">
                ตอนนี้คุณเป็นสมาชิกของ PARTPOINT เรียบร้อยแล้ว
              </p>

              <button 
                onClick={() => navigate('/login')}
                className="w-full bg-[#db2b2b] hover:bg-red-500 text-white font-bold rounded-xl py-4 transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(219,43,43,0.39)] hover:-translate-y-0.5"
              >
                ไปหน้าเข้าสู่ระบบ
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
