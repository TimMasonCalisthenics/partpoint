import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, Star, ExternalLink, ShieldCheck, Calendar, Gauge, MessageCircle, ArrowLeftRight, Loader2, Check } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useAuth } from '../context/AuthContext';
import { getBrandLogo } from '../utils/brandLogos';
import { useCompare } from '../context/CompareContext';
import CompareBar from '../components/CompareBar';
import { API_BASE_URL } from '../config';

// Types
interface Store {
  id: number;
  name: string;
  websiteBaseURL: string;
  reliabilityScore: number;
}

interface PriceListing {
  id: number;
  price: number;
  productURL: string;
  productId: number;
  storeId: number;
  store: Store;
}

interface Product {
  id: number;
  sku: string;
  name: string;
  brand: string;
  description: string;
  imageURL: string;
  extraImages: string;
  specifications: string;
  tags: string;
  basePrice: number;
  promoPrice: number;
  stock: number;
  affiliateLink: string;
  categoryId: number;
  vehicleId: number;
  prices: PriceListing[];
}

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { addToCompare, isInCompare } = useCompare();

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setSelectedImage(data.imageURL || '');
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Check favourite status
  useEffect(() => {
    if (!user) return;
    const checkFav = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/fav`, { credentials: 'include' });
          const favs = await res.json();
          if (Array.isArray(favs)) {
            setIsFav(favs.some((f: { productId: number }) => f.productId === Number(id)));
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkFav();
  }, [user, id]);

  const toggleFav = async () => {
    if (!user) {
      alert('กรุณาเข้าสู่ระบบก่อนเพื่อกดถูกใจ');
      return;
    }
    setFavLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/fav`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: Number(id) }),
      });
      if (res.ok) {
        const data = await res.json();
        setIsFav(data.status === 'added');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFavLoading(false);
    }
  };

  // Parse specs from JSON string - handles both formats:
  // Array format: [{key: "ปีที่ผลิต", value: "2024"}, ...]
  // Object format: {"ปีที่ผลิต": "2024", ...}
  const parseSpecs = (str: string): [string, string][] => {
    try {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed)) {
        // Array of {key, value} objects from Admin
        return parsed
          .filter((item: any) => item.key && item.value)
          .map((item: any) => [item.key, item.value] as [string, string]);
      }
      if (typeof parsed === 'object' && parsed !== null) {
        // Flat object
        return Object.entries(parsed).map(([k, v]) => [k, String(v)] as [string, string]);
      }
      return [];
    } catch {
      return [];
    }
  };

  const parseTags = (str: string): string[] => {
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0f0f11] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">ไม่พบสินค้า</h2>
        <Link to="/products" className="text-red-500 hover:text-red-400 underline">กลับไปหน้ารวมสินค้า</Link>
      </div>
    );
  }

  const specsEntries = parseSpecs(product.specifications);
  const tags = parseTags(product.tags);

  // Pick first 3 specs for highlight cards
  const highlightSpecs = specsEntries.slice(0, 3);

  const displayPrice = product.promoPrice > 0 ? product.promoPrice : product.basePrice;
  const hasPromo = product.promoPrice > 0 && product.promoPrice < product.basePrice;

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white">
      <Navbar />

      {/* Top Bar */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/products" className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm">
          <ArrowLeft className="w-4 h-4" />
          กลับหน้าหลัก
        </Link>
        <button className="text-gray-400 hover:text-white transition">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ======= LEFT: Image ======= */}
          <div className="relative">
            {/* Tags */}
            {tags.length > 0 && (
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {tags.map((tag, i) => (
                  <span key={i} className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Main Image with Navigation Arrows */}
            {(() => {
              let allImages: string[] = [];
              if (product.imageURL) allImages.push(product.imageURL);
              try {
                const extras = JSON.parse(product.extraImages || '[]');
                if (Array.isArray(extras)) allImages = [...allImages, ...extras];
              } catch {}

              const currentIndex = allImages.indexOf(selectedImage);
              const hasPrev = currentIndex > 0;
              const hasNext = currentIndex < allImages.length - 1;
              const canNavigate = allImages.length > 1;

              const goPrev = () => {
                if (hasPrev) setSelectedImage(allImages[currentIndex - 1]);
              };
              const goNext = () => {
                if (hasNext) setSelectedImage(allImages[currentIndex + 1]);
              };

              return (
                <>
                  <div className="bg-[#1a1a1e] rounded-2xl overflow-hidden border border-gray-800/50 aspect-[4/3] flex items-center justify-center relative group/img">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt={product.name}
                        className="w-full h-full object-contain p-4"
                      />
                    ) : (
                      <div className="text-gray-600 text-lg">ไม่มีภาพสินค้า</div>
                    )}

                    {/* Left Arrow */}
                    {canNavigate && (
                      <button
                        onClick={goPrev}
                        disabled={!hasPrev}
                        className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          hasPrev 
                            ? 'bg-black/60 text-white hover:bg-red-600 hover:scale-110 backdrop-blur-sm opacity-0 group-hover/img:opacity-100' 
                            : 'bg-black/20 text-gray-600 cursor-not-allowed opacity-0 group-hover/img:opacity-50'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                      </button>
                    )}

                    {/* Right Arrow */}
                    {canNavigate && (
                      <button
                        onClick={goNext}
                        disabled={!hasNext}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          hasNext 
                            ? 'bg-black/60 text-white hover:bg-red-600 hover:scale-110 backdrop-blur-sm opacity-0 group-hover/img:opacity-100' 
                            : 'bg-black/20 text-gray-600 cursor-not-allowed opacity-0 group-hover/img:opacity-50'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    )}

                    {/* Image Counter */}
                    {canNavigate && (
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity">
                        {currentIndex + 1} / {allImages.length}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {allImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-3 mt-4">
                      {allImages.map((img, i) => (
                        <div 
                          key={i} 
                          onClick={() => setSelectedImage(img)}
                          className={`aspect-square rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${selectedImage === img ? 'border-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]' : 'border-gray-800 hover:border-gray-600'}`}
                        >
                          <img src={img} alt="" className="w-full h-full object-contain bg-[#1a1a1e] p-1" />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* ======= RIGHT: Info ======= */}
          <div className="flex flex-col gap-6">

            {/* Brand & SKU */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                {/* Brand Logo */}
                {getBrandLogo(product.brand) && (
                  <div className="bg-white rounded-lg px-3 py-1.5 flex items-center justify-center h-10">
                    <img
                      src={getBrandLogo(product.brand)!}
                      alt={product.brand}
                      className="max-h-7 max-w-[120px] object-contain"
                    />
                  </div>
                )}
                <span className="text-red-500 font-black italic text-lg uppercase tracking-wider">{product.brand}</span>
                {product.sku && (
                  <>
                    <span className="text-gray-600">●</span>
                    <span className="text-gray-500 text-sm font-mono">#{product.sku}</span>
                  </>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">{product.name}</h1>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-400 text-sm leading-relaxed max-w-lg">{product.description}</p>
            )}

            {/* Highlight Spec Cards */}
            {highlightSpecs.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {highlightSpecs.map(([key, value], i) => {
                  const icons = [<Gauge key="g" className="w-5 h-5 text-gray-500" />, <Calendar key="c" className="w-5 h-5 text-gray-500" />, <ShieldCheck key="s" className="w-5 h-5 text-gray-500" />];
                  return (
                    <div key={i} className="bg-[#1a1a1e] border border-gray-800/50 rounded-xl p-4 text-center">
                      <div className="flex justify-center mb-2">{icons[i] || icons[0]}</div>
                      <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">{key}</div>
                      <div className="text-white font-black text-lg">{value}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Price Box */}
            <div className="bg-[#1a1a1e] border border-gray-800/50 rounded-2xl p-6">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-gray-400 text-sm mb-1">{hasPromo ? 'ราคาโปรโมชั่น' : 'ราคา'}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">{displayPrice.toLocaleString()}</span>
                    <span className="text-red-500 font-bold text-lg">฿</span>
                  </div>
                  {hasPromo && (
                    <div className="text-gray-600 text-sm line-through mt-1">ปกติ {product.basePrice.toLocaleString()} ฿</div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {product.stock > 0 ? (
                    <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      ✓ สินค้าพร้อมจำหน่าย
                    </span>
                  ) : (
                    <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold px-3 py-1.5 rounded-lg">
                      สินค้าหมด
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {/* Affiliate / Contact */}
              {product.affiliateLink ? (
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_0_rgba(219,43,43,0.39)] hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  ติดต่อสอบถาม / สั่งซื้อ
                </a>
              ) : (
                <button className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_0_rgba(219,43,43,0.39)] hover:-translate-y-0.5">
                  <MessageCircle className="w-5 h-5" />
                  ติดต่อสอบถาม / สั่งซื้อ
                </button>
              )}

              {/* Compare */}
              <button 
                onClick={() => {
                  if (!isInCompare(product.id)) {
                    addToCompare(product);
                  }
                }}
                className={`border font-bold rounded-xl px-5 py-4 flex items-center gap-2 transition-all hover:-translate-y-0.5 ${
                  isInCompare(product.id)
                    ? 'bg-green-600/20 border-green-500/50 text-green-400'
                    : 'bg-[#1a1a1e] border-gray-700 hover:border-gray-500 text-white'
                }`}
              >
                {isInCompare(product.id) ? <Check className="w-5 h-5" /> : <ArrowLeftRight className="w-5 h-5" />}
                {isInCompare(product.id) ? 'เพิ่มแล้ว' : 'เปรียบเทียบ'}
              </button>

              {/* Favourite Heart */}
              <button
                onClick={toggleFav}
                disabled={favLoading}
                className={`rounded-xl px-4 py-4 flex items-center justify-center transition-all hover:-translate-y-0.5 border ${
                  isFav
                    ? 'bg-red-600/20 border-red-500/50 text-red-500'
                    : 'bg-[#1a1a1e] border-gray-700 hover:border-gray-500 text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* ============ TECHNICAL SPECIFICATIONS ============ */}
            {specsEntries.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-300 mb-4 border-b border-gray-800 pb-3">
                  Technical Specifications
                </h3>
                <div className="space-y-0">
                  {specsEntries.map(([key, value], i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-2 gap-4 py-3 text-sm ${i !== specsEntries.length - 1 ? 'border-b border-gray-800/50' : ''}`}
                    >
                      <span className="text-gray-500 font-medium">{key}</span>
                      <span className="text-white font-bold text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==================== COMPARE PRICES SECTION ==================== */}
        {product.prices && product.prices.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-white mb-2">Compare Prices</h2>
            <p className="text-gray-500 text-sm mb-8">
              Find the best deal from {product.prices.length} verified retailer{product.prices.length > 1 ? 's' : ''}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.prices.map((price) => (
                <div
                  key={price.id}
                  className="bg-[#1a1a1e] border border-red-900/30 rounded-xl p-5 flex flex-col gap-3 hover:border-red-600/50 transition-all hover:-translate-y-0.5"
                >
                  {/* Store Name & Price */}
                  <div className="flex items-start justify-between">
                    <h4 className="text-white font-bold text-lg">{price.store?.name || 'ร้านค้า'}</h4>
                    <span className="text-green-400 font-black text-lg">
                      ฿{price.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Rating & Stock */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-400 text-sm font-bold">{price.store?.reliabilityScore?.toFixed(1) || 'N/A'}</span>
                    </div>
                    <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold px-2 py-0.5 rounded">
                      In Stock
                    </span>
                  </div>

                  {/* Visit Store Button */}
                  <a
                    href={price.productURL || price.store?.websiteBaseURL || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg py-3 flex items-center justify-center gap-2 transition-all text-sm"
                  >
                    Visit Store
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <CompareBar />
      <Footer />
    </div>
  );
}
