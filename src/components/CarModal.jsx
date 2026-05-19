import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CarModal = ({ car, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!car) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4" 
        style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="t-card rounded-2xl max-w-lg w-full p-5 sm:p-8 relative max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 t2 hover:t1 transition-colors">
            <iconify-icon icon="lucide:x" width="24"></iconify-icon>
          </button>
          
          <div className="mb-4 sm:mb-6">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-red-500 font-medium">Vehicle Details</span>
            <h3 className="font-serif text-xl sm:text-2xl mt-1">{car.name}</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="t-sub rounded-lg p-3 sm:p-4"><div className="text-[9px] sm:text-[10px] uppercase tracking-widest t3 mb-1">Price</div><div className="text-red-500 font-semibold text-base sm:text-lg">{car.price}</div></div>
            <div className="t-sub rounded-lg p-3 sm:p-4"><div className="text-[9px] sm:text-[10px] uppercase tracking-widest t3 mb-1">Year</div><div className="t1 font-medium text-sm sm:text-base">{car.year}</div></div>
            <div className="t-sub rounded-lg p-3 sm:p-4"><div className="text-[9px] sm:text-[10px] uppercase tracking-widest t3 mb-1">Kilometers</div><div className="t1 font-medium text-sm sm:text-base">{car.km}</div></div>
            <div className="t-sub rounded-lg p-3 sm:p-4"><div className="text-[9px] sm:text-[10px] uppercase tracking-widest t3 mb-1">Fuel Type</div><div className="t1 font-medium text-sm sm:text-base">{car.fuel}</div></div>
            <div className="t-sub rounded-lg p-3 sm:p-4"><div className="text-[9px] sm:text-[10px] uppercase tracking-widest t3 mb-1">Transmission</div><div className="t1 font-medium text-sm sm:text-base">{car.trans}</div></div>
            <div className="t-sub rounded-lg p-3 sm:p-4"><div className="text-[9px] sm:text-[10px] uppercase tracking-widest t3 mb-1">Owner</div><div className="t1 font-medium text-sm sm:text-base">{car.owner}</div></div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:+919354719192" className="flex-1 bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"><iconify-icon icon="lucide:phone" width="16"></iconify-icon> Call Now</a>
            <a href="https://wa.me/919354719192" target="_blank" rel="noreferrer" className="flex-1 bg-green-600 hover:bg-green-500 text-white text-xs sm:text-sm font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"><iconify-icon icon="lucide:message-circle" width="16"></iconify-icon> WhatsApp</a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CarModal;
