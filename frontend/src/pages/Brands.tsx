import { useRef, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Car, ChevronRight, ExternalLink, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  carBrands, 
  tireBrands, 
  wheelBrands, 
  shockBrands, 
  batteryBrands, 
  brakeBrands, 
  oilBrands 
} from '../data/brandData';

// --- Component ---
const BrandCategoryRow = ({ title, icon: Icon, iconImg, brands }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate(); // ดึง navigate มาใช้งาน

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 240 : 400; 
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
                onClick={() => navigate('/products', { state: { selectedBrand: brand.name } })} 
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