import { useEffect, useState } from 'react';
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export type ToastType = 'error' | 'success' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type = 'error', duration = 3500, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setIsVisible(true));

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const iconMap = {
    error: <AlertTriangle className="w-6 h-6 flex-shrink-0" />,
    success: <CheckCircle className="w-6 h-6 flex-shrink-0" />,
    info: <Info className="w-6 h-6 flex-shrink-0" />,
  };

  const colorMap = {
    error: {
      border: 'border-red-500/60',
      bg: 'from-red-900/40 to-red-950/60',
      icon: 'text-red-400',
      glow: 'shadow-[0_0_30px_rgba(239,68,68,0.15)]',
      bar: 'bg-red-500',
    },
    success: {
      border: 'border-green-500/60',
      bg: 'from-green-900/40 to-green-950/60',
      icon: 'text-green-400',
      glow: 'shadow-[0_0_30px_rgba(34,197,94,0.15)]',
      bar: 'bg-green-500',
    },
    info: {
      border: 'border-blue-500/60',
      bg: 'from-blue-900/40 to-blue-950/60',
      icon: 'text-blue-400',
      glow: 'shadow-[0_0_30px_rgba(59,130,246,0.15)]',
      bar: 'bg-blue-500',
    },
  };

  const colors = colorMap[type];

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-start justify-center pt-6">
      <div
        className={`
          pointer-events-auto
          max-w-md w-[90vw]
          bg-gradient-to-br ${colors.bg}
          backdrop-blur-xl
          border ${colors.border}
          rounded-2xl
          px-5 py-4
          ${colors.glow}
          transition-all duration-300 ease-out
          ${isVisible && !isLeaving
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-4 scale-95'
          }
        `}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl overflow-hidden">
          <div
            className={`h-full ${colors.bar} rounded-t-2xl`}
            style={{
              animation: `shrink ${duration}ms linear forwards`,
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className={`${colors.icon}`}>
            {iconMap[type]}
          </div>

          {/* Message */}
          <p className="text-white text-sm font-medium flex-1 leading-relaxed">
            {message}
          </p>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
