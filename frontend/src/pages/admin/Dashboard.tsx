import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { 
  Users, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Stats {
  totalProducts: number;
  totalUsers: number;
  lowStockCount: number;
  recentProducts: any[];
  lowStockItems: any[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/stats', { 
          credentials: 'include' 
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  // Cards Data
  const kpis = [
    { 
      label: 'สินค้าทั้งหมด', 
      value: stats?.totalProducts || 0, 
      icon: Package, 
      color: 'blue',
      desc: 'รายการในระบบ'
    },
    { 
      label: 'ผู้ใช้งาน', 
      value: stats?.totalUsers || 0, 
      icon: Users, 
      color: 'emerald',
      desc: 'สมาชิกที่สมัครแล้ว'
    },
    { 
      label: 'สินค้าใกล้หมด', 
      value: stats?.lowStockCount || 0, 
      icon: AlertTriangle, 
      color: 'amber',
      desc: 'สต็อกน้อยกว่า 10 ชิ้น'
    },
    { 
      label: 'ความนิยม', 
      value: '94%', 
      icon: TrendingUp, 
      color: 'red',
      desc: 'อัตราการเข้าชม'
    },
  ];

  return (
    <AdminLayout>
      <div className="p-8 pb-20 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">ภาพรวมระบบ (Dashboard)</h1>
          <p className="text-gray-500 font-medium">ยินดีต้อนรับกลับมา, แอดมิน ! ข้อมูลอัปเดตล่าสุด ณ วันนี้</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-[#121214] border border-gray-800/50 rounded-3xl p-6 relative overflow-hidden group">
              {/* Glow Decoration */}
              <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 bg-${kpi.color}-600`}></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-${kpi.color}-500/10 text-${kpi.color}-500`}>
                  <kpi.icon className="w-6 h-6" />
                </div>
              </div>
              
              <div className="relative">
                <div className="text-3xl font-black text-white mb-1">{kpi.value.toLocaleString()}</div>
                <div className="text-gray-400 text-sm font-bold uppercase tracking-wider">{kpi.label}</div>
                <div className="text-gray-600 text-xs mt-3 flex items-center gap-1 font-medium">
                   {kpi.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action & Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Products */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                สินค้าเข้าใหม่ล่าสุด
              </h3>
              <Link to="/admin/products" className="text-red-500 text-sm font-bold flex items-center gap-1 hover:underline">
                ดูทั้งหมด <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-[#121214] border border-gray-800/50 rounded-3xl overflow-hidden shadow-xl">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#1a1a1e]/50 border-b border-gray-800">
                    <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">สินค้า</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">ราคา</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-center">คลัง</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/30">
                  {stats?.recentProducts && stats.recentProducts.length > 0 ? (
                    stats.recentProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-gray-800 overflow-hidden flex-shrink-0">
                               {p.imageURL ? (
                                 <img src={p.imageURL} alt="" className="w-full h-full object-contain p-1" />
                               ) : (
                                 <div className="w-full h-full flex items-center justify-center text-xs text-gray-700">NA</div>
                               )}
                            </div>
                            <div>
                              <div className="text-white font-bold text-sm line-clamp-1">{p.name}</div>
                              <div className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">{p.brand} | {p.sku}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-white font-black text-sm">฿{p.basePrice?.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 text-center text-white">
                          <span className={`px-2 py-1 rounded text-[10px] font-black ${p.stock < 10 ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}>
                             {p.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-600 group-hover:text-red-500 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-gray-600 text-sm italic">ไม่มีรายการสินค้าล่าสุด</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="lg:col-span-4 flex flex-col">
             <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                แจ้งเตือนสต็อกต่ำ
              </h3>
            </div>

            <div className="space-y-4">
              {stats?.lowStockItems && stats.lowStockItems.length > 0 ? (
                stats.lowStockItems.map((p) => (
                  <div key={p.id} className="bg-[#121214] border border-gray-800/50 rounded-2xl p-4 flex items-center gap-4 hover:border-amber-500/30 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col items-center justify-center flex-shrink-0">
                       <span className="text-xs font-black text-amber-500 uppercase">เหลื่อ</span>
                       <span className="text-lg font-black text-amber-500">{p.stock}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="text-white font-bold text-sm truncate">{p.name}</div>
                       <div className="text-gray-500 text-xs truncate">SKU: {p.sku}</div>
                    </div>
                    <Link to="/admin/products" className="p-2 rounded-lg bg-gray-800 text-gray-500 hover:text-white transition-colors">
                       <Edit className="w-4 h-4" />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
                   <div className="text-emerald-500 font-bold mb-1">ยินดีด้วย !</div>
                   <p className="text-emerald-600 text-sm">ไม่มีสินค้าสต็อกต่ำในขณะนี้</p>
                </div>
              )}
              
              {/* Shortcut Card */}
              <div className="mt-4 p-6 rounded-3xl bg-gradient-to-br from-red-600 to-red-800 text-white relative overflow-hidden group shadow-lg shadow-red-900/10">
                 <div className="relative z-10">
                    <h4 className="text-lg font-black mb-1 uppercase tracking-tighter">เพิ่มสินค้าใหม่?</h4>
                    <p className="text-red-100 text-sm mb-4 leading-relaxed opacity-80">มีอะไหล่เข้าใหม่หรือเปล่า? ลงรายการได้ทันทีที่หน้าจัดการ</p>
                    <Link 
                      to="/admin/products" 
                      className="inline-flex items-center gap-2 bg-white text-red-700 px-4 py-2 rounded-xl text-xs font-black uppercase transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      ไปหน้าจัดการ <Plus className="w-4 h-4" />
                    </Link>
                 </div>
                 <Package className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 rotate-12 group-hover:scale-125 transition-transform" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

// Sub-component stub for Edit (since I didn't import it)
function Edit({className}: {className: string}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>
  );
}

function Plus({className}: {className: string}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  );
}
