import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';

// กำหนด Type สำหรับ Properties ที่ ProductCard จะรับเข้ามา
export interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  brandLogoUrl?: string; // โลโก้แบรนด์ (มีหรือไม่มีก็ได้)
  tags?: string[]; // แท็กเช่น 'New', 'SUV', 'Sport'
  originalProduct?: any; // ข้อมูลสินค้าตัวเต็มสำหรับเปรียบเทียบ
}

export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
  brandLogoUrl,
  tags = [],
  originalProduct,
}: ProductCardProps) {
  const { addToCompare } = useCompare();

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (originalProduct) {
      // Ensure we have a valid category and other fields for CompareProduct
      const compareItem = {
        ...originalProduct,
        id: Number(originalProduct.id),
        basePrice: originalProduct.basePrice || originalProduct.price,
        imageURL: originalProduct.imageURL || originalProduct.imageUrl,
        category: originalProduct.categoryId || originalProduct.category || "Unknown"
      };
      addToCompare(compareItem);
    }
  };
  return (
    <Link to={`/product/${id}`} className="block">
    <div className="group relative bg-[#181818] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]">
      {/* Background Gradient on Hover (เส้นขอบแดงเรืองแสง) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" 
        style={{
          border: '1px solid transparent',
          background: 'linear-gradient(#181818, #181818) padding-box, linear-gradient(135deg, #EC221F 0%, transparent 50%, #861311 100%) border-box'
        }}
      ></div>

      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* ส่วน Header ของการ์ด: โลโก้แบรนด์ และ Tags */}
        <div className="flex justify-between items-start mb-4 gap-2">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => {
              const lTag = tag.toLowerCase();
              let tagStyle = "bg-blue-600 text-white border-blue-500 shadow-blue-900/20"; // Vibrant Blue default
              
              if (lTag === 'new') tagStyle = "bg-red-600 text-white border-red-500 shadow-red-900/20";
              else if (lTag === 'soft' || lTag === 'comfort') tagStyle = "bg-purple-600 text-white border-purple-500 shadow-purple-900/20";
              else if (lTag === 'suv' || lTag === '4x4') tagStyle = "bg-green-600 text-white border-green-500 shadow-green-900/20";
              else if (lTag === 'eco' || lTag === 'diesel' || lTag === 'hybrid') tagStyle = "bg-emerald-600 text-white border-emerald-500 shadow-emerald-900/20";
              else if (lTag === 'durable' || lTag === 'heavy duty') tagStyle = "bg-indigo-600 text-white border-indigo-500 shadow-indigo-900/20";
              else if (lTag === 'racing' || lTag === 'high performance' || lTag === 'forged') tagStyle = "bg-orange-600 text-white border-orange-500 shadow-orange-900/20";
              else if (lTag === 'brake' || lTag === 'safety' || lTag === 'stop') tagStyle = "bg-rose-600 text-white border-rose-500 shadow-rose-900/20";
              else if (lTag === 'turbo' || lTag === 'engine' || lTag === 'motoroil') tagStyle = "bg-yellow-500 text-black border-yellow-400 shadow-yellow-900/20";
              else if (lTag === 'carbon' || lTag === 'premium' || lTag === 'luxury') tagStyle = "bg-zinc-900 text-zinc-100 border-zinc-700 shadow-black";
              else if (lTag.includes('service') || lTag.includes('maintenance')) tagStyle = "bg-cyan-600 text-white border-cyan-500 shadow-cyan-900/20";
              
              return (
                <span 
                  key={index} 
                  className={`text-[9px] font-black px-2.5 py-1 rounded-full border shadow-sm ${tagStyle} backdrop-blur-sm tracking-widest`}
                  style={{ textShadow: tagStyle.includes('text-white') ? '0 1px 2px rgba(0,0,0,0.3)' : 'none' }}
                >
                  {tag.toUpperCase()}
                </span>
              );
            })}
          </div>

          {/* โลโก้แบรนด์ (ถ้ามี) */}
          {brandLogoUrl && (
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center p-1.5 shrink-0">
               <img src={brandLogoUrl} alt="brand" className="max-w-full max-h-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
          )}
        </div>

        {/* ส่วนรูปภาพสินค้า */}
        <div className="flex-grow flex items-center justify-center py-4 relative mb-4">
          {/* แสง Flare เรืองแสงด้านหลังรูป (เวลา Hover) */}
          <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-32 md:h-40 object-contain relative z-10 drop-shadow-xl group-hover:drop-shadow-[0_10px_15px_rgba(220,38,38,0.3)] transition-all duration-300" 
          />
        </div>

        {/* ส่วนรายละเอียดสินค้า: ชื่อ และ ราคา */}
        <div className="mt-auto">
          <h3 className="text-white text-lg font-semibold line-clamp-2 mb-2 group-hover:text-red-400 transition-colors">
            {name}
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-red-500">฿{price.toLocaleString()}</span>
          </div>
        </div>

        {/* ปุ่ม Compare / Add to cart ไอคอน (Hover แล้วขึ้น) */}
        <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleCompareClick}
            className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    </Link>
  );
}
