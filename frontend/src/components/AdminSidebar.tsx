import { Link, useLocation } from 'react-router-dom';
import { Package, LayoutDashboard, Users, Settings, LogOut, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';

export default function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'จัดการสินค้า', icon: Package, path: '/admin/products' },
    { name: 'ผู้ใช้งาน', icon: Users, path: '/admin/users' },
    { name: 'ตั้งค่า', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-[#121212] flex flex-col h-screen border-r border-gray-800 flex-shrink-0">
      <div className="p-6 border-b border-gray-800 flex items-center justify-center">
        <Logo />
      </div>

      <nav className="flex-grow py-6 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-red-600/10 text-red-500 border border-red-600/20' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link to="/" target="_blank" className="flex items-center gap-3 px-4 py-3 w-full text-blue-400 hover:bg-blue-600/10 hover:text-blue-300 rounded-lg transition-colors border border-transparent hover:border-blue-600/20">
          <ExternalLink className="w-5 h-5" />
          <span className="font-medium">กลับสู่หน้าร้าน</span>
        </Link>
        <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:bg-red-600/10 hover:text-red-500 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  );
}
