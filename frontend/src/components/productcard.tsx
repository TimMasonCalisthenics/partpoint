import { Link } from 'react-router-dom';

// กำหนด Type สำหรับ Properties ที่ ProductCard จะรับเข้ามา
export interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  brandLogoUrl?: string; // โลโก้แบรนด์ (มีหรือไม่มีก็ได้)
  tags?: string[]; // แท็กเช่น 'New', 'SUV', 'Sport'
}

export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
  brandLogoUrl,
  tags = [],
}: ProductCardProps) {
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
              // กำหนดสีป้ายตามคำ
              let tagColor = "bg-gray-800 text-gray-300 border-gray-700";
              if (tag.toLowerCase() === 'new') tagColor = "bg-red-900/50 text-red-400 border-red-800";
              if (tag.toLowerCase() === 'sport') tagColor = "bg-blue-900/50 text-blue-400 border-blue-800";
              if (tag.toLowerCase() === 'suv') tagColor = "bg-green-900/50 text-green-400 border-green-800";
              
              return (
                <span 
                  key={index} 
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border ${tagColor}`}
                >
                  {tag}
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
          <button className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full shadow-lg">
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
