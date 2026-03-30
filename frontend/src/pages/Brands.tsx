import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Car, ChevronRight, ExternalLink, ChevronLeft } from 'lucide-react';

// --- Mock Data ---
const carBrands = [
  { name: 'Mazda', bgImage: '/s63engine.jpg' },
  { name: 'BMW', bgImage: '/s63engine.jpg' },
  { name: 'Mercedes-Benz', bgImage: '/s63engine.jpg' },
  { name: 'Nissan', bgImage: '/s63engine.jpg' },
  { name: 'Mitsubishi', bgImage: '/s63engine.jpg' },
  { name: 'Isuzu', bgImage: '/s63engine.jpg' }
];

const tireBrands = [
  { name: 'Michelin', bgImage: '/Example_product_pic/Product3.png', link: true },
  { name: 'Goodyear', bgImage: '/Example_product_pic/Product3.png', link: true },
  { name: 'Yokohama', bgImage: '/Example_product_pic/Product3.png', link: true },
  { name: 'Dunlop', bgImage: '/Example_product_pic/Product3.png', link: true },
  { name: 'Continental', bgImage: '/Example_product_pic/Product3.png', link: true },
];

const wheelBrands = [
  { name: 'Enkei', bgImage: '/Carpart/BG_Search_menu.png', link: true },
  { name: 'BBS', bgImage: '/Carpart/BG_Search_menu.png', link: true },
  { name: 'Volk Racing', bgImage: '/Carpart/BG_Search_menu.png', link: true },
  { name: 'Rotiform', bgImage: '/Carpart/BG_Search_menu.png', link: true },
  { name: 'Lenso', bgImage: '/Carpart/BG_Search_menu.png', link: true },
];

const shockBrands = [
  { name: 'YSS', bgImage: '/s63engine.jpg', link: true },
  { name: 'Tein', bgImage: '/s63engine.jpg', link: true },
  { name: 'Ohlins', bgImage: '/s63engine.jpg', link: true },
  { name: 'Bilstein', bgImage: '/s63engine.jpg', link: true },
  { name: 'Monroe', bgImage: '/s63engine.jpg', link: true },
];

const batteryBrands = [
  { name: 'GS Battery', bgImage: '/Carpart/BG_Search_menu.png', link: true },
  { name: 'FB Battery', bgImage: '/Carpart/BG_Search_menu.png', link: true },
  { name: 'Amaron', bgImage: '/Carpart/BG_Search_menu.png', link: true },
  { name: 'Panasonic', bgImage: '/Carpart/BG_Search_menu.png', link: true },
  { name: 'Puma', bgImage: '/Carpart/BG_Search_menu.png', link: true },
];

const brakeBrands = [
  { name: 'Brembo', bgImage: '/s63engine.jpg', link: true },
  { name: 'Bendix', bgImage: '/s63engine.jpg', link: true },
  { name: 'Compact Brakes', bgImage: '/s63engine.jpg', link: true },
  { name: 'Akebono', bgImage: '/s63engine.jpg', link: true },
  { name: 'Project Mu', bgImage: '/s63engine.jpg', link: true },
];

const oilBrands = [
  { name: 'Motul', bgImage: '/Carpart/BG_Search_menu.png', link: true },
  { name: 'Mobil 1', bgImage: '/Carpart/BG_Search_menu.png', link: true },
  { name: 'Castrol', bgImage: '/Carpart/BG_Search_menu.png', link: true },
  { name: 'Liqui Moly', bgImage: '/Carpart/BG_Search_menu.png', link: true },
  { name: 'Amsoil', bgImage: '/Carpart/BG_Search_menu.png', link: true },
];

// --- Component ---
const BrandCategoryRow = ({ title, icon: Icon, iconImg, brands }: any) => {
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
        
        {/* Navigation Arrows (Mock logic for visual) */}
        <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-black border border-gray-700 hover:bg-black hover:border-red-600 hover:text-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hidden lg:block">
            <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-black border border-gray-700 hover:bg-black hover:border-red-600 hover:text-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hidden lg:block">
            <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Items */}
        {/* We use px-4 md:px-0 to give some padding on mobile but align with container on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x px-4 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {brands.map((brand: any, idx: number) => (
            <div 
                key={idx} 
                className={`flex-none w-48 md:w-64 h-32 md:h-40 relative bg-[#121212] rounded-xl overflow-hidden group/card snap-start cursor-pointer transition-all border border-solid ${brand.link ? 'border-transparent hover:border-red-600' : 'border-transparent hover:border-gray-500'}`}
            >
              {/* Background Image */}
              <img 
                src={brand.bgImage} 
                alt={brand.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover/card:opacity-80 transition-opacity mix-blend-screen grayscale group-hover/card:grayscale-0" 
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
        
        {/* Pagination Dots (Mock) */}
        <div className="flex justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
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
