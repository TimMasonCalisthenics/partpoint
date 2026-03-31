import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Search, ChevronDown, ShoppingCart, Eye, Plus, Loader2, Check } from 'lucide-react';
import { getBrandLogo } from '../utils/brandLogos';
import FavButton from '../components/FavButton';
import CompareBar from '../components/CompareBar';
import { useCompare } from '../context/CompareContext';

interface Product {
  id: number;
  sku: string;
  name: string;
  brand: string;
  description: string;
  imageURL: string;
  specifications: string;
  tags: string;
  basePrice: number;
  promoPrice: number;
  stock: number;
  affiliateLink: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCompare, isInCompare } = useCompare();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8080/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl font-bold mb-2">ไม่พบสินค้า</p>
            <p className="text-sm">ลองค้นหาคำอื่น หรือเพิ่มสินค้าผ่านระบบแอดมิน</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const price = product.promoPrice > 0 ? product.promoPrice : product.basePrice;
            return (
            <div key={product.id} className="bg-[#121212] border border-gray-800 rounded-lg overflow-hidden flex flex-col shadow-lg hover:border-red-600/50 transition-colors duration-300">

              {/* Product Image */}
              <Link to={`/product/${product.id}`}>
                <div className="bg-white p-4 h-64 flex items-center justify-center relative rounded-t-lg">
                  {product.imageURL ? (
                    <img src={product.imageURL} alt={product.name} className="max-h-full max-w-full object-contain drop-shadow-lg" />
                  ) : (
                    <div className="text-gray-400 text-sm">ไม่มีภาพสินค้า</div>
                  )}
                </div>
              </Link>

              {/* Favourite Heart Button - มุมขวาบน */}
              <FavButton productId={product.id} />

              {/* Product Details */}
              <div className="p-5 flex flex-col flex-grow">

                {/* Title */}
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 hover:text-red-400 transition-colors">{product.name}</h3>
                </Link>

                {/* Brand */}
                <div className="h-10 mb-4 flex items-center justify-start">
                  <div className="bg-white px-4 py-1 flex items-center justify-center h-full rounded">
                    {getBrandLogo(product.brand) ? (
                      <img src={getBrandLogo(product.brand)!} alt={product.brand} className="max-h-7 max-w-[100px] object-contain" />
                    ) : (
                      <span className="text-[#e23011] font-black italic text-xl tracking-tighter">{product.brand}</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-xs mb-6 flex-grow leading-relaxed line-clamp-4">
                  {product.description}
                </p>

                {/* Price Row */}
                <div className="flex justify-between items-end mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-red-500 text-2xl font-bold">{price.toLocaleString()}</span>
                    <span className="text-red-500 text-lg font-bold">บาท</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">

                  {/* Order Button */}
                  {product.affiliateLink ? (
                    <a
                      href={product.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex justify-between items-center px-4 py-3 bg-transparent border border-gray-700 hover:border-red-600 rounded-md group transition-colors"
                    >
                      <span className="text-white font-bold">สั่งซื้อสินค้า</span>
                      <ShoppingCart className="text-red-600 w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                  ) : (
                    <button className="w-full flex justify-between items-center px-4 py-3 bg-transparent border border-gray-700 hover:border-red-600 rounded-md group transition-colors">
                      <span className="text-white font-bold">สั่งซื้อสินค้า</span>
                      <ShoppingCart className="text-red-600 w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  )}

                  {/* Bottom Row Buttons */}
                  <div className="flex justify-between items-center gap-3">
                    <Link to={`/product/${product.id}`} className="flex-1 flex justify-between items-center px-4 py-2 bg-transparent border border-gray-700 hover:border-red-600 rounded-full group transition-colors">
                      <span className="text-gray-300 text-xs font-semibold">ดูรายละเอียด</span>
                      <Eye className="text-red-600 w-4 h-4 group-hover:scale-110 transition-transform" />
                    </Link>

                    <button 
                      onClick={() => {
                        if (!isInCompare(product.id)) {
                          addToCompare(product);
                        }
                      }}
                      className={`flex items-center gap-2 group ${isInCompare(product.id) ? 'opacity-60 cursor-default' : ''}`}
                    >
                      <span className={`text-xs font-semibold transition-colors ${isInCompare(product.id) ? 'text-green-400' : 'text-gray-300 group-hover:text-white'}`}>
                        {isInCompare(product.id) ? 'เพิ่มแล้ว' : 'เปรียบเทียบ'}
                      </span>
                      <div className={`rounded-full p-1 transition-colors ${isInCompare(product.id) ? 'bg-green-600' : 'bg-red-600 group-hover:bg-red-500'}`}>
                        {isInCompare(product.id) ? <Check className="text-white w-4 h-4" /> : <Plus className="text-white w-4 h-4" />}
                      </div>
                    </button>
                  </div>

                </div>
              </div>
            </div>
            );
          })}
        </div>
        )}
      </div>

      <CompareBar />
      <Footer />
    </div>
  );
}
