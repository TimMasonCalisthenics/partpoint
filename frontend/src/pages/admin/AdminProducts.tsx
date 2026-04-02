import React, { useState, useRef, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { API_BASE_URL } from '../../config';
import { Search, Plus, Edit, Trash2, X, Image as ImageIcon, RefreshCw, Box, Save, ChevronDown, Package } from 'lucide-react';

const mockProducts = [
  { 
    id: 1, 
    sku: 'TI-DST-001',
    name: 'ยาง Deestone MT431', 
    brand: 'Deestone', 
    category: 'tire', 
    price: '6,230', 
    promoPrice: '',
    stock: 15, 
    imageUrl: '/Example_product_pic/Product1.png',
    tags: ['OFF-ROAD', 'MT'],
    dynamicSpecs: [
      { key: 'ปีที่ผลิต', value: '2024' },
      { key: 'ความกว้างหน้ายาง', value: '285' }, 
      { key: 'ขนาดยาง', value: 'P285/70R17' },
      { key: 'แก้มยาง', value: '70' }, 
      { key: 'ขนาดวงล้อ', value: '17' },
      { key: 'ขีดจำกัดความเร็วสูงสุด (กม./ชม.)', value: '160' },
      { key: 'ขีดจำกัดน้ำหนักสูงสุด (กก./เส้น)', value: '1250' }
    ],
    description: 'ยางออฟโรดคุณภาพสูง ดอกยางลึกพิเศษ ทนทานต่อการฉีกขาด ลุยโคลนและหินได้ดีเยี่ยม',
    affiliateLink: 'https://shopee.co.th/example'
  },
  { 
    id: 2, 
    sku: 'OL-MOB-001',
    name: 'น้ำมันเครื่อง Mobil 1', 
    brand: 'Mobil 1', 
    category: 'oil', 
    price: '2,500', 
    promoPrice: '',
    stock: 50, 
    imageUrl: '/Example_product_pic/Product1.png',
    tags: ['H-PERFORMANCE', 'FULL-SYNTH'],
    dynamicSpecs: [{ key: 'ความหนืด', value: '5W-30' }],
    description: 'น้ำมันเครื่องสังเคราะห์แท้ 100% ปกป้องเครื่องยนต์ดีเยี่ยม',
    affiliateLink: ''
  },
  { 
    id: 3, 
    sku: 'SH-YSS-001',
    name: 'โช้คอัพ YSS', 
    brand: 'YSS', 
    category: 'shock', 
    price: '12,000', 
    promoPrice: '',
    stock: 8, 
    imageUrl: '/Example_product_pic/Product1.png',
    tags: ['SPORT'],
    dynamicSpecs: [],
    description: '',
    affiliateLink: ''
  },
];

const specTemplates: Record<string, {key: string, value: string, placeholder?: string}[]> = {
  tire: [
    { key: 'ปีที่ผลิต', value: '', placeholder: 'เช่น 2024' },
    { key: 'ความกว้างหน้ายาง', value: '', placeholder: 'เช่น 265' }, 
    { key: 'ขนาดยาง', value: '', placeholder: 'เช่น P285/70R17' },
    { key: 'แก้มยาง', value: '', placeholder: 'เช่น 70' }, 
    { key: 'ขนาดวงล้อ', value: '', placeholder: 'เช่น 17' },
    { key: 'ขีดจำกัดความเร็ว', value: '', placeholder: 'เช่น 160 กม./ชม.' },
    { key: 'ขีดจำกัดน้ำหนัก', value: '', placeholder: 'เช่น 1250 กก./เส้น' }
  ],
  wheel: [
    { key: 'หน้ากว้าง', value: '', placeholder: 'เช่น 8.5 นิ้ว' },
    { key: 'ขอบล้อ', value: '', placeholder: 'เช่น 18 นิ้ว' },
    { key: 'ระยะรูน็อต', value: '', placeholder: 'เช่น 5x114.3' },
    { key: 'ค่าออฟเซ็ต', value: '', placeholder: 'เช่น +35' },
    { key: 'รูกลางล้อ', value: '', placeholder: 'เช่น 73.1 มม.' },
    { key: 'จำนวนก้าน', value: '', placeholder: 'เช่น 5 หรือ 6 ก้าน' },
    { key: 'น้ำหนักต่อวง', value: '', placeholder: 'เช่น 8.5 กก.' },
    { key: 'ประเภทการผลิต', value: '', placeholder: 'เช่น Forged, Flow Forming' },
    { key: 'สี/พื้นผิววัสดุ', value: '', placeholder: 'เช่น Matte Black' }
  ],
  oil: [
    { key: 'ความหนืด', value: '', placeholder: 'เช่น 5W-30' },
    { key: 'ประเภทพื้นฐาน', value: '', placeholder: 'เช่น สังเคราะห์แท้ 100%' },
    { key: 'ปริมาตร', value: '', placeholder: 'เช่น 4 ลิตร' },
    { key: 'ประเภทเครื่องยนต์', value: '', placeholder: 'เช่น เบนซิน หรือ ดีเซล' },
    { key: 'มาตรฐานคุณภาพ', value: '', placeholder: 'เช่น API SP, ACEA A3' },
    { key: 'ประเภทน้ำมันเครื่อง', value: '', placeholder: 'เช่น พรีเมียม, ใช้งานทั่วไป' },
    { key: 'ค่าความหนืดอุณหภูมิต่ำ', value: '', placeholder: 'เช่น 5W' },
    { key: 'ค่าความหนืดอุณหภูมิสูง', value: '', placeholder: 'เช่น 30' },
    { key: 'ระยะเปลี่ยนถ่าย', value: '', placeholder: 'เช่น 10,000 กม.' }
  ],
  shock: [
    { key: 'ระบบโช้ค', value: '', placeholder: 'เช่น Monotube, Twin-tube' },
    { key: 'การปรับระดับความหนืด', value: '', placeholder: 'เช่น ปรับได้ 16 ระดับ' },
    { key: 'ความสูง', value: '', placeholder: 'เช่น สแตนดาร์ด, โหลดเตี้ย 1.5 นิ้ว' },
    { key: 'ประเภท', value: '', placeholder: 'เช่น สตรัทปรับเกลียว' },
    { key: 'ช่วงยุบ', value: '', placeholder: 'เช่น 120 มม.' },
    { key: 'วัสดุกระบอกโช้ค', value: '', placeholder: 'เช่น อะลูมิเนียม' }
  ],
  brake: [
    { key: 'ความยาว (มม.)', value: '', placeholder: 'เช่น 150' },
    { key: 'ความกว้าง (มม.)', value: '', placeholder: 'เช่น 50' },
    { key: 'น้ำหนัก (กรัม)', value: '', placeholder: 'เช่น 1200' },
    { key: 'รัศมี', value: '', placeholder: 'เช่น 15 นิ้ว' },
    { key: 'อุณหภูมิสูงสุด', value: '', placeholder: 'เช่น 500 °C' },
    { key: 'วัสดุ', value: '', placeholder: 'เช่น Ceramic, Semi-Metallic' },
    { key: 'ค่าความหนึบ', value: '', placeholder: 'เช่น 0.45 µ' },
    { key: 'ระดับฝุ่นเบรก', value: '', placeholder: 'เช่น น้อย, ปานกลาง' }
  ],
  battery: [
    { key: 'ความจุ', value: '', placeholder: 'เช่น 45 Ah' },
    { key: 'ค่า CCA', value: '', placeholder: 'เช่น 350' },
    { key: 'ขนาด', value: '', placeholder: 'เช่น 129x238x225 มม.' },
    { key: 'ค่ากำลังสตาร์ท', value: '', placeholder: 'เช่น ปกติ, สูง' },
    { key: 'แรงดันไฟ', value: '', placeholder: 'เช่น 12V' },
    { key: 'ค่าสำรองไฟ (นาที)', value: '', placeholder: 'เช่น 60' },
    { key: 'รับประกัน (เดือน)', value: '', placeholder: 'เช่น 12 หรือ 24' },
    { key: 'น้ำหนัก', value: '', placeholder: 'เช่น 11.5 กก.' },
    { key: 'ประเภทขั้ว', value: '', placeholder: 'เช่น ขั้วจม, ขั้วลอย' },
    { key: 'ขั้ว (L/R)', value: '', placeholder: 'เช่น L หรือ R' },
    { key: 'ชนิด', value: '', placeholder: 'เช่น แบตเตอรี่แห้ง (SMF)' },
    { key: 'การใช้งาน', value: '', placeholder: 'เช่น รถเก๋ง 1.2-1.5cc' }
  ]
};

const categoryMap: Record<string, number> = {
  'tire': 1, 'wheel': 2, 'oil': 3, 'shock': 4, 'brake': 5, 'battery': 6, 'enginepart_replacement': 7, 'performance_upgrade': 8
};

const getCategoryName = (id: number) => {
  return Object.keys(categoryMap).find(k => categoryMap[k] === id) || 'tire';
};

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>(mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        const mappedProducts = data.map((p: any) => ({
          ...p,
          price: p.basePrice?.toString() || '',
          promoPrice: p.promoPrice?.toString() || '',
          imageUrl: p.imageURL && !p.imageURL.startsWith('blob:') ? p.imageURL : '',
          extraImagesRaw: p.extraImages || '[]',
          tags: p.tags ? JSON.parse(p.tags) : [],
          dynamicSpecs: p.specifications ? JSON.parse(p.specifications) : [],
          category: getCategoryName(p.categoryId)
        }));
        setProducts(mappedProducts);
      } else {
        console.warn("Backend didn't return OK, showing mock data.");
        setProducts(mockProducts);
      }
    } catch (err) {
      console.error(err);
      setProducts(mockProducts); // Fallback to mock
    }
  };

  // Form State
  const [formData, setFormData] = useState({ 
    id: 0, 
    sku: '',
    name: '', 
    brand: '', 
    category: 'tire', 
    price: '', 
    promoPrice: '',
    stock: 0, 
    imageUrl: '', 
    tags: [] as string[],
    dynamicSpecs: [] as {key: string, value: string, placeholder?: string}[],
    description: '',
    affiliateLink: ''
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Tag Input State
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setFormData(prev => {
       // Only auto-populate predefined spec templates when we are adding a NEW product
       let newSpecs = prev.dynamicSpecs;
       if (prev.id === 0) {
         newSpecs = specTemplates[newCategory] || [];
       }
       return { ...prev, category: newCategory, dynamicSpecs: newSpecs };
    });
  };

  const handleOpenModal = (product: any = null) => {
    setImagePreview(null);
    if (product) {
      // โหลด extraImages กลับมาตอนแก้ไข
      let loadedExtras: string[] = [];
      try {
        loadedExtras = JSON.parse(product.extraImagesRaw || '[]');
        if (!Array.isArray(loadedExtras)) loadedExtras = [];
      } catch { loadedExtras = []; }
      setExtraImages(loadedExtras);

      const imgUrl = product.imageUrl && !product.imageUrl.startsWith('blob:') ? product.imageUrl : '';
      setFormData({
        ...product,
        imageUrl: imgUrl,
        tags: product.tags || [],
        dynamicSpecs: product.dynamicSpecs || [],
        description: product.description || '',
        affiliateLink: product.affiliateLink || ''
      });
      if (imgUrl) setImagePreview(imgUrl);
    } else {
      setExtraImages([]);
      setFormData({ 
        id: 0, sku: '', name: '', brand: '', category: 'tire', price: '', promoPrice: '', stock: 0, imageUrl: '', tags: [], description: '', affiliateLink: '',
        dynamicSpecs: specTemplates['tire']
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?')) {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (res.ok) {
           fetchProducts();
        } else {
           // Fallback for mock environment
           setProducts(products.filter(p => p.id !== id));
        }
      } catch (err) {
        setProducts(products.filter(p => p.id !== id));
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      sku: formData.sku,
      name: formData.name,
      brand: formData.brand,
      description: formData.description,
      imageURL: formData.imageUrl,
      extraImages: JSON.stringify(extraImages),
      specifications: JSON.stringify(formData.dynamicSpecs),
      tags: JSON.stringify(formData.tags),
      basePrice: parseFloat(formData.price || '0'),
      promoPrice: parseFloat(formData.promoPrice || '0'),
      stock: formData.stock,
      affiliateLink: formData.affiliateLink,
      categoryId: categoryMap[formData.category] || 1,
      vehicleId: 0
    };

    try {
      if (formData.id === 0) {
        // Create
        const res = await fetch(`${API_BASE_URL}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
        if (res.ok) {
           fetchProducts();
        } else {
           // fallback mock
           setProducts([{ ...formData, id: Date.now() }, ...products]);
        }
      } else {
        // Update
        const res = await fetch(`${API_BASE_URL}/products/${formData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
        if (res.ok) {
           fetchProducts();
        } else {
           // fallback mock
           setProducts(products.map(p => p.id === formData.id ? formData : p));
        }
      }
    } catch (err) {
      console.warn("Backend unavailable, applying changes locally", err);
      if (formData.id === 0) setProducts([{ ...formData, id: Date.now() }, ...products]);
      else setProducts(products.map(p => p.id === formData.id ? formData : p));
    }
    
    setIsModalOpen(false);
  };

  // --- Image Upload (อัปโหลดจริง ไม่ใช่ blob URL อีกต่อไป) ---
  const [uploadingImage, setUploadingImage] = useState(false);
  const [extraImages, setExtraImages] = useState<string[]>([]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const formDataUpload = new FormData();
      formDataUpload.append('image', files[i]);

      try {
        const res = await fetch(`${API_BASE_URL}/upload`, {
          method: 'POST',
          credentials: 'include',
          body: formDataUpload,
        });
        if (res.ok) {
          const data = await res.json();
          uploadedUrls.push(data.url);
        } else {
          const errorText = await res.text();
          console.error('Upload failed:', res.status, errorText);
        }
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }

    if (uploadedUrls.length > 0) {
      // รูปแรกเป็น imageUrl หลัก
      if (!formData.imageUrl) {
        setFormData(prev => ({ ...prev, imageUrl: uploadedUrls[0] }));
        setImagePreview(uploadedUrls[0]);
        setExtraImages(prev => [...prev, ...uploadedUrls.slice(1)]);
      } else {
        setExtraImages(prev => [...prev, ...uploadedUrls]);
      }
    }
    setUploadingImage(false);
  };

  const removeExtraImage = (index: number) => {
    setExtraImages(prev => prev.filter((_, i) => i !== index));
  };

  const setAsMainImage = (url: string, index: number) => {
    const oldMain = formData.imageUrl;
    setFormData(prev => ({ ...prev, imageUrl: url }));
    setImagePreview(url);
    setExtraImages(prev => {
      const newArr = prev.filter((_, i) => i !== index);
      if (oldMain) newArr.push(oldMain);
      return newArr;
    });
  };

  // --- SKU Generator ---
  const generateSKU = () => {
    const prefixes: Record<string, string> = {
      tire: 'TI', oil: 'OL', shock: 'SH', brake: 'BK', battery: 'BT', wheel: 'WH'
    };
    const prefix = prefixes[formData.category] || 'PR';
    const brandCode = formData.brand ? formData.brand.substring(0, 3).toUpperCase() : 'XXX';
    const randomNum = Math.floor(100 + Math.random() * 900);
    setFormData(prev => ({ ...prev, sku: `${prefix}-${brandCode}-${randomNum}` }));
  };

  // --- Dynamic Specs ---
  const addDynamicSpec = () => {
    setFormData(prev => ({ ...prev, dynamicSpecs: [...prev.dynamicSpecs, { key: '', value: '' }] }));
  };
  const updateSpec = (index: number, field: 'key' | 'value', val: string) => {
    const newSpecs = [...formData.dynamicSpecs];
    newSpecs[index][field] = val;
    setFormData(prev => ({ ...prev, dynamicSpecs: newSpecs }));
  };
  const removeSpec = (index: number) => {
    setFormData(prev => ({ ...prev, dynamicSpecs: prev.dynamicSpecs.filter((_, i) => i !== index) }));
  };

  // --- Tags ---
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = newTagInput.trim().toUpperCase();
      if (val && !formData.tags.includes(val)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, val] }));
      }
      setNewTagInput('');
      setIsAddingTag(false);
    }
  };
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
  };

  // --- Data Table ---
  const getSpecSummary = (specs: {key: string, value: string}[]) => {
    if (!specs || specs.length === 0) return '-';
    return `${specs.length} ข้อ`;
  };

  // Get unique brands from current product list
  const uniqueBrands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean);
  const categoriesList = Object.keys(categoryMap);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || p.brand === selectedBrand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  return (
    <AdminLayout>
      <div className="p-8 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">จัดการสินค้า</h1>
            <p className="text-gray-400">ควบคุมระบบรายการสินค้า คลังสินค้า และสเปกอะไหล่ทั้งหมด</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-bold transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)]"
          >
            <Plus className="w-5 h-5" />
            เพิ่มสินค้าใหม่
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-[#121212] p-4 rounded-t-2xl border border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-1 flex-col md:flex-row items-center gap-3 w-full">
            <div className="relative w-full max-w-sm">
              <input 
                type="text" 
                placeholder="ค้นหา ชื่อสินค้า, แบรนด์, หรือรหัส..." 
                className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded-xl pl-11 pr-4 py-2.5 focus:outline-none focus:border-red-600 transition-colors text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Category Filter */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#1a1a1a] border border-gray-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-red-600 transition-colors text-sm w-full md:w-auto min-w-[140px] font-medium"
            >
              <option value="all">ทุกหมวดหมู่</option>
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>{cat.toUpperCase()}</option>
              ))}
            </select>

            {/* Brand Filter */}
            <select 
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-[#1a1a1a] border border-gray-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-red-600 transition-colors text-sm w-full md:w-auto min-w-[140px] font-medium"
            >
              <option value="all">ทุกแบรนด์</option>
              {uniqueBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            {/* Reset Filters */}
            {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery !== '') && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                }}
                className="text-gray-500 hover:text-red-500 text-xs font-bold transition-colors underline decoration-dotted"
              >
                ล้างตัวกรอง
              </button>
            )}
          </div>

          <div className="text-gray-500 text-xs font-bold uppercase tracking-widest hidden lg:block">
            แสดง {filteredProducts.length} รายการ
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-t-0 border-gray-800 rounded-b-2xl bg-[#0d0d0d]">
          <table className="w-full text-left text-sm text-gray-300 whitespace-nowrap">
            <thead className="text-[11px] font-bold tracking-wider text-gray-500 uppercase bg-[#141414] border-b border-gray-800">
              <tr>
                <th className="px-6 py-5">รหัสอ้างอิง (SKU)</th>
                <th className="px-6 py-5">รูปภาพ</th>
                <th className="px-6 py-5">ชื่อสินค้า</th>
                <th className="px-6 py-5">แบรนด์</th>
                <th className="px-6 py-5">หมวดหมู่</th>
                <th className="px-6 py-5">ข้อมูลสเปก</th>
                <th className="px-6 py-5 text-right">ราคา (บาท)</th>
                <th className="px-6 py-5 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-800/50 hover:bg-[#1a1a1a] transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs text-gray-400 group-hover:text-white transition-colors">
                    {product.sku || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden border border-gray-800">
                        {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-full object-contain p-1" />
                        ) : (
                            <ImageIcon className="w-5 h-5 text-gray-600" />
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <p className="text-white font-bold break-words whitespace-normal min-w-[180px]">{product.name}</p>
                     {product.tags && product.tags.length > 0 && (
                        <div className="flex gap-1 mt-1.5 flex-wrap w-48">
                          {product.tags.map((t: string, idx: number) => (
                            <span key={idx} className="bg-red-600/10 text-red-500 text-[9px] font-bold px-1.5 py-0.5 rounded border border-red-500/20">{t}</span>
                          ))}
                        </div>
                     )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-300">{product.brand}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-md text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                        {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     {product.dynamicSpecs.length > 0 ? (
                        <span className="text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2.5 py-1 rounded text-xs font-medium">
                          {getSpecSummary(product.dynamicSpecs)}
                        </span>
                     ) : (
                        <span className="text-gray-600 font-bold">-</span>
                     )}
                  </td>
                  <td className="px-6 py-4 text-right text-white font-bold">฿{product.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                        <button onClick={() => handleOpenModal(product)} className="text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="text-gray-500 hover:text-red-500 bg-gray-800 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 p-2 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                       <Package className="w-12 h-12 text-gray-700 mb-4" />
                       <p className="text-gray-400 text-lg">ไม่พบข้อมูลสินค้า "{searchQuery}"</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Advanced Premium Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0f0f11] border border-gray-800 rounded-3xl w-full max-w-5xl p-6 md:p-10 shadow-[0_0_50px_rgba(220,38,38,0.05)] relative max-h-[95vh] overflow-y-auto custom-scrollbar">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white tracking-tight">{formData.id === 0 ? 'เพิ่มรายการสินค้าใหม่' : 'แก้ไขข้อมูลสินค้า'}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
              
              {/* LEFT COLUMN: Media & ID Box */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Image Upload Box */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-3xl border-2 border-dashed border-gray-700 bg-[#141414] hover:border-red-600/50 hover:bg-[#1a1a1a] transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden group"
                >
                  {imagePreview || formData.imageUrl ? (
                     <img src={imagePreview || formData.imageUrl} alt="preview" className="absolute inset-0 w-full h-full object-contain p-6 group-hover:opacity-40 transition-opacity bg-white/5" />
                  ) : (
                    <div className="flex flex-col items-center text-center p-6">
                      <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                         <Plus className="w-8 h-8 text-red-500" />
                      </div>
                      <p className="text-gray-300 font-bold mb-1">อัปโหลดรูป (รองรับหลายรูป)</p>
                      <p className="text-gray-600 text-xs font-medium">แนะนำ 1000x1000 px</p>
                    </div>
                  )}
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                       <div className="text-red-500 font-bold animate-pulse">กำลังอัปโหลด...</div>
                    </div>
                  )}
                  {(imagePreview || formData.imageUrl) && !uploadingImage && (
                     <p className="absolute text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">เพิ่มรูปเพิ่มเติม</p>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/png, image/jpeg, image/webp" multiple onChange={handleImageChange} />
                </div>

                {/* Extra Images Gallery */}
                {extraImages.length > 0 && (
                  <div className="bg-[#141414] rounded-2xl p-4 border border-gray-800">
                    <p className="text-[10px] font-bold text-gray-500 mb-3 tracking-widest uppercase">รูปภาพเพิ่มเติม ({extraImages.length} รูป)</p>
                    <div className="grid grid-cols-3 gap-2">
                      {extraImages.map((url, i) => (
                        <div key={i} className="relative aspect-square rounded-xl border border-gray-800 overflow-hidden group/thumb">
                          <img src={url} alt="" className="w-full h-full object-contain bg-white/5 p-1" />
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                            <button type="button" onClick={(e) => { e.stopPropagation(); setAsMainImage(url, i); }} className="text-[9px] bg-red-600 text-white px-2 py-1 rounded font-bold">ตั้งเป็นหลัก</button>
                            <button type="button" onClick={(e) => { e.stopPropagation(); removeExtraImage(i); }} className="text-[9px] bg-gray-700 text-white px-2 py-1 rounded font-bold">ลบ</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SKU Generator Box */}
                <div className="bg-[#141414] rounded-2xl p-6 border border-gray-800">
                   <label className="block text-[10px] font-bold text-gray-500 mb-3 tracking-widest uppercase">รหัสสินค้าเฉพาะ (PRODUCT SKU)</label>
                   <div className="flex gap-3">
                      <div className="relative flex-grow">
                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-mono text-lg font-bold">#</span>
                         <input 
                           required
                           type="text" 
                           value={formData.sku} 
                           onChange={e => setFormData({...formData, sku: e.target.value.toUpperCase()})}
                           placeholder="เช่น TI-MIC-001" 
                           className="w-full bg-[#0a0a0a] border border-gray-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-red-600/50 transition-colors font-mono text-sm tracking-wider" 
                         />
                      </div>
                      <button 
                        type="button" 
                        onClick={generateSKU}
                        title="สุ่มรหัสสินค้า"
                        className="w-12 h-12 flex-shrink-0 bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-gray-800 hover:border-red-600/30 rounded-xl flex items-center justify-center text-red-500 transition-all active:scale-95"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                   </div>
                   <p className="text-[10px] text-gray-600 mt-3">* รหัสที่ใช้สำหรับอ้างอิงในระบบและฐานข้อมูล</p>
                </div>
              </div>

              {/* RIGHT COLUMN: Info & Dynamic Fields */}
              <div className="lg:col-span-8 flex flex-col h-full border border-gray-800/50 bg-[#141414] rounded-3xl p-6 sm:p-8">
                
                {/* Basic Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 tracking-wide">หมวดหมู่สินค้า</label>
                    <div className="relative">
                      <select value={formData.category} onChange={handleCategoryChange} className="w-full bg-[#0a0a0a] border border-gray-800 text-white pl-5 pr-12 py-3.5 rounded-xl focus:outline-none focus:border-red-600/50 appearance-none font-medium">
                        <option value="tire">ยางรถยนต์ (Tires)</option>
                        <option value="oil">น้ำมันเครื่อง (Oils)</option>
                        <option value="shock">โช้คอัพ (Shocks)</option>
                        <option value="brake">เบรก (Brakes)</option>
                        <option value="battery">แบตเตอรี่ (Batteries)</option>
                        <option value="wheel">แม็ก (Wheels)</option>
                        <option value="enginepart_replacement">อะไหล่ซ่อมบำรุง (Service Part)</option>
                        <option value="performance_upgrade">อะไหล่เสริมพละกำลังรถ (Performance)</option>
                      </select>
                      <ChevronDown className="w-5 h-5 text-red-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 tracking-wide">ชื่อสินค้า</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="เช่น Michelin PS5" className="w-full bg-[#0a0a0a] border border-gray-800 text-white px-5 py-3.5 rounded-xl focus:outline-none focus:border-red-600/50 font-medium placeholder-gray-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 tracking-wide">ราคาปกติ</label>
                    <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="0.00" className="w-full bg-[#0a0a0a] border border-gray-800 text-white px-5 py-3.5 rounded-xl focus:outline-none focus:border-red-600/50 font-mono font-bold placeholder-gray-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 tracking-wide">ราคาโปรโมชั่น</label>
                    <input type="text" value={formData.promoPrice || ''} onChange={e => setFormData({...formData, promoPrice: e.target.value})} placeholder="0.00 (เว้นว่างได้)" className="w-full bg-[#0a0a0a] border border-gray-800 text-red-500 px-5 py-3.5 rounded-xl focus:outline-none focus:border-red-600/50 font-mono font-bold placeholder-gray-600/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 tracking-wide">แบรนด์</label>
                    <input required type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} placeholder="เช่น Michelin" className="w-full bg-[#0a0a0a] border border-gray-800 text-white px-5 py-3.5 rounded-xl focus:outline-none focus:border-red-600/50 font-medium placeholder-gray-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 tracking-wide">สต๊อกสินค้า</label>
                    <input required type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} placeholder="0" className="w-full bg-[#0a0a0a] border border-gray-800 text-white px-5 py-3.5 rounded-xl focus:outline-none focus:border-red-600/50 font-mono font-bold placeholder-gray-600" />
                  </div>
                </div>

                <div className="w-full h-px bg-gray-800/50 mb-8"></div>

                {/* Dynamic Specs Section */}
                <div className="mb-10">
                   <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2 text-red-500">
                         <Box className="w-5 h-5 flex-shrink-0" />
                         <h4 className="font-bold tracking-wider text-sm">รายละเอียดสเปกยิบย่อย</h4>
                      </div>
                      <button type="button" onClick={addDynamicSpec} className="text-xs font-bold text-gray-400 hover:text-white bg-[#1a1a1a] hover:bg-[#222] px-4 py-2 rounded-full border border-gray-800 transition-colors tracking-wide flex items-center gap-1.5 flex-shrink-0">
                         <span className="text-red-500 text-lg leading-none">+</span> เพิ่มแถวข้อมูล
                      </button>
                   </div>

                   <div className="space-y-4">
                      {formData.dynamicSpecs.map((spec, index) => (
                         <div key={index} className="flex gap-4 items-center bg-[#0a0a0a] p-2 pr-4 rounded-xl border border-gray-800/80">
                            <input type="text" value={spec.key} onChange={e => updateSpec(index, 'key', e.target.value)} placeholder="ระบุหัวข้อสเปก..." className="w-1/2 bg-transparent text-gray-300 font-medium text-sm px-4 py-2 focus:outline-none" />
                            <div className="w-px h-6 bg-gray-800"></div>
                            <input type="text" value={spec.value} onChange={e => updateSpec(index, 'value', e.target.value)} placeholder={spec.placeholder ? `ข้อมูล (${spec.placeholder})` : "ข้อมูล (เช่น 100)"} className="w-1/2 bg-transparent text-white font-bold text-sm px-4 py-2 focus:outline-none" />
                            <button type="button" onClick={() => removeSpec(index)} className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0">
                               <Trash2 className="w-4 h-4" />
                            </button>
                         </div>
                      ))}
                      {formData.dynamicSpecs.length === 0 && (
                         <div className="border border-dashed border-gray-800 rounded-xl p-6 flex items-center justify-center">
                            <p className="text-sm text-gray-600 font-medium">กดปุ่ม + เพิ่มแถวข้อมูล เพื่อใส่รายละเอียดพิเศษได้เลย</p>
                         </div>
                      )}
                   </div>
                </div>

                {/* Tags Section */}
                <div className="mb-auto">
                   <label className="block text-xs font-bold text-gray-500 mb-4 tracking-widest uppercase">แท็กคุณสมบัติ (TAGS)</label>
                   <div className="flex flex-wrap gap-2.5 items-center">
                      {formData.tags.map(tag => (
                         <span key={tag} className="flex items-center gap-2 bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded border border-red-500 uppercase tracking-wider shadow-sm">
                            {tag}
                            <X className="w-3.5 h-3.5 cursor-pointer hover:text-black hover:scale-110 transition-all opacity-80 hover:opacity-100" onClick={() => removeTag(tag)} />
                         </span>
                      ))}
                      
                      {isAddingTag ? (
                        <input 
                           type="text" 
                           autoFocus 
                           value={newTagInput}
                           onChange={e => setNewTagInput(e.target.value)}
                           onKeyDown={handleAddTag}
                           onBlur={() => setIsAddingTag(false)}
                           placeholder="พิมพ์แล้วกด Enter..."
                           className="bg-[#0a0a0a] border border-red-600/50 text-white text-[10px] font-bold px-3 py-1.5 rounded focus:outline-none w-36 uppercase tracking-wider"
                        />
                      ) : (
                        <button type="button" onClick={() => setIsAddingTag(true)} className="text-[10px] font-bold text-gray-400 hover:text-white bg-transparent border border-dashed border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 uppercase tracking-wider">
                          <span className="text-gray-500">+</span> เพิ่มแท็ก
                        </button>
                      )}
                   </div>
                </div>

                {/* description & affiliate Link */}
                <div className="w-full h-px bg-gray-800/50 my-10"></div>
                
                <div className="space-y-6 mb-8">
                   <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 tracking-wide text-red-500">คำอธิบายเพิ่มเติม</label>
                      <textarea rows={4} maxLength={250} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="ป้อนรายละเอียดสินค้า ข้อดีเด่น..." className="w-full bg-[#0a0a0a] border border-gray-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-red-600/50 font-medium placeholder-gray-600 resize-none"></textarea>
                      <p className="text-right text-[10px] text-gray-500 mt-1">{formData.description.length}/250 ตัวอักษร</p>
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 tracking-wide text-red-500">แนบลิ้งสินค้าที่อ้างอิง</label>
                      <input type="url" value={formData.affiliateLink} onChange={e => setFormData({...formData, affiliateLink: e.target.value})} placeholder="https://..." className="w-full bg-[#0a0a0a] border border-gray-800 text-blue-400 px-5 py-3.5 rounded-xl focus:outline-none focus:border-red-600/50 font-mono font-medium placeholder-gray-600" />
                   </div>
                </div>

                {/* Submit Action */}
                <div className="mt-8">
                   <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all active:scale-[0.98]">
                     <Save className="w-6 h-6" />
                     บันทึกข้อมูลอะไหล่
                   </button>
                </div>

              </div>

            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
