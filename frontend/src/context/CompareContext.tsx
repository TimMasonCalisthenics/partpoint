import { createContext, useContext, useState, type ReactNode } from 'react';

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
}

interface CompareContextType {
  compareItems: CompareProduct[];
  addToCompare: (product: CompareProduct) => void;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
  isInCompare: (id: number) => boolean;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useState<CompareProduct[]>(() => {
    // โหลดจาก sessionStorage (เก็บได้ตลอด tab เดียวกัน)
    try {
      const saved = sessionStorage.getItem('pp_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveToStorage = (items: CompareProduct[]) => {
    sessionStorage.setItem('pp_compare', JSON.stringify(items));
  };

  const addToCompare = (product: CompareProduct) => {
    setCompareItems(prev => {
      if (prev.length >= 3) {
        alert('เปรียบเทียบได้สูงสุด 3 รายการ');
        return prev;
      }
      if (prev.some(p => p.id === product.id)) {
        return prev; // Already exists
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
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
