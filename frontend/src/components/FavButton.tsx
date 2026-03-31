import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

interface FavButtonProps {
  productId: number;
}

export default function FavButton({ productId }: FavButtonProps) {
  const { user } = useAuth();
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const checkFav = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/fav`, { credentials: 'include' });
        if (res.ok) {
          const favs = await res.json();
          if (Array.isArray(favs)) {
            // Support both camelCase and snake_case from API
            setIsFav(favs.some((f: any) => (f.product_id || f.productId) === productId));
          }

        }
      } catch (err) {
        console.error(err);
      }
    };
    checkFav();
  }, [user, productId]);

  const toggleFav = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert('กรุณาเข้าสู่ระบบก่อนเพื่อกดถูกใจ');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/fav`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        const data = await res.json();
        setIsFav(data.status === 'added');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFav}
      disabled={loading}
      className={`absolute top-4 right-4 z-20 p-2.5 rounded-full transition-all duration-500 backdrop-blur-md border ${
        isFav
          ? 'bg-rose-500 text-white shadow-[0_4px_20px_rgba(244,63,94,0.4)] border-rose-400 scale-110'
          : 'bg-white/10 text-white/70 border-white/10 hover:bg-rose-500/80 hover:text-white hover:border-rose-400/50 hover:scale-110 hover:shadow-lg hover:shadow-rose-500/20'
      }`}
    >
      <Heart className={`w-5 h-5 transition-all duration-300 ${isFav ? 'fill-current scale-110' : 'group-hover:scale-110'} ${loading ? 'animate-pulse' : ''}`} />
    </button>

  );
}
