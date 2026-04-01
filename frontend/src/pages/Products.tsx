import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import CompareBar from '../components/CompareBar';
import { Search, ChevronDown, ShoppingCart, Plus } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { API_BASE_URL } from '../config';
import { getBrandLogo } from '../utils/brandLogos';
import FavButton from '../components/FavButton';



// ข้อมูลจำลองสำหรับแสดงผล (อิงตามรูป)
const productsData = [
  {
    id: 1,
    category: 'tire',
    subcategory: 'ยางลุย',
    function: 'offroad',
    name: 'ยาง DS 285/70R17 MT431',
    brandLogo: '/logos/benz.png',

    brandName: 'Deestone',
    description: 'ยาง Deestone MT431 ลุยเต็มขั้นพิชิตทุกเส้นทาง กล้าท้าทายทุกเส้นทางด้วยโครงสร้างแข็งแรงพิเศษ ทนทานต่อการบาดตำ รองรับทุกแรงกระแทก ไม่หวั่นทุกการตะกุย สะบัดโคลน',
    price: '6,230',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product1.png'
  },
  {
    id: 2,
    category: 'tire',
    subcategory: 'ยางเบา',
    function: 'commuter',
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
    category: 'tire',
    subcategory: 'ยางสปอร์ต',
    function: 'sport',
    name: 'ยาง MIC 215/55R17 94V',
    brandLogo: '/logos/benz.png',
    brandName: 'Michelin',
    description: 'ยาง Michelin 215/55R17 94V ให้ความนุ่มนวลและทนทาน เหมาะกับรถยนต์นั่งทั่วไป วิ่งเงียบพร้อมถนนเปียก',
    price: '2,610',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product3.png'
  },
  {
    id: 4,
    category: 'oil',
    subcategory: 'สังเคราะห์เต็มรูปแบบ',
    function: 'engine-protection',
    name: 'น้ำมันเครื่อง Motul 5W-40',
    brandLogo: '/logos/benz.png',
    brandName: 'Motul',
    description: 'น้ำมันเครื่องสังเคราะห์ 100% ให้การปกป้องเครื่องสูงในทุกสภาวะ พร้อมลดการสึกหรอ',
    price: '1,200',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product1.1.png'
  },
  {
    id: 5,
    category: 'oil',
    subcategory: 'กึ่งสังเคราะห์',
    function: 'high-mileage',
    name: 'น้ำมันเครื่อง Mobil 1 0W-30',
    brandLogo: '/logos/benz.png',
    brandName: 'Mobil',
    description: 'น้ำมันเครื่องคุณภาพสูงสำหรับเครื่องยนต์ดีเซลและเบนซิน พัฒนาสำหรับอายุการใช้งานยาวนาน',
    price: '1,450',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/product2.2.png'
  },
  {
    id: 6,
    category: 'shock',
    subcategory: 'โช้คอัพสำหรับรถเก๋ง',
    function: 'comfort',
    name: 'โช้คอัพ KYB Excel-G',
    brandLogo: '/logos/benz.png',
    brandName: 'KYB',
    description: 'โช้คอัพคุณภาพสูงสำหรับขับขี่นุ่มนวลและควบคุมได้ดีขึ้น เหมาะกับรถเก๋งทั่วไป',
    price: '2,100',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/product3.1.jpg'
  },
  {
    id: 7,
    category: 'shock',
    subcategory: 'โช้คอัพสำหรับกระบะ/SUV',
    function: 'adventure',
    name: 'โช้คอัพ Rancho RS5000',
    brandLogo: '/logos/benz.png',
    brandName: 'Rancho',
    description: 'โช้คอัพสำหรับรถกระบะและ SUV ให้สมรรถนะสูงทั้งทางเรียบและทางลุย',
    price: '3,150',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/product3.2.jpg'
  },
  {
    id: 8,
    category: 'shock',
    subcategory: 'โช้คอัพสปอร์ต',
    function: 'sport',
    name: 'โช้คอัพ Bilstein B6',
    brandLogo: '/logos/benz.png',
    brandName: 'Bilstein',
    description: 'โช้คอัพสปอร์ตตัวกลาง ช่วยควบคุมตัวรถดีเยี่ยมบนถนนทั่วไปและทางโค้ง',
    price: '2,800',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/product3.3.jpg'
  },
  {
    id: 9,
    category: 'shock', subcategory: 'โช้คอัพสปอร์ต', function: 'comfort',
    name: 'โช้คอัพ Monroe OESpectrum',
    brandLogo: '/logos/benz.png',
    brandName: 'Monroe',
    description: 'โช้คอัพที่พัฒนาด้วยระบบใหม่ ให้ประสิทธิภาพสูงและความสบายขณะขับขี่',
    price: '2,500',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/product3.4.png'
  },
  {
    id: 10,
    category: 'shock',
    subcategory: 'โช้คอัพออฟโรด',
    function: 'offroad',
    name: 'โช้คอัพ FOX Performance Series',
    brandLogo: '/logos/benz.png',
    brandName: 'FOX',
    description: 'โช้คอัพออฟโรดสำหรับการใช้งานหนัก แข็งแรงและทนต่อการสั่นสะเทือนสูง',
    price: '4,200',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product3.5.jpg'
  },
  {
    id: 11,
    category: 'brake',
    function: 'daily',
    name: 'เบรกดิสก์ Bosch QuietCast',
    brandLogo: '/logos/benz.png',
    brandName: 'Bosch',
    description: 'เบรกดิสก์คุณภาพสูงจาก Bosch ให้การเบรกที่เงียบและมีประสิทธิภาพสูง เหมาะกับรถยนต์ทั่วไป',
    price: '1,800',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product4.1.jpg'
  },
  {
    id: 12,
    category: 'brake',
    function: 'sport',
    name: 'เบรก Brembo Sport',
    brandLogo: '/logos/benz.png',
    brandName: 'Brembo',
    description: 'เบรกสปอร์ตระดับพรีเมี่ยมจาก Brembo ให้สมรรถนะเบรกสูงสุดและควบคุมได้ดีเยี่ยม',
    price: '3,200',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product4.2.jpg'
  },
  {
    id: 13,
    category: 'brake',
    function: 'safety',
    name: 'เบรก Akebono ProACT',
    brandLogo: '/logos/benz.png',
    brandName: 'Akebono',
    description: 'เบรกคุณภาพจากญี่ปุ่น ให้ความปลอดภัยสูงและทนทานต่อการใช้งานหนัก',
    price: '2,100',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product4.3.jpg'
  },
  {
    id: 14,
    category: 'brake',
    function: 'sport',
    name: 'เบรก Hawk HP Plus',
    brandLogo: '/logos/benz.png',
    brandName: 'Hawk',
    description: 'เบรกประสิทธิภาพสูงสำหรับรถสปอร์ตและรถแต่ง ให้การหยุดรถที่รวดเร็วและแม่นยำ',
    price: '2,800',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product4.4.jpg'
  },
  {
    id: 15,
    category: 'brake',
    function: 'sport',
    name: 'เบรก StopTech SportStop',
    brandLogo: '/logos/benz.png',
    brandName: 'StopTech',
    description: 'เบรกสปอร์ตที่ออกแบบมาสำหรับการใช้งานจริง ให้สมดุลระหว่างประสิทธิภาพและความทนทาน',
    price: '2,500',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product4.5.jpg'
  },
  {
    id: 16,
    category: 'brake',
    function: 'daily',
    name: 'เบรก EBC Greenstuff',
    brandLogo: '/logos/benz.png',
    brandName: 'EBC',
    description: 'เบรกที่ให้ประสิทธิภาพสูงและปลอดภัยสำหรับการขับขี่ประจำวัน',
    price: '1,900',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product4.6.jpg'
  },
  {
    id: 17,
    category: 'battery',
    function: 'multipurpose',
    name: 'แบตเตอรี่ 3K MF DIN80L',
    brandLogo: '/logos/benz.png',
    brandName: '3K',
    description: 'แบตเตอรี่แห้ง Maintenance Free กำลังไฟ 80Ah สำหรับรถยนต์ขนาดกลาง',
    price: '3,250',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product4.7.jpg'
  },
  {
    id: 18,
    category: 'battery',
    function: 'premium',
    name: 'แบตเตอรี่ VARTA Silver Dynamic 12V 70Ah',
    brandLogo: '/logos/benz.png',
    brandName: 'VARTA',
    description: 'แบตเตอรี่มาตรฐานยุโรประดับพรีเมียม ให้พลังสตาร์ทสูงและอายุการใช้งานยาวนาน',
    price: '3,150',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product5.2.jpg'
  },
  {
    id: 19,
    category: 'battery',
    function: 'agm',
    name: 'แบตเตอรี่ Panasonic AGM 12V 75Ah',
    brandLogo: '/logos/benz.png',
    brandName: 'Panasonic',
    description: 'แบตเตอรี่ AGM สำหรับรถที่ใช้ระบบไฟฟ้าหนักและรถ hybrid ให้การคายประจุสูง',
    price: '4,100',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product5.3.png'
  },
  {
    id: 20,
    category: 'battery',
    function: 'reliable',
    name: 'แบตเตอรี่ GS Yuasa NS70L',
    brandLogo: '/logos/benz.png',
    brandName: 'GS Yuasa',
    description: 'แบตเตอรี่ญี่ปุ่นยอดนิยม เหมาะกับรถยนต์ทั้งขนาดเล็กและขนาดกลาง ใช้งานมั่นใจตลอดอายุ',
    price: '3,700',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product5.4.png'
  },
  {
    id: 21,
    category: 'wheel',
    function: 'style',
    name: 'แม็ก YOKOHAMA XC-5 18"',
    brandLogo: '/logos/benz.png',
    brandName: 'YOKOHAMA',
    description: 'แม็กอัลลอยขนาด 18 นิ้ว ดีไซนื์ล้ำสมัย แข็งแรงทนทาน น้ำหนักเบา',
    price: '6,900',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product6.1.jpg'
  },
  {
    id: 22,
    category: 'wheel',
    function: 'sport',
    name: 'แม็ก OZ Racing HyperGT 17"',
    brandLogo: '/logos/benz.png',
    brandName: 'OZ Racing',
    description: 'แม็กสปอร์ตระดับพรีเมียม สวยงาม รองรับแรงดันสูง และการขับขี่แนวสปอร์ต',
    price: '8,200',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product6.2.jpg'
  },
  {
    id: 23,
    category: 'wheel',
    function: 'lightweight',
    name: 'แม็ก Enkei RPF1 16"',
    brandLogo: '/logos/benz.png',
    brandName: 'Enkei',
    description: 'แม็กน้ำหนักเบา กระจายความร้อนดี เหมาะทั้งใช้งานและแต่งรถ',
    price: '4,500',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product6.3.jpg'
  },
  {
    id: 24,
    category: 'wheel',
    function: 'premium',
    name: 'แม็ก Work Emotion CR kiwami 19"',
    brandLogo: '/logos/benz.png',
    brandName: 'Work',
    description: 'แม็กรุ่น top-tier สำหรับผู้ต้องการแต่งรถด้วยลุคสุดพรีเมียม คงทนสวยยาวนาน',
    price: '12,500',
    source: 'autobacs.co.th',
    imageUrl: '/Example_product_pic/Product6.4.jpg'
  }
];

type BackendProduct = {
  id: number;
  sku?: string;
  categoryId: number;
  subcategory?: string;
  function?: string;
  name: string;
  brand?: string;
  description?: string;
  basePrice?: number;
  promoPrice?: number;
  stock?: number;
  affiliateLink?: string;
  imageURL?: string;
  specifications?: string;
  tags?: string;
};

type ProductItem = {
  id: number;
  sku?: string;
  category: string;
  subcategory?: string;
  function?: string;
  name: string;
  brandName: string;
  description: string;
  price: string;
  source: string;
  imageUrl: string;
  basePrice?: number;
  promoPrice?: number;
  stock?: number;
  affiliateLink?: string;
  specifications?: string;
  tags?: string;
};

const categoryMap: Record<string, number> = {
  tire: 1,
  wheel: 2,
  oil: 3,
  shock: 4,
  brake: 5,
  battery: 6,
  enginepart_replacement: 7,
  performance_upgrade: 8,
};

const getCategoryName = (id: number) => {
  return Object.keys(categoryMap).find((k) => categoryMap[k] === id) || 'tire';
};

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const { addToCompare, isInCompare } = useCompare();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (!res.ok) {
          throw new Error(`Products fetch failed: ${res.status}`);
        }

        const data = await res.json();
        const mappedProducts = (data as BackendProduct[])
          .filter((p) => p.name && p.name.trim() !== '') // Filter out empty products
          .map((product) => ({
            id: product.id,
            sku: product.sku || '',
            category: getCategoryName(product.categoryId),
            subcategory: product.subcategory || '',
            function: product.function || '',
            name: product.name || '',
            brandName: product.brand || '',
            description: product.description || '',
            price: product.basePrice?.toString() || '0',
            source: product.affiliateLink || '',
            imageUrl: product.imageURL || '',
            basePrice: product.basePrice ?? 0,
            promoPrice: product.promoPrice ?? 0,
            stock: product.stock ?? 0,
            affiliateLink: product.affiliateLink || '',
            specifications: product.specifications || '[]',
            tags: product.tags || '[]'
          }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error('Failed to load products from backend:', error);
        setProducts(productsData);
      }
    };

    fetchProducts();
  }, []);

  const allCategories = Array.from(new Set(products.map((p) => p.category)));
  const allSubcategories = Array.from(
    new Set(products.map((p) => p.subcategory).filter((s): s is string => Boolean(s)))
  );
  const allBrands = Array.from(new Set(products.map((p) => p.brandName)));
  const allFunctions = Array.from(
    new Set(products.map((p) => p.function).filter((f): f is string => Boolean(f)))
  );

  const handleAddToCompare = (product: ProductItem) => {
    addToCompare({
      id: product.id,
      sku: product.sku || '',
      name: product.name,
      brand: product.brandName,
      description: product.description,
      imageURL: product.imageUrl,
      specifications: product.specifications || '[]',
      tags: product.tags || '[]',
      basePrice: (product.basePrice ?? Number(product.price.replace(/,/g, ''))) || 0,
      promoPrice: product.promoPrice ?? 0,
      stock: product.stock ?? 0,
      affiliateLink: product.affiliateLink || '',
      category: product.category
    });
  };

  const filteredProducts = products.filter((product) => {
    const searchMatched =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brandName.toLowerCase().includes(searchTerm.toLowerCase());

    const categoryMatched = categoryFilter ? product.category === categoryFilter : true;
    const selectedCategoriesMatched =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);

    const selectedBrandsMatched =
      selectedBrands.length === 0 || selectedBrands.includes(product.brandName);

    const selectedSubcategoriesMatched =
      selectedSubcategories.length === 0 ||
      (product.subcategory ? selectedSubcategories.includes(product.subcategory) : false);

    const selectedFunctionsMatched =
      selectedFunctions.length === 0 || selectedFunctions.includes(product.function || '');

    return (
      searchMatched &&
      categoryMatched &&
      selectedCategoriesMatched &&
      selectedBrandsMatched &&
      selectedSubcategoriesMatched &&
      selectedFunctionsMatched
    );
  });

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
        <div className="flex flex-col lg:flex-row gap-6 mb-8">

          {/* Sidebar filters (hidden base, popup used instead) */}
          <aside className="hidden" aria-hidden="true">
            <h3 className="text-white font-bold text-lg mb-2">ตัวกรองสินค้า</h3>

            <div className="space-y-2">
              <h4 className="text-gray-300 text-sm font-semibold">หมวดหมู่</h4>
              {allCategories.map((category) => (
                <label key={category} className="flex items-center gap-2 text-gray-200 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => {
                      setSelectedCategories((prev) =>
                        prev.includes(category)
                          ? prev.filter((c) => c !== category)
                          : [...prev, category]
                      );
                    }}
                    className="form-checkbox text-red-500"
                  />
                  {category}
                </label>
              ))}
            </div>
          

            <div className="space-y-2">
              <h4 className="text-gray-300 text-sm font-semibold">ย่อยหมวดหมู่</h4>
              {allSubcategories.map((subcategory) => (
                <label key={subcategory} className="flex items-center gap-2 text-gray-200 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedSubcategories.includes(subcategory)}
                    onChange={() => {
                      setSelectedSubcategories((prev) =>
                        prev.includes(subcategory)
                          ? prev.filter((s) => s !== subcategory)
                          : [...prev, subcategory]
                      );
                    }}
                    className="form-checkbox text-red-500"
                  />
                  {subcategory}
                </label>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="text-gray-300 text-sm font-semibold">แบรนด์</h4>
              {allBrands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-gray-200 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => {
                      setSelectedBrands((prev) =>
                        prev.includes(brand)
                          ? prev.filter((b) => b !== brand)
                          : [...prev, brand]
                      );
                    }}
                    className="form-checkbox text-red-500"
                  />
                  {brand}
                </label>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="text-gray-300 text-sm font-semibold">Function</h4>
              {allFunctions.map((func) => (
                <label key={func} className="flex items-center gap-2 text-gray-200 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedFunctions.includes(func)}
                    onChange={() => {
                      setSelectedFunctions((prev) =>
                        prev.includes(func)
                          ? prev.filter((f) => f !== func)
                          : [...prev, func]
                      );
                    }}
                    className="form-checkbox text-red-500"
                  />
                  {func}
                </label>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedCategories([]);
                setSelectedSubcategories([]);
                setSelectedBrands([]);
                setSelectedFunctions([]);
                setSelectedFunctions([]);
                setCategoryFilter('');
              }}
              className="w-full py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-500 transition-colors"
            >
              ล้างตัวกรอง
            </button>
          </aside>

          <div className="w-full space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="ค้นหาอะไหล่"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-gray-300 border border-gray-700 rounded-md py-3 px-4 focus:outline-none focus:border-red-600"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-600 w-5 h-5 cursor-pointer" />
              </div>
              <button
                onClick={() => setIsFilterPopupOpen(true)}
                className="py-3 px-4 bg-red-600 hover:bg-red-500 rounded-md text-white text-sm font-semibold"
              >
                กรองสินค้า
              </button>
            </div>

            {/* Dropdown category filter */}
            {/* Dropdown category filter (Custom แบบมี Scrollbar เลื่อนขึ้นลงได้) */}
            <div className="relative w-full md:w-[300px]">
              {/* CSS สำหรับแต่ง Scrollbar ให้เข้ากับธีมดำ-แดง */}
              <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #1a1a1a; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #dc2626; }
              `}</style>

              {/* ปุ่มกดเปิด/ปิด Dropdown */}
              <div
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="w-full flex justify-between items-center bg-[#1a1a1a] text-gray-300 border border-gray-700 rounded-md py-3 px-4 cursor-pointer hover:border-red-600 transition-colors"
              >
                <span className="truncate">
                  {categoryFilter === '' ? 'หมวดหมู่อะไหล่ทั้งหมด' : 
                   categoryFilter === 'tire' ? 'ยางรถยนต์' :
                   categoryFilter === 'oil' ? 'น้ำมันเครื่อง' :
                   categoryFilter === 'shock' ? 'โช้คอัพ' :
                   categoryFilter === 'brake' ? 'เบรก' :
                   categoryFilter === 'battery' ? 'แบตเตอรี่' :
                   categoryFilter === 'wheel' ? 'แม็ก' :
                   categoryFilter === 'enginepart_replacement' ? 'ชิ้นส่วนเครื่องยนต์' :
                   categoryFilter === 'performance_upgrade' ? 'อะไหล่เสริมพละกำลังรถ' : 'หมวดหมู่อะไหล่'}
                </span>
                <ChevronDown className={`text-red-600 w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* รายการเมนูที่จะคลี่ออกมา (มี max-h-60 และ overflow-y-auto ทำให้เลื่อนได้) */}
              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-[#1a1a1a] border border-gray-700 rounded-md shadow-2xl z-50 max-h-60 overflow-y-auto custom-scrollbar">
                  {[
                    { value: '', label: 'หมวดหมู่อะไหล่ทั้งหมด' },
                    { value: 'tire', label: 'ยางรถยนต์' },
                    { value: 'oil', label: 'น้ำมันเครื่อง' },
                    { value: 'shock', label: 'โช้คอัพ' },
                    { value: 'brake', label: 'เบรก' },
                    { value: 'battery', label: 'แบตเตอรี่' },
                    { value: 'wheel', label: 'แม็ก' },
                    { value: 'enginepart_replacement', label: 'ชิ้นส่วนเครื่องยนต์' },
                    { value: 'performance_upgrade', label: 'อะไหล่เสริมพละกำลังรถ' }
                  ].map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setCategoryFilter(option.value);
                        setIsCategoryDropdownOpen(false); // เลือกเสร็จปุ๊บ ปิดเมนูทันที
                      }}
                      className={`px-4 py-3 cursor-pointer transition-colors ${
                        categoryFilter === option.value
                          ? 'bg-red-600 text-white font-bold' // ไฮไลท์สีแดงถ้ากำลังเลือกอันนี้อยู่
                          : 'text-gray-300 hover:bg-gray-800 hover:text-red-500'
                      }`}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
        </div>

        {/* Filter Popup */}
        {isFilterPopupOpen && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#121212] border border-gray-800 rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold text-lg">ตัวกรองสินค้า</h3>
                <button
                  onClick={() => setIsFilterPopupOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ปิด
                </button>
              </div>

              <div className="space-y-4 max-h-[70vh] overflow-auto pr-2">
                <div className="space-y-2">
                  <h4 className="text-gray-300 text-sm font-semibold">หมวดหมู่</h4>
                  {allCategories.map((category) => (
                    <label key={category} className="flex items-center gap-2 text-gray-200 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => {
                          setSelectedCategories((prev) =>
                            prev.includes(category)
                              ? prev.filter((c) => c !== category)
                              : [...prev, category]
                          );
                        }}
                        className="form-checkbox text-red-500"
                      />
                      {category}
                    </label>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="text-gray-300 text-sm font-semibold">ย่อยหมวดหมู่</h4>
                  {allSubcategories.map((subcategory) => (
                    <label key={subcategory} className="flex items-center gap-2 text-gray-200 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedSubcategories.includes(subcategory)}
                        onChange={() => {
                          setSelectedSubcategories((prev) =>
                            prev.includes(subcategory)
                              ? prev.filter((s) => s !== subcategory)
                              : [...prev, subcategory]
                          );
                        }}
                        className="form-checkbox text-red-500"
                      />
                      {subcategory}
                    </label>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="text-gray-300 text-sm font-semibold">แบรนด์</h4>
                  {allBrands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 text-gray-200 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => {
                          setSelectedBrands((prev) =>
                            prev.includes(brand)
                              ? prev.filter((b) => b !== brand)
                              : [...prev, brand]
                          );
                        }}
                        className="form-checkbox text-red-500"
                      />
                      {brand}
                    </label>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="text-gray-300 text-sm font-semibold">Function</h4>
                  {allFunctions.map((func) => (
                    <label key={func} className="flex items-center gap-2 text-gray-200 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedFunctions.includes(func)}
                        onChange={() => {
                          setSelectedFunctions((prev) =>
                            prev.includes(func)
                              ? prev.filter((f) => f !== func)
                              : [...prev, func]
                          );
                        }}
                        className="form-checkbox text-red-500"
                      />
                      {func}
                    </label>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedSubcategories([]);
                    setSelectedBrands([]);
                    setSelectedFunctions([]);
                    setCategoryFilter('');
                  }}
                  className="w-full py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-500 transition-colors"
                >
                  ล้างตัวกรอง
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">ไม่พบสินค้าในหมวดหมู่นี้</div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-[#121212] border border-gray-800 hover:border-red-600/50 rounded-xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 group/card relative">
                
                
                {/* Clickable Area: Image & Top Info */}
                <Link to={`/product/${product.id}`} className="flex flex-col flex-grow">
                  {/* Product Image (White Background Area) */}
                  <div className="bg-white p-6 h-64 flex items-center justify-center relative overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="max-h-full max-w-full object-contain drop-shadow-2xl group-hover/card:scale-110 transition-transform duration-500" 
                    />
                    
                    {/* Hover Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Product Details Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Brand Logo & Name */}
                    <div className="h-10 mb-5 flex items-center justify-start gap-4">
                      {getBrandLogo(product.brandName) ? (
                        <div className="bg-white rounded px-3 py-1.5 flex items-center justify-center h-full border border-gray-100 shadow-sm">
                          <img 
                            src={getBrandLogo(product.brandName)!} 
                            alt={product.brandName} 
                            className="max-h-full max-w-[100px] object-contain" 
                          />
                        </div>
                      ) : (
                        <div className="bg-white px-4 py-1.5 flex items-center justify-center h-full rounded shadow-sm">
                          <span className="text-red-600 font-black italic text-xl tracking-tighter lowercase">{product.brandName}</span>
                        </div>
                      )}
                      <div className="flex flex-col">
                         <span className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">{product.brandName}</span>
                         <div className="w-full h-0.5 bg-red-600/30"></div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover/card:text-red-500 transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-xs mb-6 flex-grow leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {/* Price Row */}
                    <div className="flex justify-between items-end mt-auto">
                      <div className="flex flex-col">
                        {(product.promoPrice ?? 0) > 0 && (product.promoPrice ?? 0) < (product.basePrice ?? 0) ? (
                          <>
                            <span className="text-gray-500 text-xs line-through flex items-center gap-1">
                              {(product.basePrice ?? 0).toLocaleString()} <span className="text-[10px]">฿</span>
                            </span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-red-500 text-3xl font-black italic">{(product.promoPrice ?? 0).toLocaleString()}</span>
                              <span className="text-red-500 text-sm font-bold uppercase">baht</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-white text-3xl font-black italic">{Number(product.price.replace(/,/g, '')).toLocaleString()}</span>
                            <span className="text-gray-500 text-sm font-bold uppercase">baht</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Bottom Actions Area */}
                <div className="px-6 pb-6">
                   <div className="w-full h-px bg-gray-800 mb-6"></div>

                   {/* Action Buttons: Kept outside the main Link */}
                   <div className="flex flex-col gap-3">
                      {/* Order Button */}
                      <a
                        href={product.affiliateLink || `/product/${product.id}`}
                        target={product.affiliateLink ? '_blank' : undefined}
                        rel={product.affiliateLink ? 'noreferrer' : undefined}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full flex justify-between items-center px-5 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl group/btn transition-all shadow-lg shadow-red-600/10 hover:shadow-red-600/20 active:scale-[0.98]"
                      >
                        <span className="font-black italic uppercase tracking-wider text-sm">สั่งซื้อสินค้า</span>
                        <div className="bg-white/20 p-1.5 rounded-lg">
                          <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                        </div>
                      </a>

                      {/* Bottom Row Buttons: Compare & Fav */}
                      <div className="flex justify-between items-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCompare(product);
                            }}
                            disabled={isInCompare(product.id)}
                            className={`flex-1 flex justify-between items-center px-5 py-3 border rounded-xl group/comp transition-all ${
                              isInCompare(product.id) 
                              ? 'bg-green-600/10 border-green-500/50 text-green-400 cursor-not-allowed' 
                              : 'bg-transparent border-gray-700 hover:border-gray-500 text-gray-300'
                            }`}
                          >
                            <span className="text-[11px] font-black uppercase tracking-widest">{isInCompare(product.id) ? 'เพิ่มแล้ว' : '+ เปรียบเทียบ'}</span>
                            <Plus className={`w-4 h-4 group-hover/comp:rotate-90 transition-transform ${isInCompare(product.id) ? 'hidden' : ''}`} />
                          </button>

                      </div>
                   </div>
                </div>
                {/* Fav Button Container - ensuring it's on top of everything inside the card */}
                <div className="absolute top-4 right-4 z-[100]">
                    <FavButton productId={product.id} />
                </div>
              </div>
            ))
)}
        </div>
      </div>
    </div>

      <CompareBar />
      <Footer />
    </div>
  );
}
