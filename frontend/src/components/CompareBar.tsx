import { useCompare } from '../context/CompareContext';
import { ArrowLeftRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompareBar() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();

  if (compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f11]/95 backdrop-blur-xl border-t border-red-900/50 shadow-[0_-4px_30px_rgba(220,38,38,0.15)]">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        
        {/* Compare Items Preview */}
        <div className="flex items-center gap-3 flex-1 overflow-x-auto">
          {compareItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-[#1a1a1e] border border-gray-800 rounded-xl px-3 py-2 flex-shrink-0"
            >
              {item.imageURL && (
                <img src={item.imageURL} alt="" className="w-10 h-10 object-contain rounded bg-white/5 p-0.5" />
              )}
              <span className="text-white text-sm font-medium max-w-[120px] truncate">{item.name}</span>
              <button
                onClick={() => removeFromCompare(item.id)}
                className="text-gray-500 hover:text-red-500 transition-colors ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex items-center justify-center w-[160px] h-[52px] border-2 border-dashed border-gray-700 rounded-xl text-gray-600 text-xs flex-shrink-0"
            >
              + เพิ่มสินค้า
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-gray-400 text-sm font-bold">
            {compareItems.length}/3
          </span>
          <button
            onClick={clearCompare}
            className="text-gray-500 hover:text-red-500 text-sm transition-colors"
          >
            ล้าง
          </button>
          <Link
            to="/compare"
            className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(219,43,43,0.39)]"
          >
            <ArrowLeftRight className="w-4 h-4" />
            เปรียบเทียบเลย
          </Link>
        </div>
      </div>
    </div>
  );
}
