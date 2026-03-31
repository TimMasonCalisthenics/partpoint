import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
        const res = await fetch('http://localhost:8080/fav', { credentials: 'include' });
        if (res.ok) {
          const favs = await res.json();
          if (Array.isArray(favs)) {
            setIsFav(favs.some((f: { productId: number }) => f.productId === productId));
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
      const res = await fetch('http://localhost:8080/fav', {
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
      className={`absolute top-3 right-3 z-20 p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm ${
        isFav
          ? 'bg-red-600/90 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] scale-110'
          : 'bg-black/50 text-gray-300 hover:bg-red-600/70 hover:text-white hover:scale-110'
      }`}
    >
      <Heart className={`w-5 h-5 transition-all ${isFav ? 'fill-current' : ''} ${loading ? 'animate-pulse' : ''}`} />
    </button>
  );
}
