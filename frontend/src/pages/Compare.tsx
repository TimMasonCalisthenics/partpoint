import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Trash2, AlertCircle, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// ข้อมูลจำลองสำหรับแสดงผลการเปรียบเทียบ 3 ตัว
const initialCompareItems = [
  {
    id: 1,
    tag: 'คะแนนเด่น',
    name: 'ไส้กรองน้ำมันเครื่อง Bosch',
    brand: 'Bosch',
    desc: 'ไส้กรองน้ำมันคุณภาพสูง กรองได้ละเอียด',
    price: '฿350',
    linkText: 'ไปที่ Bosch Auto Service',
    imageUrl: '/Example_product_pic/Product1.png', 
    specs: {
      carModel: 'Mazda 3 2019-2023',
      type: 'Spin-on',
      lifespan: '10,000 กม.',
      warranty: '6 เดือน',
      kind: '-',
      material: '-'
    }
  },
  {
    id: 2,
    tag: 'ยอดนิยม',
    name: 'ไส้กรองอากาศ K&N',
    brand: 'K&N',
    desc: 'ไส้กรองอากาศล้างได้ ใช้ซ้ำได้ เพิ่มสมรรถนะเครื่องยนต์',
    price: '฿1,800',
    linkText: 'ไปที่ K&N Thailand Official',
    imageUrl: '/Example_product_pic/product2.1.png',
    specs: {
      carModel: 'Honda Civic 2016-2023',
      type: '-',
      lifespan: '160,000 กม.',
      warranty: '10 ปี',
      kind: 'Cotton Gauze',
      material: '-'
    }
  },
  {
    id: 3,
    tag: 'ลดราคา',
    name: 'ผ้าเบรกหน้า Premium',
    brand: 'Brembo',
    desc: 'ผ้าเบรกคุณภาพสูง ทนทาน ลดเสียงดังขณะเบรก',
    price: '฿2,500',
    linkText: 'ไปที่ AutoParts Thailand',
    imageUrl: '/Example_product_pic/Product3.png',
    specs: {
      carModel: 'Toyota Camry 2018-2023',
      type: '-',
      lifespan: '50,000 กม.',
      warranty: '1 ปี',
      kind: '-',
      material: 'Ceramic'
    }
  }
];

export default function ComparePage() {
  const [items, setItems] = useState(initialCompareItems);

  // ฟังก์ชันลบสินค้า 1 ชิ้น
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  // ฟังก์ชันล้างทั้งหมด
  const clearAll = () => {
    setItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] overflow-hidden font-sans text-white">
      <Navbar />

      <div className="container mx-auto px-4 md:px-8 py-10 max-w-7xl flex-grow flex flex-col">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-white">เปรียบเทียบสินค้า</h1>
            <p className="text-gray-400 text-sm">กำลังเปรียบเทียบ {items.length} รายการ (สูงสุด 3 รายการ)</p>
          </div>
          {items.length > 0 && (
            <button 
              onClick={clearAll}
              className="flex items-center gap-2 border border-red-900 text-red-500 hover:bg-red-950 px-4 py-2 rounded-md transition-colors text-sm font-semibold"
            >
              <Trash2 className="w-4 h-4" />
              ล้างทั้งหมด
            </button>
          )}
        </div>

        {items.length > 0 ? (
          <>
            {/* Alert Banner */}
            <div className="bg-[#1a0f0f] border border-red-900/50 rounded-lg p-3 flex items-center gap-3 mb-8">
                <AlertCircle className="text-gray-400 w-5 h-5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">แนะนำให้ใช้หน้าจอขนาดใหญ่สำหรับการเปรียบเทียบที่ดีที่สุด</span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {items.map((item) => (
                <div key={item.id} className="bg-[#121212] border border-gray-800 rounded-lg overflow-hidden flex flex-col relative">
                  
                  {/* Product Image */}
                  <div className="bg-white h-56 flex items-center justify-center relative p-4 group">
                    <img src={item.imageUrl} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                    
                    {/* Tag */}
                    <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                      {item.tag}
                    </div>

                    {/* Remove individual item button */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-sm shadow-md transition-colors opacity-0 group-hover:opacity-100 md:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-gray-500 text-xs mb-3">{item.brand}</p>
                    <p className="text-gray-400 text-xs mb-4 line-clamp-2 h-8">{item.desc}</p>
                    <div className="text-red-500 text-2xl font-black mb-4">{item.price}</div>
                    
                    <button className="w-full flex justify-center items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors text-sm font-bold mt-auto">
                        <ExternalLink className="w-4 h-4" />
                        {item.linkText}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Table Section */}
            <div className="bg-[#121212] border border-gray-800 rounded-lg p-6 mb-12 overflow-hidden">
                <h2 className="text-lg font-bold text-white mb-6">รายละเอียดเปรียบเทียบ</h2>
                
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <tbody>
                            {/* Table Row: รุ่นรถ */}
                            <tr className="border-b border-gray-800/50">
                                <td className="py-4 pr-4 font-semibold text-gray-300 w-32 md:w-1/4">รุ่นรถ</td>
                                {items.map(item => (
                                    <td key={`carModel-${item.id}`} className="py-4 px-4 text-gray-400 w-1/4">{item.specs.carModel}</td>
                                ))}
                            </tr>
                            {/* Table Row: ประเภท */}
                            <tr className="border-b border-gray-800/50">
                                <td className="py-4 pr-4 font-semibold text-gray-300">ประเภท</td>
                                {items.map(item => (
                                    <td key={`type-${item.id}`} className="py-4 px-4 text-gray-400">{item.specs.type}</td>
                                ))}
                            </tr>
                            {/* Table Row: อายุการใช้งาน */}
                            <tr className="border-b border-gray-800/50">
                                <td className="py-4 pr-4 font-semibold text-gray-300">อายุการใช้งาน</td>
                                {items.map(item => (
                                    <td key={`lifespan-${item.id}`} className="py-4 px-4 text-gray-400">{item.specs.lifespan}</td>
                                ))}
                            </tr>
                            {/* Table Row: การรับประกัน */}
                            <tr className="border-b border-gray-800/50">
                                <td className="py-4 pr-4 font-semibold text-gray-300">การรับประกัน</td>
                                {items.map(item => (
                                    <td key={`warranty-${item.id}`} className="py-4 px-4 text-gray-400">{item.specs.warranty}</td>
                                ))}
                            </tr>
                            {/* Table Row: ชนิด */}
                            <tr className="border-b border-gray-800/50">
                                <td className="py-4 pr-4 font-semibold text-gray-300">ชนิด</td>
                                {items.map(item => (
                                    <td key={`kind-${item.id}`} className="py-4 px-4 text-gray-400">{item.specs.kind}</td>
                                ))}
                            </tr>
                            {/* Table Row: วัสดุ */}
                            <tr>
                                <td className="py-4 pr-4 font-semibold text-gray-300">วัสดุ</td>
                                {items.map(item => (
                                    <td key={`material-${item.id}`} className="py-4 px-4 text-gray-400">{item.specs.material}</td>
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
              <p className="text-gray-400 text-sm mb-8 text-center max-w-md">กรุณาเลือกสินค้าจากหน้าหลักเพื่อเปรียบเทียบ (สูงสุด 3 รายการ)</p>
              
              {/* ปุ่มกลับหน้ารวมสินค้าตามที่ขอ */}
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
