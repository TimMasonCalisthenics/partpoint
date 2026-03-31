import { type ReactNode, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL, normalizeImageUrl } from '../config';
import { useAuth } from '../context/AuthContext';
import { Heart, User, Shield, Trash2, ExternalLink, ArrowLeft } from 'lucide-react';




interface ProfileData {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface FavouriteItem {
  fav_id: number;
  product_id: number;
  name: string;
  description: string;
  imageURL: string;
  brand?: string;
  model?: string;
  year?: number;
}

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'favorites' | 'profile' | 'security'>('favorites');

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [favorites, setFavorites] = useState<FavouriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [profileForm, setProfileForm] = useState({ username: '', email: '' });
  const [securityForm, setSecurityForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    if (!user) return;
    Promise.all([fetchProfile(), fetchFavorites()]).finally(() => setLoading(false));
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/profile`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลโปรไฟล์ได้');
      const data = await res.json();
      setProfile(data);
      setProfileForm({ username: data.username || '', email: data.email || '' });
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาดในการโหลดข้อมูลโปรไฟล์');
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/fav`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('ไม่สามารถโหลดรายการโปรดได้');
      const data = await res.json();
      setFavorites(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาดในการโหลดรายการโปรด');
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    if (!profile) return;
    if (profileForm.username === profile.username && profileForm.email === profile.email) {
      setMessage('ไม่มีการเปลี่ยนแปลงที่จะบันทึก');
      return;
    }

    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: profileForm.username, email: profileForm.email }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'อัปเดตโปรไฟล์ล้มเหลว');
      }
      setMessage('บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว');
      await fetchProfile();
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : 'อัปเดตโปรไฟล์ล้มเหลว');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setSaving(true);
    setMessage(null);
    setError(null);

    if (securityForm.newPassword !== securityForm.confirmPassword) {
      setError('รหัสผ่านใหม่ทั้งสองครั้งไม่ตรงกัน');
      setSaving(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: securityForm.currentPassword,
          newPassword: securityForm.newPassword,
        }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'เปลี่ยนรหัสผ่านล้มเหลว');
      }
      setMessage('เปลี่ยนรหัสผ่านเรียบร้อยแล้ว');
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : 'เปลี่ยนรหัสผ่านล้มเหลว');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveFavorite = async (productId: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/fav`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) throw new Error('ลบรายการโปรดล้มเหลว');
      setFavorites(prev => prev.filter(item => item.product_id !== productId));
    } catch (err) {
      console.error(err);
      setError('ลบรายการโปรดล้มเหลว');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-white">
        <h1 className="text-3xl font-bold mb-4">ต้องเข้าสู่ระบบก่อน</h1>
        <p className="text-gray-300">เพื่อดูหน้าโปรไฟล์และรายการโปรดของคุณ</p>
      </div>
    );
  }

  const tabs: Array<{ key: 'favorites' | 'profile' | 'security'; label: string; icon: ReactNode }> = [
    { key: 'favorites', label: 'รายการโปรด', icon: <Heart className="w-4 h-4" /> },
    { key: 'profile', label: 'ข้อมูลส่วนตัว', icon: <User className="w-4 h-4" /> },
    { key: 'security', label: 'ความปลอดภัย', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 blur-[150px] rounded-full -mr-96 -mt-96 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand/5 blur-[150px] rounded-full -ml-96 -mb-96 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-10 text-white relative z-10 flex-grow">

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6 rounded-[2rem] border border-surface-800 bg-surface-900/50 backdrop-blur-xl p-6 shadow-2xl shadow-black/50">

          <div className="flex items-center gap-4 mb-4">
            <div className="rounded-full bg-brand p-4 text-white shadow-lg shadow-brand/20">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">MEMBER AREA</p>
              <h2 className="text-lg font-black text-white uppercase italic tracking-tighter">{user.username || user.email.split('@')[0] || 'USER'}</h2>
            </div>

          </div>



          <div className="space-y-3">
            {tabs.map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center justify-between rounded-2xl px-4 py-3.5 text-left transition-all duration-300 ${
                  activeTab === tab.key 
                    ? 'bg-brand/10 border border-brand/30 text-brand shadow-lg shadow-brand/5' 
                    : 'border border-surface-800 bg-surface-900/40 text-slate-400 hover:border-brand/40 hover:bg-surface-800 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={activeTab === tab.key ? 'text-brand' : 'text-slate-500'}>{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </span>
                {activeTab === tab.key && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-light bg-brand/20 px-2 py-0.5 rounded-full">กำลังดู</span>
                )}
              </button>
            ))}
          </div>


          <div className="rounded-3xl border border-surface-800 bg-surface-950/50 p-5 shadow-inner">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-3 font-bold">สถานะผู้ใช้</p>
            <p className="text-sm text-slate-400">Role: <span className="font-bold text-brand uppercase italic">{profile?.role || user.role || 'Member'}</span></p>
            <p className="text-sm text-slate-400 mt-1">Email: <span className="font-semibold text-white truncate block">{profile?.email || user.email}</span></p>
          </div>

        </aside>

        <main className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
               <button 
                 onClick={() => navigate(-1)}
                 className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors group w-fit"
               >
                 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                 <span>ย้อนกลับ</span>
               </button>
               <div>
                 <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-1">
                   {activeTab === 'favorites' ? 'MY FAVORITES' : activeTab === 'profile' ? 'PROFILE' : 'SECURITY'}
                 </h1>
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-500">Account ID: <span className="text-slate-300">{user.username || user.id}</span></span>
                    <span className="text-slate-700">•</span>
                    <span className="text-brand">Status: {profile?.role || user.role || 'Member'}</span>
                 </div>
               </div>
            </div>

            
            <div className="hidden md:flex items-center gap-2 bg-surface-900/50 p-2 pr-6 rounded-full border border-surface-800 shadow-xl group">
               <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center font-bold text-white shadow-lg shadow-brand/20 group-hover:scale-105 transition-transform duration-500">
                  {(user.username || user.email || 'U').substring(0, 2).toUpperCase()}
               </div>
               <div className="flex flex-col">
                  <p className="text-xs font-black text-white leading-tight uppercase italic tracking-wider">{user.username || user.email.split('@')[0] || user.id}</p>
                  <p className="text-[10px] text-emerald-500 font-bold animate-pulse inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Online Now
                  </p>
               </div>
            </div>


          </div>



          {message && <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-200">{message}</div>}
          {error && <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</div>}

          {activeTab === 'favorites' && (
            <section className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-surface-800 bg-surface-900 p-8 group hover:border-brand/40 transition-colors shadow-lg">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">สินค้าทั้งหมด</p>
                  <p className="mt-2 text-5xl font-black text-white group-hover:text-brand transition-colors">{favorites.length}</p>
                </div>
                <div className="rounded-3xl border border-surface-800 bg-surface-900 p-8 group hover:border-brand/40 transition-colors shadow-lg">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">สมาชิก</p>
                  <p className="mt-2 text-5xl font-black text-white group-hover:text-brand transition-colors truncate">{user.username || user.email.split('@')[0]}</p>
                </div>

              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {loading ? (
                  <div className="col-span-full rounded-3xl border border-gray-800 bg-[#101012] p-8 text-center text-gray-400">Loading...</div>
                ) : favorites.length === 0 ? (
                  <div className="col-span-full rounded-3xl border border-dashed border-gray-700 bg-[#101012] p-8 text-center text-gray-400">ยังไม่มีรายการโปรด</div>
                ) : (
                  favorites.map(item => (
                    <div key={item.product_id} className="rounded-3xl border border-surface-800 bg-surface-900 flex flex-row overflow-hidden shadow-2xl group hover:border-brand/40 transition-all">
                      <div className="relative w-1/3 aspect-square overflow-hidden bg-black/40 border-r border-surface-800">
                        <img src={normalizeImageUrl(item.imageURL || '')} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between relative">
                        <button type="button" onClick={() => handleRemoveFavorite(item.product_id)} className="absolute top-4 right-4 text-slate-600 hover:text-brand transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-brand font-black italic">{item.brand || 'GENERAL'}</p>
                          <h2 className="text-xl font-black text-white uppercase italic tracking-tighter leading-tight mt-1 group-hover:text-brand transition-colors">{item.name}</h2>
                          <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">SKU: {item.product_id}</p>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                           <div className="text-2xl font-black text-white italic">
                              {/* Price placeholder if available, otherwise just items */}
                              {/* Assuming price might be in metadata or just show currency */}
                              4,550 <span className="text-xs text-slate-500">฿</span>
                           </div>
                           <Link to={`/product/${item.product_id}`} className="p-2 rounded-xl bg-surface-800 text-slate-400 hover:bg-brand hover:text-white transition-all shadow-lg">
                              <ExternalLink className="w-4 h-4" />
                           </Link>
                        </div>
                      </div>
                    </div>
                  ))


                )}
              </div>
            </section>
          )}

          {activeTab === 'profile' && (
            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[2rem] border border-surface-800 bg-surface-900/40 backdrop-blur-md p-8 shadow-xl">
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">ข้อมูลบัญชี</p>
                    <h2 className="mt-2 text-3xl font-black text-white">แก้ไขรายละเอียดส่วนตัว</h2>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-2">
                       <label className="block text-sm font-medium text-slate-400 ml-1">ชื่อผู้ใช้</label>
                       <input
                        value={profileForm.username}
                        onChange={e => setProfileForm(prev => ({ ...prev, username: e.target.value }))}
                        className="w-full rounded-2xl border border-surface-800 bg-surface-950/50 p-4 text-white outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all"
                        placeholder="ชื่อผู้ใช้"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-400 ml-1">อีเมล</label>
                      <input
                        value={profileForm.email}
                        onChange={e => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full rounded-2xl border border-surface-800 bg-surface-950/50 p-4 text-white outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all"
                        placeholder="example@mail.com"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="w-full sm:w-auto rounded-2xl bg-brand px-8 py-4 font-bold text-white shadow-lg shadow-brand/20 hover:shadow-brand/30 hover:bg-brand-light transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูลส่วนตัว'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-800 bg-[#101012] p-8">
                <p className="text-sm text-gray-400">Role: {profile?.role || user.role}</p>
                <p className="mt-3 text-white">คุณสามารถดูข้อมูลส่วนตัวของคุณ และแก้ไขชื่อผู้ใช้หรืออีเมลได้ที่นี่</p>
              </div>
            </section>
          )}

          {activeTab === 'security' && (
            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[2rem] border border-surface-800 bg-surface-900/40 backdrop-blur-md p-8 shadow-xl">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">เปลี่ยนรหัสผ่าน</p>
                    <h2 className="mt-2 text-3xl font-black text-white">รักษาความปลอดภัยบัญชี</h2>
                  </div>
                  <div className="space-y-5 pt-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-400 ml-1">รหัสผ่านปัจจุบัน</label>
                      <input
                        type="password"
                        value={securityForm.currentPassword}
                        onChange={e => setSecurityForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full rounded-2xl border border-surface-800 bg-surface-950/50 p-4 text-white outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-400 ml-1">รหัสผ่านใหม่</label>
                      <input
                        type="password"
                        value={securityForm.newPassword}
                        onChange={e => setSecurityForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full rounded-2xl border border-surface-800 bg-surface-950/50 p-4 text-white outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-400 ml-1">ยืนยันรหัสผ่านใหม่</label>
                      <input
                        type="password"
                        value={securityForm.confirmPassword}
                        onChange={e => setSecurityForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full rounded-2xl border border-surface-800 bg-surface-950/50 p-4 text-white outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleChangePassword}
                      disabled={saving}
                      className="w-full sm:w-auto rounded-2xl bg-brand px-8 py-4 font-bold text-white shadow-lg shadow-brand/20 hover:shadow-brand/30 hover:bg-brand-light transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? 'กำลังอัปเดต...' : 'เปลี่ยนรหัสผ่านใหม่'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-800 bg-[#101012] p-8">
                <p className="text-white">คำแนะนำ</p>
                <ul className="mt-4 space-y-3 text-sm text-gray-400 list-disc list-inside">
                  <li>ใส่รหัสผ่านปัจจุบันก่อนเปลี่ยนรหัสผ่านใหม่</li>
                  <li>รหัสผ่านใหม่ควรมีอย่างน้อย 8 ตัวอักษร</li>
                  <li>ไม่ควรใช้รหัสผ่านซ้ำกับบัญชีอื่น</li>
                </ul>
              </div>
            </section>
          )}
        </main>
      </div>
      </div>
    </div>
  );
}

