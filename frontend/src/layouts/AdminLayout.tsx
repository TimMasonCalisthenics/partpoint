import React from 'react';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto w-full relative">
        {children}
      </main>
    </div>
  );
}
