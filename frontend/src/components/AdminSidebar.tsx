import { Link, useLocation } from 'react-router-dom';
import { Package, LayoutDashboard, Users, LogOut, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';

export default function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'จัดการสินค้า', icon: Package, path: '/admin/products' },
    { name: 'ผู้ใช้งาน', icon: Users, path: '/admin/users' },
    // { name: 'ตั้งค่า', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-surface-900 flex flex-col h-screen border-r border-surface-800 flex-shrink-0 relative z-20">
      <div className="p-8 border-b border-surface-800 flex items-center justify-center">
        <Logo />
      </div>

      <nav className="flex-grow py-8 px-4">
        <ul className="space-y-3">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                    isActive 
                      ? 'bg-brand text-white shadow-xl shadow-brand/20' 
                      : 'text-slate-400 hover:bg-surface-800 hover:text-white border border-transparent'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-light/20 to-transparent pointer-events-none" />
                  )}
                  <item.icon className={`w-5 h-5 transition-transform duration-300 relative z-10 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="font-bold relative z-10 tracking-wide">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-surface-800 space-y-2">
        <Link to="/" target="_blank" className="flex items-center gap-3 px-4 py-3 w-full text-slate-300 hover:bg-white/5 hover:text-white rounded-2xl transition-all border border-transparent hover:border-white/10 group">
          <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-sm">ดูหน้าร้าน</span>
        </Link>
        <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 rounded-2xl transition-all border border-transparent hover:border-rose-500/20 group">
          <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          <span className="font-semibold text-sm">ออกจากระบบ</span>
        </button>
      </div>
    </aside>


  );
}
