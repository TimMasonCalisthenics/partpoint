import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Trash2, AlertCircle, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';

export default function ComparePage() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();

  // Helper to parse specs string to array of {key, value}
  const parseSpecs = (str: string) => {
    try {
      const parsed = JSON.parse(str || '[]');
      if (Array.isArray(parsed)) {
        // [{key, value}, ...]
        return parsed.filter((item: any) => item.key || item.label).map((item: any) => ({
          key: item.key || item.label,
          value: item.value
        }));
      }
      if (typeof parsed === 'object' && parsed !== null) {
        // {"label": "value", ...}
        return Object.entries(parsed).map(([k, v]) => ({ key: k, value: String(v) }));
      }
      return [];
    } catch {
      return [];
    }
  };

  // Get all unique specification keys across all products
  const allSpecKeys = Array.from(new Set(
    compareItems.flatMap(item => parseSpecs(item.specifications).map(s => s.key))
  )).filter(k => k && k.trim() !== '');

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] overflow-hidden font-sans text-white">
      <Navbar />

      <div className="container mx-auto px-4 md:px-8 py-10 max-w-7xl flex-grow flex flex-col">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-white">เปรียบเทียบสินค้า</h1>
            <p className="text-gray-400 text-sm">กำลังเปรียบเทียบ {compareItems.length} รายการ (สูงสุด 3 รายการ)</p>
          </div>
          {compareItems.length > 0 && (
            <button 
              onClick={clearCompare}
              className="flex items-center gap-2 border border-red-900 text-red-500 hover:bg-red-950 px-4 py-2 rounded-md transition-colors text-sm font-semibold"
            >
              <Trash2 className="w-4 h-4" />
              ล้างทั้งหมด
            </button>
          )}
        </div>

        {compareItems.length > 0 ? (
          <>
            {/* Alert Banner */}
            <div className="bg-[#1a0f0f] border border-red-900/50 rounded-lg p-3 flex items-center gap-3 mb-8">
                <AlertCircle className="text-gray-400 w-5 h-5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">แนะนำให้ใช้หน้าจอขนาดใหญ่สำหรับการเปรียบเทียบที่ดีที่สุด</span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {compareItems.map((item) => (
                <div key={item.id} className="bg-[#121212] border border-gray-800 rounded-lg overflow-hidden flex flex-col relative">
                  
                  {/* Product Image */}
                  <div className="bg-white h-56 flex items-center justify-center relative p-4 group">
                    {item.imageURL ? (
                      <img src={item.imageURL} alt={item.name} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <div className="text-gray-400 text-sm">ไม่มีภาพสินค้า</div>
                    )}
                    
                    {/* Remove individual item button */}
                    <button 
                      onClick={() => removeFromCompare(item.id)}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-sm shadow-md transition-colors opacity-0 group-hover:opacity-100 md:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 h-7">{item.name}</h3>
                    <p className="text-gray-500 text-xs mb-3">{item.brand}</p>
                    <p className="text-gray-400 text-xs mb-4 line-clamp-2 h-8">{item.description}</p>
                    <div className="text-red-500 text-2xl font-black mb-4 h-8">
                       {(item.promoPrice > 0 ? item.promoPrice : item.basePrice).toLocaleString()} ฿
                    </div>
                    
                    {item.affiliateLink && (
                      <a 
                        href={item.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex justify-center items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors text-sm font-bold mt-auto"
                      >
                          <ExternalLink className="w-4 h-4" />
                          สั่งซื้อสินค้า
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Table Section */}
            <div className="bg-[#121212] border border-gray-800 rounded-lg p-6 mb-12 overflow-hidden">
                <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">รายละเอียดเปรียบเทียบ</h2>
                
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <tbody>
                            {/* Table Row: SKU */}
                            <tr className="border-b border-gray-800/50">
                                <td className="py-4 pr-4 font-semibold text-gray-300 w-32 md:w-1/4">SKU</td>
                                {compareItems.map(item => (
                                    <td key={`sku-${item.id}`} className="py-4 px-4 text-gray-400 w-1/4">{item.sku}</td>
                                ))}
                            </tr>
                            
                            {/* Dynamic Specification Rows */}
                            {allSpecKeys.map((key: string) => (
                              <tr key={key} className="border-b border-gray-800/50">
                                <td className="py-4 pr-4 font-semibold text-gray-300 capitalize">{key}</td>
                                {compareItems.map(item => {
                                  const specs = parseSpecs(item.specifications);
                                  const spec = specs.find((s: any) => s.key === key);
                                  return (
                                    <td key={`${key}-${item.id}`} className="py-4 px-4 text-gray-400">
                                      {spec ? spec.value : '-'}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}

                            {/* Table Row: แบรนด์ */}
                            <tr className="border-b border-gray-800/50">
                                <td className="py-4 pr-4 font-semibold text-gray-300">แบรนด์</td>
                                {compareItems.map(item => (
                                    <td key={`brand-${item.id}`} className="py-4 px-4 text-gray-400">{item.brand}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center flex-grow py-20">
              <div className="w-16 h-16 rounded-full bg-[#121212] border border-gray-700 flex items-center justify-center mb-6">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">ยังไม่มีสินค้าในรายการเปรียบเทียบ</h2>
              <p className="text-gray-400 text-sm mb-8 text-center max-w-md">กรุณาเลือกสินค้าจากหน้าหลักและกด "เปรียบเทียบ" เพื่อเริ่มการตรวจสอบสเปก (สูงสุด 3 รายการ)</p>
              
              <Link 
                to="/products" 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-colors shadow-lg shadow-red-900/20"
              >
                  กลับไปหน้ารวมสินค้า
              </Link>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
