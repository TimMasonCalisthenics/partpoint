import Navbar from '../components/navbar';
import {ArrowLeft, ArrowRight} from 'lucide-react';

export default function HomePage() {
    const brands = [
    { name: 'Ford', src: '/logos/ford.png' },
    { name: 'Toyota', src: '/logos/toyota.png' },
    { name: 'Isuzu', src: '/logos/isuzu.png' },
    { name: 'Mazda', src: '/logos/mazda.png' },
    { name: 'Mitsubishi', src: '/logos/mitsubishi.png' },
    { name: 'Honda', src: '/logos/honda.png'},
    { name: 'BMW', src: '/logos/bmw.png'},
    { name: 'Mercedes Benz', src: '/logos/benz.png'},
    
  ];
  return (
    <div className="min-h-screen flex flex-col bg-black overflow-hidden">
      <Navbar />
      {/* ส่วน Hero Section (พื้นที่ต้อนรับ) */}
      <main className="flex-1 relative flex flex-col">
       <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-[url('/s63engine.jpg')]"
        >
          {/* แผ่นฟิล์มสีดำ (ถ้าอยากลองเทสว่ารูปมาไหม ให้ลองเอา 2 บรรทัดนี้ออกชั่วคราวได้ครับ) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
        </div>
        {/* เนื้อหาหลัก (ตัวหนังสือ) */}
        <div className="relative z-10 flex-1 container mx-auto px-6 md:px-12 pt-20 flex flex-col justify-center">
            
            {/* หัวข้อใหญ่ */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 flex flex-wrap items-baseline gap-4 shadow-black drop-shadow-lg">
                <span>ยินดีต้อนรับสู่</span>
                <span className="italic font-extrabold tracking-tight transform -skew-x-6">
                    <span className="text-white">PART</span>
                    <span className="text-red-600">POINT</span>
                </span>
            </h1>

            {/* คำโปรยรองสีแดง */}
            <p className="text-2xl md:text-3xl font-bold text-red-600 drop-shadow-md">
                อยากเทียบให้ชัด เราจัดให้คุณ
            </p>
        </div>

        {/* ปุ่ม "ดูอะไหล่ทั้งหมด" (จัดให้อยู่ขวาล่าง) */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 pb-12 flex justify-end">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-3 px-8 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] transition transform hover:scale-105">
                ดูอะไหล่ทั้งหมด
            </button>
        </div>

        {/* ================= ส่วนแถบแบรนด์ (Brand Carousel) ================= */}
        <div className="relative z-20 w-full bg-black border-t border-gray-900 h-32 md:h-40 flex items-center mt-auto">
            
            {/* ปุ่มลูกศรซ้าย */}
            <button className="absolute left-0 z-30 h-full w-16 bg-gradient-to-r from-black via-black/80 to-transparent flex items-center justify-center group">
                <div className="p-1.5 border-2 border-red-600 rounded-full group-hover:bg-red-600 transition">
                    <ArrowLeft className="text-red-600 w-6 h-6 group-hover:text-white" />
                </div>
            </button>

            {/* โลโก้แบรนด์ */}
            <div className="flex w-full justify-around items-center px-16 overflow-hidden">
                {brands.map((brand, index) => (
                    <div key={index} className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center px-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition duration-300 cursor-pointer">
                        {/* ถ้ายังไม่มีรูป ให้แสดงเป็นชื่อแบรนด์ไปก่อน */}
                        <img src={brand.src} alt={brand.name} className="object-contain max-w-full max-h-full" />
                        
                        {/* ถ้ามีรูปแล้ว ให้ใช้ img tag นี้แทน span ด้านบน */}
                        {/* <img src={brand.src} alt={brand.name} className="object-contain max-w-full max-h-full" /> */}
                    </div>
                ))}
            </div>

            {/* ปุ่มลูกศรขวา */}
            <button className="absolute right-0 z-30 h-full w-16 bg-gradient-to-l from-black via-black/80 to-transparent flex items-center justify-center group">
                <div className="p-1.5 border-2 border-red-600 rounded-full group-hover:bg-red-600 transition">
                    <ArrowRight className="text-red-600 w-6 h-6 group-hover:text-white" />
                </div>
            </button>
        </div>

        {/* เส้นขอบแดงล่างสุด */}
        <div className="w-full h-1 bg-red-600"></div>
       

      </main>
    </div>
  );
}