import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const CarModal = ({ car, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [overviewOpen, setOverviewOpen] = useState(true);
  const BASE = import.meta.env.BASE_URL;

  // LocalStorage-backed wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('gautam-wishlist');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    setActiveImg(0); // Reset carousel when a new car is selected
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveImg(i => (i + 1) % (car?.images?.length || 1));
      if (e.key === 'ArrowLeft') setActiveImg(i => (i - 1 + (car?.images?.length || 1)) % (car?.images?.length || 1));
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, car]);

  if (!car) return null;

  const images = car.images || [car.img];
  const src = (img) => img.startsWith('http') ? img : `${BASE}${img}`;
  const isLiked = !!wishlist[car.name];

  const toggleWishlist = (carName, e) => {
    e.stopPropagation();
    const next = { ...wishlist, [carName]: !wishlist[carName] };
    setWishlist(next);
    localStorage.setItem('gautam-wishlist', JSON.stringify(next));
  };

  // Specs array for the Car Overview Accordion
  const specs = [
    { label: 'Reg. Year', value: car.regYear, icon: 'lucide:calendar' },
    { label: 'Fuel Type', value: car.fuel, icon: 'lucide:fuel' },
    { label: 'KM Driven', value: car.km, icon: 'lucide:gauge' },
    { label: 'Transmission', value: car.trans, icon: 'lucide:settings-2' },
    { label: 'Engine Capacity', value: car.engine, icon: 'lucide:cpu' },
    { label: 'Ownership', value: `${car.owner} Owner`, icon: 'lucide:user' },
    { label: 'Make Year', value: car.makeYear, icon: 'lucide:calendar-check' },
    { label: 'Spare Key', value: car.spareKey || 'Yes', icon: 'lucide:key' },
    { label: 'Reg. Number', value: car.regNum || 'HR31**8510', icon: 'lucide:file-text' },
    { label: 'Insurance', value: car.insurance || 'Jan 2027', icon: 'lucide:shield' },
    { label: 'Insurance Type', value: car.insuranceType || 'Comprehensive', icon: 'lucide:clipboard' },
    { label: 'RTO RtoCode', value: car.rtoCode || 'HR-31', icon: 'lucide:map-pin' }
  ];

  // Helper to open WhatsApp for test drive booking
  const handleTestDrive = () => {
    const text = `Hi Gautam Automobile! I am interested in booking a free test drive for the ${car.year} ${car.name}. Details: \n- KM: ${car.km}\n- Fuel: ${car.fuel}\n- Price: ${car.price}`;
    window.open(`https://wa.me/919354719192?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="t-card rounded-2xl max-w-4xl w-full relative overflow-hidden max-h-[92vh] flex flex-col md:grid md:grid-cols-12 gap-0 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Modal Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-40 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 hover:scale-105 active:scale-95 transition-all shadow-lg border border-white/10"
            title="Close details"
          >
            <iconify-icon icon="lucide:x" width="18"></iconify-icon>
          </button>

          {/* LEFT COLUMN: Visuals & accordion specifications (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between overflow-y-auto border-r tbd-lt max-h-[50vh] md:max-h-[92vh]">
            <div>
              {/* Image Carousel */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/20">
                {images.map((img, i) => (
                  <motion.img
                    key={i}
                    src={src(img)}
                    alt={`${car.name} view ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: i === activeImg ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                ))}

                {/* Left/Right carousel arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((activeImg - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/70 flex items-center justify-center active:scale-90 transition-all"
                    >
                      <iconify-icon icon="lucide:chevron-left" width="18"></iconify-icon>
                    </button>
                    <button
                      onClick={() => setActiveImg((activeImg + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/70 flex items-center justify-center active:scale-90 transition-all"
                    >
                      <iconify-icon icon="lucide:chevron-right" width="18"></iconify-icon>
                    </button>
                  </>
                )}

                {/* गौतम प्रमाणित Watermark banner */}
                <div className="absolute bottom-3 left-3 bg-red-600/90 text-white text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-semibold backdrop-blur-sm pointer-events-none border border-red-500/20">
                  ★ Gautam Certified Stock ★
                </div>
              </div>

              {/* Interactive Circle Tabs: Exterior / Interior with rounded thumb images */}
              <div className="flex justify-center gap-8 py-4 bg-bg-alt/30 border-b border-bdr-lt">
                {[
                  { label: 'Exterior', index: 0 },
                  { label: 'Interior', index: 1 }
                ].map((tab) => {
                  const isActive = activeImg === tab.index;
                  const tabImg = images[tab.index] || images[0];
                  return (
                    <button
                      key={tab.label}
                      onClick={() => setActiveImg(tab.index)}
                      className="flex flex-col items-center gap-1 group/tab"
                    >
                      <div className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 ${isActive ? 'border-red-500 scale-105 shadow-md shadow-red-500/20' : 'border-bdr hover:border-red-500/50'}`}>
                        <img src={src(tabImg)} alt={tab.label} className="w-full h-full object-cover" />
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider font-semibold transition-colors ${isActive ? 'text-red-500 font-bold' : 't3 group-hover/tab:text-red-400'}`}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Car Overview Accordion Section */}
              <div className="p-4 sm:p-5">
                <div 
                  className="flex items-center justify-between border-b tbd pb-2 mb-3 cursor-pointer group"
                  onClick={() => setOverviewOpen(!overviewOpen)}
                >
                  <h4 className="text-sm font-semibold tracking-tight uppercase t1 flex items-center gap-1.5">
                    <iconify-icon icon="lucide:info" width="16" className="text-red-500"></iconify-icon>
                    Car Overview
                  </h4>
                  <iconify-icon 
                    icon={overviewOpen ? "lucide:chevron-up" : "lucide:chevron-down"} 
                    width="18" 
                    className="t3 group-hover:text-red-500 transition-colors"
                  ></iconify-icon>
                </div>

                <AnimatePresence initial={false}>
                  {overviewOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 pb-2">
                        {specs.map((spec, i) => (
                          <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg border tbd bg-bg-alt/20">
                            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/10 flex items-center justify-center flex-shrink-0 text-red-500">
                              <iconify-icon icon={spec.icon} width="16"></iconify-icon>
                            </div>
                            <div className="min-w-0">
                              <div className="text-[9px] uppercase tracking-widest t3 font-medium truncate">{spec.label}</div>
                              <div className="text-xs sm:text-sm font-semibold t1 truncate mt-0.5">{spec.value || 'N/A'}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar pricing & CTA panel (5 cols) */}
          <div className="md:col-span-5 p-5 sm:p-6 md:p-8 flex flex-col justify-between bg-bg-alt/10 h-full overflow-y-auto max-h-[42vh] md:max-h-[92vh]">
            <div className="space-y-6">
              
              {/* Brand Label Certified */}
              <div>
                <div className="inline-flex items-center gap-1 bg-red-500/15 border border-red-500/25 text-red-500 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full mb-3">
                  <iconify-icon icon="lucide:award" width="12" className="animate-pulse"></iconify-icon>
                  Gautam Certified Stock
                </div>

                {/* Car Title Header + Heart wishlist icon */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold t1 leading-tight tracking-tight">
                      {car.year} {car.name}
                    </h2>
                  </div>
                  <button
                    onClick={(e) => toggleWishlist(car.name, e)}
                    className="w-9 h-9 rounded-full bg-bg-alt border tbd flex items-center justify-center text-xl transition-all active:scale-90 hover:border-red-500/50 shadow-sm flex-shrink-0"
                    title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <iconify-icon 
                      icon={isLiked ? "ph:heart-fill" : "ph:heart"} 
                      style={{ color: isLiked ? '#ef4444' : 'var(--text-3)' }}
                    ></iconify-icon>
                  </button>
                </div>
              </div>

              {/* Tag capsules row */}
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] sm:text-[11px] t-sub t2 px-2.5 py-1 rounded-full font-light border border-bdr-lt">{car.km}</span>
                <span className="text-[10px] sm:text-[11px] t-sub t2 px-2.5 py-1 rounded-full font-light border border-bdr-lt">{car.owner} Owner</span>
                <span className="text-[10px] sm:text-[11px] t-sub t2 px-2.5 py-1 rounded-full font-light border border-bdr-lt">{car.trans}</span>
                <span className="text-[10px] sm:text-[11px] t-sub t2 px-2.5 py-1 rounded-full font-light border border-bdr-lt">{car.fuel}</span>
                <span className="text-[10px] sm:text-[11px] t-sub t2 px-2.5 py-1 rounded-full font-light border border-bdr-lt uppercase">{car.rtoCode || 'HR-31'}</span>
              </div>

              {/* Showroom Location Bar with Call Us link */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-bdr bg-bg/40 text-xs shadow-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <iconify-icon icon="lucide:map-pin" width="16" className="text-red-500 flex-shrink-0"></iconify-icon>
                  <span className="t2 truncate font-light">{car.location || 'Showroom Address, Jind'}</span>
                </div>
                <a 
                  href="tel:+919354719192" 
                  className="flex items-center gap-1.5 text-red-500 font-semibold hover:text-red-400 flex-shrink-0 transition-colors uppercase tracking-wider text-[10px]"
                >
                  <iconify-icon icon="lucide:phone" width="12" className="text-green-500"></iconify-icon>
                  Call us
                </a>
              </div>

              {/* Certification features badges grid */}
              <div className="grid grid-cols-2 gap-3.5 pt-2 border-t border-bdr-lt">
                <div className="flex items-center gap-2">
                  <iconify-icon icon="ph:shield-check-fill" width="16" className="text-red-500"></iconify-icon>
                  <span className="text-[11px] t2 font-light">Zero Worry Max</span>
                </div>
                <div className="flex items-center gap-2">
                  <iconify-icon icon="ph:clock-clockwise-fill" width="16" className="text-red-500"></iconify-icon>
                  <span className="text-[11px] t2 font-light">7-Day Easy Return</span>
                </div>
                <div className="flex items-center gap-2">
                  <iconify-icon icon="ph:calendar-check-fill" width="16" className="text-red-500"></iconify-icon>
                  <span className="text-[11px] t2 font-light">Lifetime Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <iconify-icon icon="ph:check-circle-fill" width="16" className="text-red-500"></iconify-icon>
                  <span className="text-[11px] t2 font-light">300+ Point Checked</span>
                </div>
              </div>

              {/* Price Details Panel */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-bg-card to-bg-card2 border border-red-500/10 shadow-md">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-widest t3 font-medium">Final Price</span>
                  <button 
                    onClick={() => alert(`Price details for ${car.name}: \n- Original Price: ${car.originalPrice || car.price}\n- Final Price: ${car.price}\n- Other Charges: Included\n- Zero Hidden Fees!`)}
                    className="text-[10px] uppercase tracking-wider text-red-500 hover:text-red-400 font-semibold transition-colors"
                  >
                    Price breakup →
                  </button>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-red-500 leading-none">{car.price}</span>
                  {car.originalPrice && (
                    <span className="line-through t4 text-sm sm:text-base font-light">{car.originalPrice}</span>
                  )}
                </div>
                <div className="text-[9px] sm:text-[10px] t3 font-light mt-1 flex items-center gap-1.5">
                  <iconify-icon icon="lucide:check-circle" width="12" className="text-green-500"></iconify-icon>
                  Zero hidden fees + all paperwork handled
                </div>
              </div>

            </div>

            {/* Split CTAs: WhatsApp + Free Test Drive booking */}
            <div className="flex gap-3.5 mt-6 sm:mt-8 pt-4 border-t border-bdr-lt">
              {/* Translucent Green WhatsApp CTA */}
              <button 
                onClick={() => window.open(`https://wa.me/919354719192?text=Hi%20Gautam%20Automobile!%20I'm%20interested%20in%20the%20${car.year}%20${car.name}.`, '_blank')}
                className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm active:scale-95 flex-shrink-0"
                title="Chat on WhatsApp"
              >
                <iconify-icon icon="lucide:message-circle" width="22"></iconify-icon>
              </button>
              
              {/* Massive Orange/Red Book Test Drive CTA */}
              <button 
                onClick={handleTestDrive}
                className="flex-1 h-12 bg-[#dc2626] hover:bg-[#ef4444] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
              >
                <iconify-icon icon="lucide:arrow-right-to-line" width="18"></iconify-icon>
                Book free test drive
              </button>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CarModal;