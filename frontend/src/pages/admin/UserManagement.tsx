import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { API_BASE_URL } from '../../config';
import { 
  Users, 
  Search, 
  Shield, 
  ShieldAlert, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  Mail
} from 'lucide-react';

interface User {
  id: number;
  email: string;
  role: string;
  isEnabled: boolean;
  createdAt: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`, { 
        credentials: 'include' 
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (id: number, newRole: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${id}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
        credentials: 'include'
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isEnabled: !currentStatus }),
        credentials: 'include'
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-8 pb-24 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter flex items-center gap-3">
              <Users className="w-8 h-8 text-red-600" />
              จัดการผู้ใช้งาน
            </h1>
            <p className="text-gray-500 font-medium">จัดการระดับสิทธิ์และการเข้าถึงระบบของสมาชิกทั้งหมด</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-[#121214] p-4 rounded-t-3xl border border-gray-800 flex justify-between items-center">
            <div className="relative w-full max-w-md">
                <input 
                  type="text" 
                  placeholder="ค้นหาด้วยอีเมลผู้ใช้งาน..." 
                  className="w-full bg-[#1a1a1e] border border-gray-700 text-white rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:border-red-600 transition-colors placeholder-gray-600 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
            <div className="text-gray-500 text-xs font-bold uppercase tracking-widest hidden md:block">
                ทั้งหมด {filteredUsers.length} บัญชี
            </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#121214] border border-gray-800 border-t-0 rounded-b-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#1a1a1e]/50 border-b border-gray-800">
                <th className="px-6 py-5 text-xs font-black text-gray-500 uppercase tracking-widest">ข้อมูลผู้ใช้</th>
                <th className="px-6 py-5 text-xs font-black text-gray-500 uppercase tracking-widest">ระดับสิทธิ์</th>
                <th className="px-6 py-5 text-xs font-black text-gray-500 uppercase tracking-widest text-center">สถานะ</th>
                <th className="px-6 py-5 text-xs font-black text-gray-500 uppercase tracking-widest">วันที่สมัคร</th>
                <th className="px-6 py-5 text-xs font-black text-gray-500 uppercase tracking-widest text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/30">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 flex items-center justify-center text-white font-bold">
                           {user.email[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white font-bold flex items-center gap-2">
                             {user.email}
                             {user.role === 'admin' && <Shield className="w-3.5 h-3.5 text-red-500" />}
                          </div>
                          <div className="text-gray-500 text-[10px] uppercase font-black tracking-widest">User ID: PP-{user.id.toString().padStart(4, '0')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                       <select 
                         value={user.role} 
                         onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                         className={`bg-gray-800/50 border border-gray-700 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none transition-colors ${user.role === 'admin' ? 'text-red-500 border-red-900/30' : 'text-gray-300'}`}
                       >
                         <option value="user">User (ทั่วไป)</option>
                         <option value="admin">Admin (ผู้ดูแล)</option>
                       </select>
                    </td>
                    <td className="px-6 py-5 text-center">
                       <button 
                         onClick={() => handleToggleStatus(user.id, user.isEnabled)}
                         className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                           user.isEnabled 
                           ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                           : 'bg-red-500/10 text-red-500 border border-red-500/20'
                         }`}
                       >
                         {user.isEnabled ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                         {user.isEnabled ? 'Active' : 'Suspended'}
                       </button>
                    </td>
                    <td className="px-6 py-5">
                       <div className="text-gray-400 text-sm font-medium">
                         {new Date(user.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                       </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                       <div className="flex justify-end gap-2">
                          <button className="text-gray-500 hover:text-white p-2 transition-colors">
                             <MoreVertical className="w-5 h-5" />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-2 opacity-30">
                         <Mail className="w-12 h-12" />
                         <p className="text-lg font-bold">ไม่พบข้อมูลผู้ใช้</p>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
