import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

// ประกาศประเภทข้อมูล User
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

const checkAuthStatus = async () => {
    try {
      // 1. ลองดึงจาก localStorage ก่อนเลย (เพื่อความชัวร์และไว)
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      // 2. ดึงข้อมูล Profile จาก Backend เพื่อยืนยันอีกรอบ
      const res = await fetch(`${API_BASE_URL}/profile`, {
        credentials: 'include',
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data)); // อัปเดต localStorage ให้ตรงกัน
      } else {
        // ถ้า Backend บอกว่าไม่ผ่าน ให้เคลียร์ทิ้ง
        setUser(null);
        localStorage.removeItem('user');
      }
    } catch (err) {
      console.error('Error checking auth:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData: User) => {
    // เซฟลง localStorage ตอนล็อกอินสำเร็จ
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      // สั่งให้ Backend ลบ cookie ทิ้ง
      await fetch(`${API_BASE_URL}/logout`, { 
        method: 'POST', 
        credentials: 'include' 
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    // เคลียร์ค่าทั้งหมดตอนกดออก
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};