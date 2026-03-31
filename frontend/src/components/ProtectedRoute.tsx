import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ 
  children, 
  adminOnly = false 
}: { 
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const { user, loading } = useAuth();

  // กำลังโหลดผลเช็ค Login จาก Backend อยู่
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent animate-spin rounded-full"></div>
      </div>
    );
  }

  // ไม่ได้ Login เลยเตะไปหน้า Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // เป็นแอดมินหรือเปล่า? (สำหรับเส้นทางผู้ดูแล)
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // ผ่านรอดหมด ก็ให้โชว์หน้าจอปกติตาม Children
  return children;
}
