import { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Search, ChevronDown, ShoppingCart, Eye, Plus } from 'lucide-react';

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
    category: 'shock',    subcategory: 'โช้คอัพสปอร์ต',    function: 'comfort',
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
    imageUrl: '/Example_product_pic/Product4.6.jpg'  },
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

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  const allCategories = Array.from(new Set(productsData.map((p) => p.category)));
  const allSubcategories = Array.from(
    new Set(productsData.map((p) => p.subcategory).filter((s): s is string => Boolean(s)))
  );
  const allBrands = Array.from(new Set(productsData.map((p) => p.brandName)));
  const allFunctions = Array.from(new Set(productsData.map((p) => p.function)));

  const filteredProducts = productsData.filter((product) => {
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
      selectedFunctions.length === 0 || selectedFunctions.includes(product.function);

    return (
      searchMatched &&
      categoryMatched &&
      selectedCategoriesMatched &&
      selectedSubcategoriesMatched &&
      selectedBrandsMatched &&
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
            <div className="relative w-full md:w-[300px]">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full appearance-none bg-[#1a1a1a] text-gray-300 border border-gray-700 rounded-md py-3 px-4 pr-10 focus:outline-none focus:border-red-600"
              >
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
          )))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
