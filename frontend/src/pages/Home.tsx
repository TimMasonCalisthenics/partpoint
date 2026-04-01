import Navbar from '../components/navbar';
import { ArrowLeft, ArrowRight, Settings, Disc, Droplet, Zap } from 'lucide-react';
import ProductCard from '../components/productcard';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const mockProducts = [
    { id: 1, name: 'MICHELIN Pilot Sport 5 - 225/40ZR18', price: 6500, imageUrl: '/CarPart/tire_rebg.png', tags: ['New', 'Sport'] },
    { id: 2, name: 'BOSCH Hightec Silver Battery', price: 3200, imageUrl: '/CarPart/Car_Battery.png', tags: ['Best Seller'] },
    { id: 3, name: 'Mobil 1 Full Synthetic 5W-30', price: 2150, imageUrl: '/CarPart/oilcan.png', tags: ['Eco'] },
    { id: 4, name: 'Brembo Ceramic Brake Pads', price: 4500, imageUrl: '/CarPart/car_break.png', tags: ['Sport', 'New'] },
  ];

  const brands = [
    { name: 'Ford', src: '/logos/ford.png' },
    { name: 'Toyota', src: '/logos/toyota.png' },
    { name: 'Isuzu', src: '/logos/isuzu.png' },
    { name: 'Mazda', src: '/logos/mazda.png' },
    { name: 'Mitsubishi', src: '/logos/mitsubishi.png' },
    { name: 'Honda', src: '/logos/honda.png' },
    { name: 'BMW', src: '/logos/bmw.png' },
    { name: 'Mercedes Benz', src: '/logos/benz.png' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-hidden">
      <Navbar />
      
      {/* ส่วน Hero Section (พื้นที่ต้อนรับ) */}
      <main className="flex-1 relative flex flex-col">
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/Video/VdoHome_Bg.mp4" type="video/mp4" />
            <img src="/s63engine.jpg" alt="Fallback background" className="w-full h-full object-cover" />
          </video>
          {/* แผ่นฟิล์มสีดำ */}
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
          <Link to="/products" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-3 px-8 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] transition transform hover:scale-105">
            ดูอะไหล่ทั้งหมด
          </Link>
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
                <img src={brand.src} alt={brand.name} className="object-contain max-w-full max-h-full" />
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
        <div className="w-full h-1 bg-red-600"></div>
      </main>

      {/* ================= หมวดหมู่อะไหล่รถยนต์ ================= */}
      <section className="relative z-30 w-full bg-black py-10 px-2 md:px-0 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-6 w-full max-w-5xl text-left px-2">หมวดหมู่อะไหล่</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* ยางรถยนต์ */}
          <Link to="/products" className="bg-[#181818] rounded-2xl flex flex-col items-center py-6 shadow-lg hover:scale-105 transition cursor-pointer group relative overflow-hidden" style={{ position: 'relative' }}>
            <span className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ border: '2px solid transparent', background: 'linear-gradient(#181818,#181818) padding-box,linear-gradient(90deg,#EC221F 11%,#861311 89%) border-box' }}></span>
            <img src="/CarPart/tire_rebg.png" alt="ยางรถยนต์" className="w-20 h-20 object-contain mb-3 relative z-10" />
            <span className="text-lg text-white font-semibold relative z-10">ยางรถยนต์</span>
          </Link>
          {/* น้ำมันเครื่อง */}
          <Link to="/products" className="bg-[#181818] rounded-2xl flex flex-col items-center py-6 shadow-lg hover:scale-105 transition cursor-pointer group relative overflow-hidden" style={{ position: 'relative' }}>
            <span className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ border: '2px solid transparent', background: 'linear-gradient(#181818,#181818) padding-box,linear-gradient(90deg,#EC221F 11%,#861311 89%) border-box' }}></span>
            <img src="/CarPart/oilcan.png" alt="น้ำมันเครื่อง" className="w-20 h-20 object-contain mb-3 relative z-10" />
            <span className="text-lg text-white font-semibold relative z-10">น้ำมันเครื่อง</span>
          </Link>
          {/* โช้คอัพ */}
          <Link to="/products" className="bg-[#181818] rounded-2xl flex flex-col items-center py-6 shadow-lg hover:scale-105 transition cursor-pointer group relative overflow-hidden" style={{ position: 'relative' }}>
            <span className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ border: '2px solid transparent', background: 'linear-gradient(#181818,#181818) padding-box,linear-gradient(90deg,#EC221F 11%,#861311 89%) border-box' }}></span>
            <img src="/CarPart/shock_absorbers.png" alt="โช้คอัพ" className="w-20 h-20 object-contain mb-3 relative z-10" />
            <span className="text-lg text-white font-semibold relative z-10">โช้คอัพ</span>
          </Link>
          {/* เบรก */}
          <Link to="/products" className="bg-[#181818] rounded-2xl flex flex-col items-center py-6 shadow-lg hover:scale-105 transition cursor-pointer group relative overflow-hidden" style={{ position: 'relative' }}>
            <span className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ border: '2px solid transparent', background: 'linear-gradient(#181818,#181818) padding-box,linear-gradient(90deg,#EC221F 11%,#861311 89%) border-box' }}></span>
            <img src="/CarPart/car_break.png" alt="เบรก" className="w-20 h-20 object-contain mb-3 relative z-10" />
            <span className="text-lg text-white font-semibold relative z-10">เบรก</span>
          </Link>
          {/* แบตเตอรี่ */}
          <Link to="/products" className="bg-[#181818] rounded-2xl flex flex-col items-center py-6 shadow-lg hover:scale-105 transition cursor-pointer group relative overflow-hidden" style={{ position: 'relative' }}>
            <span className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ border: '2px solid transparent', background: 'linear-gradient(#181818,#181818) padding-box,linear-gradient(90deg,#EC221F 11%,#861311 89%) border-box' }}></span>
            <img src="/CarPart/Car_Battery.png" alt="แบตเตอรี่" className="w-20 h-20 object-contain mb-3 relative z-10" />
            <span className="text-lg text-white font-semibold relative z-10">แบตเตอรี่</span>
          </Link>
          {/* แม็ก */}
          <Link to="/products" className="bg-[#181818] rounded-2xl flex flex-col items-center py-6 shadow-lg hover:scale-105 transition cursor-pointer group relative overflow-hidden" style={{ position: 'relative' }}>
            <span className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ border: '2px solid transparent', background: 'linear-gradient(#181818,#181818) padding-box,linear-gradient(90deg,#EC221F 11%,#861311 89%) border-box' }}></span>
            <img src="/CarPart/car_rims.png" alt="แม็ก" className="w-20 h-20 object-contain mb-3 relative z-10" />
            <span className="text-lg text-white font-semibold relative z-10">แม็ก</span>
          </Link>
        </div>
      </section>

      <div className="w-full h-1 bg-red-600"></div>

      {/* ================= อะไหล่แนะนำ (Recommended Parts) ================= */}
      <section className="relative z-30 w-full bg-[#0a0a0a] py-16 px-4 md:px-0 flex flex-col items-center">
        <div className="w-full max-w-6xl flex justify-between items-end mb-8 px-2 md:px-0">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="w-2 h-8 bg-red-600 rounded-full inline-block"></span>
              อะไหล่แนะนำ <span className="text-red-600">มาใหม่</span>
            </h2>
            <p className="text-gray-400 text-lg">คัดสรรอะไหล่คุณภาพสูง เพื่อสมรรถนะที่ดีที่สุดของรถคุณ</p>
          </div>
          <Link to="/products" className="hidden md:flex text-red-500 hover:text-red-400 font-semibold items-center gap-1 transition-colors">
            ดูทั้งหมด <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              tags={product.tags}
            />
          ))}
        </div>

        <Link to="/products" className="md:hidden mt-8 text-red-500 hover:text-red-400 font-semibold flex items-center gap-1 transition-colors">
          ดูทั้งหมด <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <div className="w-full h-1 bg-red-600"></div>

      {/* ================== SEARCH PART SECTION (NEW DESIGN) ================== */}
      <section className="relative w-full flex justify-center items-center py-20 px-4 md:px-0 overflow-hidden" style={{ minHeight: '480px' }}>
        {/* BG image */}
        <img src="/CarPart/BG_Search_menu.png" alt="พื้นหลังหมวดหมู่" className="absolute inset-0 w-full h-full object-cover z-0" style={{ filter: 'brightness(0.2)' }} />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0"></div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-wider mb-4 uppercase">
              ค้นหาอะไหล่<span className="text-red-600">ด่วน</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl">เลือกหมวดหมู่ที่ต้องการ แล้วเริ่มค้นหาความแรงได้ทันที</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
            {/* หมวดหมู่ 1 */}
            <Link to="/products" className="bg-[#1a1a1e]/80 backdrop-blur-md border border-gray-800 hover:border-red-600 p-8 rounded-2xl flex flex-col items-center justify-center gap-4 group transition-all duration-300 hover:-translate-y-2 shadow-2xl">
              <Disc className="w-12 h-12 text-red-600 group-hover:scale-125 transition-transform duration-300" />
              <span className="text-white font-bold text-lg group-hover:text-red-500">ล้อและยาง</span>
            </Link>

            {/* หมวดหมู่ 2 */}
            <Link to="/products" className="bg-[#1a1a1e]/80 backdrop-blur-md border border-gray-800 hover:border-red-600 p-8 rounded-2xl flex flex-col items-center justify-center gap-4 group transition-all duration-300 hover:-translate-y-2 shadow-2xl">
              <Droplet className="w-12 h-12 text-red-600 group-hover:scale-125 transition-transform duration-300" />
              <span className="text-white font-bold text-lg group-hover:text-red-500">น้ำมันเครื่อง</span>
            </Link>

            {/* หมวดหมู่ 3 */}
            <Link to="/products" className="bg-[#1a1a1e]/80 backdrop-blur-md border border-gray-800 hover:border-red-600 p-8 rounded-2xl flex flex-col items-center justify-center gap-4 group transition-all duration-300 hover:-translate-y-2 shadow-2xl">
              <Settings className="w-12 h-12 text-red-600 group-hover:scale-125 transition-transform duration-300" />
              <span className="text-white font-bold text-lg group-hover:text-red-500">โช้คอัพ / เบรก</span>
            </Link>

            {/* หมวดหมู่ 4 */}
            <Link to="/products" className="bg-[#1a1a1e]/80 backdrop-blur-md border border-gray-800 hover:border-red-600 p-8 rounded-2xl flex flex-col items-center justify-center gap-4 group transition-all duration-300 hover:-translate-y-2 shadow-2xl">
              <Zap className="w-12 h-12 text-red-600 group-hover:scale-125 transition-transform duration-300" />
              <span className="text-white font-bold text-lg group-hover:text-red-500">แบตเตอรี่</span>
            </Link>
          </div>
        </div>
      </section>
      
      <div className="w-full h-1 bg-red-600"></div>

      <Footer />
    </div>
  );
}