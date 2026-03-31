import { useRef, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Car, ChevronRight, ExternalLink, ChevronLeft } from 'lucide-react';

// --- Mock Data ---
const carBrands = [
  { name: 'Mazda', bgImage: '/Brandpart/CarBand/mazda-2.svg' },
  { name: 'BMW', bgImage: '/Brandpart/CarBand/bmw-svgrepo-com.svg' },
  { name: 'Mercedes-Benz', bgImage: '/Brandpart/CarBand/Mercedes-Benz-Logo.wine.svg' },
  { name: 'Nissan', bgImage: '/Brandpart/CarBand/nissan-6.svg' },
  { name: 'Mitsubishi', bgImage: '/Brandpart/CarBand/mitsubishi.svg' },
  { name: 'Isuzu', bgImage: '/Brandpart/CarBand/isuzu-2.svg' },
  { name: 'Toyota', bgImage: '/Brandpart/CarBand/toyota-1.svg' },
  { name: 'Honda', bgImage: '/Brandpart/CarBand/honda-11.svg' },
  { name: 'Ford', bgImage: '/Brandpart/CarBand/ford-8.svg' },
];

const tireBrands = [
  { name: 'Michelin', bgImage: '/Brandpart/TireBand/Michelin_Logo_0.svg', link: true },
  { name: 'Bridgestone', bgImage: '/Brandpart/TireBand/bridgestone-26989.svg', link: true },
  { name: 'Goodyear', bgImage: '/Brandpart/TireBand/goodyear-tire-1.svg', link: true },
  { name: 'Yokohama', bgImage: '/Brandpart/TireBand/yokohama-logo.svg', link: true },
  { name: 'Dunlop', bgImage: '/Brandpart/TireBand/dunlop-tires-logo-svgrepo-com.svg', link: true },
  { name: 'Continental', bgImage: '/Brandpart/TireBand/continental-54.svg', link: true },
  { name: 'Pirelli', bgImage: '/Brandpart/TireBand/Pirelli_id89Ihp_Aw_1.svg', link: true },
  { name: 'Toyo Tires', bgImage: '/Brandpart/TireBand/toyotires.svg', link: true },
  { name: 'Hankook', bgImage: '/Brandpart/TireBand/hankook-tire-black.svg', link: true },
  { name: 'Deestone', bgImage: '/Brandpart/TireBand/deestone-logo-png_seeklogo-518858 (1).svg', link: true },
];

const wheelBrands = [
  { name: 'Enkei', bgImage: '/Brandpart/MagwheelBrand/enkei.svg', link: true },
  { name: 'BBS', bgImage: '/Brandpart/MagwheelBrand/bbs.svg', link: true },
  { name: 'Volk Racing', bgImage: '/Brandpart/MagwheelBrand/Volk%20racing.svg', link: true },
  { name: 'Rotiform', bgImage: '/Brandpart/MagwheelBrand/Rotiform_idY5oOnaHG_1.svg', link: true },
  { name: 'Lenso', bgImage: '/Brandpart/MagwheelBrand/Lenso_Wheel_idN0DsoznJ_0.svg', link: true },
  { name: 'WedsSport', bgImage: '/Brandpart/MagwheelBrand/Wedsport.png', link: true },
  { name: 'SSR', bgImage: '/Brandpart/MagwheelBrand/ssr_logos.svg', link: true },
  { name: 'OZ Racing', bgImage: '/Brandpart/MagwheelBrand/oz-racing.svg', link: true },
  { name: 'HRE', bgImage: '/Brandpart/MagwheelBrand/HRE1.svg', link: true },
  { name: 'Cosmis', bgImage: '/Brandpart/MagwheelBrand/Cosmis4.svg', link: true },
];

const shockBrands = [
  { name: 'YSS', bgImage: '/Brandpart/shock_absorbers_Brand/yss-suspension-logo-png_seeklogo-328519.svg', link: true },
  { name: 'Tein', bgImage: '/Brandpart/shock_absorbers_Brand/tein.svg', link: true },
  { name: 'Ohlins', bgImage: '/Brandpart/shock_absorbers_Brand/Oehlins_logo.svg', link: true },
  { name: 'Bilstein', bgImage: '/Brandpart/shock_absorbers_Brand/bilstein-46618.svg', link: true },
  { name: 'Monroe', bgImage: '/Brandpart/shock_absorbers_Brand/monroe-premiumquality.svg', link: true },
  { name: 'Profender', bgImage: '/Brandpart/shock_absorbers_Brand/Profender-White-min.png', link: true },
  { name: 'Fox', bgImage: '/Brandpart/shock_absorbers_Brand/fox-racing-shox-1.svg', link: true },
  { name: 'Koni', bgImage: '/Brandpart/shock_absorbers_Brand/Koni.png', link: true },
  { name: 'KYB', bgImage: '/Brandpart/shock_absorbers_Brand/kyb-gas-shocks-1.svg', link: true },
];

const batteryBrands = [
  { name: 'GS Battery', bgImage: '/Brandpart/BatteryBrand/GS_Battery_id_DRPP114_1.svg', link: true },
  { name: 'FB Battery', bgImage: '/Brandpart/BatteryBrand/furukawa-1.svg', link: true },
  { name: 'Amaron', bgImage: '/Brandpart/BatteryBrand/Amaron_idKYXMc4Es_0.png', link: true },
  { name: 'Panasonic', bgImage: '/Brandpart/BatteryBrand/panasonic-1.svg', link: true },
  { name: 'Puma', bgImage: '/Brandpart/BatteryBrand/Puma_Energy_idvenUqrTx_1.svg', link: true },
  { name: '3K Battery', bgImage: '/Brandpart/BatteryBrand/3K_Battery_Logo.svg.png', link: true },
  { name: 'Yuasa', bgImage: '/Brandpart/BatteryBrand/yuasa-1.svg', link: true },
  { name: 'Varta', bgImage: '/Brandpart/BatteryBrand/varta.svg', link: true },
  { name: 'Bosch', bgImage: '/Brandpart/BatteryBrand/bosch.svg', link: true },
];

const brakeBrands = [
  { name: 'Brembo', bgImage: '/Brandpart/BreakBrand/brembo-logo-2.svg', link: true },
  { name: 'Bendix', bgImage: '/Brandpart/BreakBrand/bendix-2.svg', link: true },
  { name: 'Compact Brakes', bgImage: '/Brandpart/BreakBrand/Compact.jpg', link: true },
  { name: 'Akebono', bgImage: '/Brandpart/BreakBrand/akebono-brake-company.svg', link: true },
  { name: 'Project Mu', bgImage: '/Brandpart/BreakBrand/Project%20Mu.png', link: true },
  { name: 'Endless', bgImage: '/Brandpart/BreakBrand/endless-3.svg', link: true },
  { name: 'AP Racing', bgImage: '/Brandpart/BreakBrand/ap-racing-ltd-logo-vector.svg', link: true },
  { name: 'EBC', bgImage: '/Brandpart/BreakBrand/ebc-brakes.svg', link: true },
  { name: 'TRW', bgImage: '/Brandpart/BreakBrand/trw.svg', link: true },
];

const oilBrands = [
  { name: 'Motul', bgImage: '/Brandpart/EngineOilBrand/motul-logo-1.svg', link: true },
  { name: 'Mobil 1', bgImage: '/Brandpart/EngineOilBrand/mobil-1.svg', link: true },
  { name: 'Castrol', bgImage: '/Brandpart/EngineOilBrand/castrol-5.svg', link: true },
  { name: 'Liqui Moly', bgImage: '/Brandpart/EngineOilBrand/liqui-moly-1.svg', link: true },
  { name: 'Amsoil', bgImage: '/Brandpart/EngineOilBrand/amsoil-2.svg', link: true },
  { name: 'PTT Lubricants', bgImage: '/Brandpart/EngineOilBrand/ptt-1.svg', link: true },
  { name: 'Valvoline', bgImage: '/Brandpart/EngineOilBrand/valvoline-7.svg', link: true },
  { name: 'Shell Helix', bgImage: '/Brandpart/EngineOilBrand/shell-helix-1.svg', link: true },
  { name: 'HKS', bgImage: '/Brandpart/EngineOilBrand/hks-1.svg', link: true },
];

// --- Component ---
const BrandCategoryRow = ({ title, icon: Icon, iconImg, brands }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 240 : 400; // Scroll distance depending on mobile/desktop
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    
    // เราสร้างจุดล่างแค่ 3 จุด (หน้าแรก, ตรงกลาง, ท้ายสุด)
    const scrolledPercentage = el.scrollLeft / maxScroll;
    const currentDotIndex = Math.round(scrolledPercentage * 2); 
    setActiveIndex(currentDotIndex);
  };

  return (
    <div className="mb-14">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-4 md:px-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-red-900/50">
            {iconImg ? (
              <img src={iconImg} alt={title} className="w-7 h-7 object-contain brightness-0 invert" />
            ) : (
              <Icon className="w-6 h-6" />
            )}
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{title}</h2>
            <p className="text-gray-400 text-sm">{brands.length} แบรนด์</p>
          </div>
        </div>
        <button className="text-red-500 hover:text-red-400 transition-colors hidden md:block">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        
        {/* Navigation Arrows */}
        <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-black border border-gray-700 hover:bg-black hover:border-red-600 hover:text-red-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hidden lg:block shadow-lg"
        >
            <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-black border border-gray-700 hover:bg-black hover:border-red-600 hover:text-red-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hidden lg:block shadow-lg"
        >
            <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Items */}
        <div 
          ref={scrollRef} 
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-4 snap-x px-4 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {brands.map((brand: any, idx: number) => (
            <div 
                key={idx} 
                className={`flex-none w-48 md:w-64 h-32 md:h-40 relative bg-[#121212] rounded-xl overflow-hidden group/card snap-start cursor-pointer transition-all border border-solid ${brand.link ? 'border-transparent hover:border-red-600' : 'border-transparent hover:border-gray-500'}`}
            >
              {/* Background Image */}
              <img 
                src={brand.bgImage} 
                alt={brand.name} 
                className={`absolute inset-0 w-full h-full opacity-50 group-hover/card:opacity-100 transition-opacity mix-blend-screen grayscale group-hover/card:grayscale-0 ${brand.bgImage.endsWith('.svg') || brand.bgImage.includes('logo') || brand.bgImage.includes('Brandpart') ? 'object-contain p-4' : 'object-cover'}`} 
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-4 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-white font-bold text-base md:text-xl drop-shadow-md">{brand.name}</h3>
                        <p className="text-gray-400 text-[10px] md:text-xs">ดูรายละเอียด</p>
                    </div>
                    {brand.link && (
                        <ExternalLink className="text-red-500 w-4 h-4 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-2">
            {[0, 1, 2].map((dotIndex) => (
               <div 
                  key={dotIndex} 
                  className={`h-2 rounded-full transition-all duration-300 ${activeIndex === dotIndex ? 'bg-red-600 w-6' : 'bg-gray-700 w-2'}`}
               ></div>
            ))}
        </div>
        
      </div>
    </div>
  );
};

export default function BrandsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] overflow-hidden font-sans">
      <Navbar />

      <div className="container mx-auto py-10 max-w-7xl flex-grow">
        <BrandCategoryRow title="แบรนด์รถยนต์" icon={Car} brands={carBrands} />
        <BrandCategoryRow title="ยางรถยนต์" iconImg="/CarPart/tire_rebg.png" brands={tireBrands} />
        <BrandCategoryRow title="แม็ก รถยนต์" iconImg="/CarPart/car_rims.png" brands={wheelBrands} />
        <BrandCategoryRow title="โช้คอัพ" iconImg="/CarPart/shock_absorbers.png" brands={shockBrands} />
        <BrandCategoryRow title="แบตเตอรี่" iconImg="/CarPart/Car_Battery.png" brands={batteryBrands} />
        <BrandCategoryRow title="เบรก" iconImg="/CarPart/car_break.png" brands={brakeBrands} />
        <BrandCategoryRow title="น้ำมันเครื่อง" iconImg="/CarPart/oilcan.png" brands={oilBrands} />
      </div>

      <Footer />
    </div>
  );
}
