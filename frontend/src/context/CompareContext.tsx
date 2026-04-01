import { createContext, useContext, useState, type ReactNode } from 'react';
import Toast, { type ToastType } from '../components/Toast';

interface CompareProduct {
  id: number;
  sku: string;
  name: string;
  brand: string;
  description: string;
  imageURL: string;
  specifications: string;
  tags: string;
  basePrice: number;
  promoPrice: number;
  stock: number;
  affiliateLink: string;
  category: string | number;
}

interface CompareContextType {
  compareItems: CompareProduct[];
  addToCompare: (product: CompareProduct) => void;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
  isInCompare: (id: number) => boolean;
}

const CompareContext = createContext<CompareContextType | null>(null);

interface ToastState {
  message: string;
  type: ToastType;
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useState<CompareProduct[]>(() => {
    try {
      const saved = sessionStorage.getItem('pp_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: ToastType = 'error') => {
    setToast({ message, type });
  };

  const saveToStorage = (items: CompareProduct[]) => {
    sessionStorage.setItem('pp_compare', JSON.stringify(items));
  };

  const addToCompare = (product: CompareProduct) => {
    setCompareItems(prev => {
      if (prev.length >= 3) {
        showToast('เปรียบเทียบได้สูงสุด 3 รายการ', 'info');
        return prev;
      }
      if (prev.some(p => p.id === product.id)) {
        return prev;
      }

      // ป้องกันเปรียบเทียบข้ามหมวดหมู่
      if (prev.length > 0 && prev[0].category !== product.category) {
        showToast('ไม่สามารถเปรียบเทียบอะไหล่ต่างประเภทกันได้', 'error');
        return prev;
      }

      const updated = [...prev, product];
      saveToStorage(updated);
      return updated;
    });
  };

  const removeFromCompare = (id: number) => {
    setCompareItems(prev => {
      const updated = prev.filter(p => p.id !== id);
      saveToStorage(updated);
      return updated;
    });
  };

  const clearCompare = () => {
    setCompareItems([]);
    sessionStorage.removeItem('pp_compare');
  };

  const isInCompare = (id: number) => compareItems.some(p => p.id === id);

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}

