import React from 'react';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-surface-950 text-white overflow-hidden font-sans selection:bg-brand/30">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto w-full relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>


  );
}
