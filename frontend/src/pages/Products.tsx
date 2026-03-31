import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Search, ChevronDown, ShoppingCart, Eye, Plus } from 'lucide-react';

// ข้อมูลจำลองสำหรับแสดงผล (อิงตามรูป)
const productsData = [
  {
    id: 1,
    name: 'ยาง DS 285/70R17 MT431',
    brandLogo: '/logos/benz.png', // เปลี่ยนเป็นรูปแบรนด์จริงที่มีในเครื่องถ้ามี
    brandName: 'Deestone',
    description: 'ยาง Deestone MT431 ลุยเต็มขั้นพิชิตทุกเส้นทาง กล้าท้าทายทุกเส้นทางด้วยโครงสร้างแข็งแรงพิเศษ ทนทานต่อการบาดตำ รองรับทุกแรงกระแทก ไม่หวั่นทุกการตะกุย สะบัดโคลน',
    price: '6,230',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product1.png' // ใช้รูปจาก Example_product_pic
  },
  {
    id: 2,
    name: 'ยาง DS 215/70R15 T88',
    brandLogo: '/logos/benz.png',
    brandName: 'Deestone',
    description: 'ยาง Deestone T88 ที่ออกแบบมาสำหรับรถปิคอัพ และรถตู้โดยสารเพื่อรองรับงานบรรทุกขนส่งทั่วไป ด้วยโครงสร้างยางที่แข็งแกร่งให้สมรรถนะที่ดีเยี่ยม แต่คงไว้ซึ่งความสบายในการทุกการขับขี่',
    price: '2,610',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/product2.1.png'
  },
  {
    id: 3,
    name: 'ยาง MIC 215/55R17 94V',
    brandLogo: '/logos/benz.png',
    brandName: 'Michelin',
    description: 'ยาง Deestone T88 ที่ออกแบบมาสำหรับรถปิคอัพ และรถตู้โดยสารเพื่อรองรับงานบรรทุกขนส่งทั่วไป ด้วยโครงสร้างยางที่แข็งแกร่งให้สมรรถนะที่ดีเยี่ยม แต่คงไว้ซึ่งความสบายในการทุกการขับขี่',
    price: '2,610',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product3.png'
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] overflow-hidden font-sans">
      <Navbar />

      {/* Hero Image Section (ใช้รูปเครื่องยนต์ที่มีอยู่แทนไปก่อน) */}
      <div className="w-full h-80 md:h-96 relative border-b-4 border-red-600">
        <img
          src="/CarPart/BG_Search_menu.png"
          alt="Engine Parts"
          className="w-full h-full object-cover grayscale opacity-50 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

          {/* Search Box */}
          <div className="relative w-full md:w-[400px]">
            <input
              type="text"
              placeholder="ค้นหาอะไหล่"
              className="w-full bg-[#1a1a1a] text-gray-300 border border-gray-700 rounded-md py-3 px-4 focus:outline-none focus:border-red-600"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-600 w-5 h-5 cursor-pointer" />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full md:w-[250px]">
            <select className="w-full appearance-none bg-[#1a1a1a] text-gray-300 border border-gray-700 rounded-md py-3 px-4 pr-10 focus:outline-none focus:border-red-600">
              <option value="">หมวดหมู่อะไหล่</option>
              <option value="tire">ยางรถยนต์</option>
              <option value="oil">น้ำมันเครื่อง</option>
              <option value="shock">โช้คอัพ</option>
              <option value="brake">เบรก</option>
              <option value="battery">แบตเตอรี่</option>
              <option value="wheel">แม็ก</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-600 w-5 h-5 pointer-events-none" />
          </div>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData.map((product) => (
            <div key={product.id} className="bg-[#121212] border border-gray-800 rounded-lg overflow-hidden flex flex-col shadow-lg hover:border-red-600/50 transition-colors duration-300">

              {/* Product Image (White Background Area) */}
              <div className="bg-white p-4 h-64 flex items-center justify-center relative rounded-t-lg">
                <img src={product.imageUrl} alt={product.name} className="max-h-full max-w-full object-contain drop-shadow-lg" />
              </div>

              {/* Product Details */}
              <div className="p-5 flex flex-col flex-grow">

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">{product.name}</h3>

                {/* Brand Logo (Placeholder box if img not found) */}
                <div className="h-10 mb-4 flex items-center justify-start">
                  <div className="bg-white px-4 py-1 flex items-center justify-center h-full">
                    {/* สมมติว่าเป็นโลโก้แบรนด์ ใช้ text แทนไปก่อนให้เหมือนรูป */}
                    <span className="text-[#e23011] font-black italic text-xl tracking-tighter">{product.brandName}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-xs mb-6 flex-grow leading-relaxed line-clamp-4">
                  {product.description}
                </p>

                {/* Price Row */}
                <div className="flex justify-between items-end mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-red-500 text-2xl font-bold">{product.price}</span>
                    <span className="text-red-500 text-lg font-bold">บาท</span>
                  </div>
                  <span className="text-gray-500 text-xs">{product.source}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">

                  {/* Order Button */}
                  <button className="w-full flex justify-between items-center px-4 py-3 bg-transparent border border-gray-700 hover:border-red-600 rounded-md group transition-colors">
                    <span className="text-white font-bold">สั่งซื้อสินค้า</span>
                    <ShoppingCart className="text-red-600 w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>

                  {/* Bottom Row Buttons */}
                  <div className="flex justify-between items-center gap-3">
                    <button className="flex-1 flex justify-between items-center px-4 py-2 bg-transparent border border-gray-700 hover:border-red-600 rounded-full group transition-colors">
                      <span className="text-gray-300 text-xs font-semibold">ดูรายละเอียด</span>
                      <Eye className="text-red-600 w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>

                    <button className="flex items-center gap-2 group">
                      <span className="text-gray-300 text-xs font-semibold group-hover:text-white transition-colors">เปรียบเทียบ</span>
                      <div className="bg-red-600 rounded-full p-1 group-hover:bg-red-500 transition-colors">
                        <Plus className="text-white w-4 h-4" />
                      </div>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
