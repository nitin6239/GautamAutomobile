import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Inventory = ({ cars }) => {
  const navigate = useNavigate();
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

  const toggleWishlist = (carName, e) => {
    e.stopPropagation();
    const next = { ...wishlist, [carName]: !wishlist[carName] };
    setWishlist(next);
    localStorage.setItem('gautam-wishlist', JSON.stringify(next));
  };

  const handleCardClick = (car) => {
    const path = car.slug ? `/car/${car.slug}` : `/car/${car.id}`;
    navigate(path);
  };

  // Helper to resolve image paths
  const getImgSrc = (img) => {
    if (!img) return '';
    const cleanImg = img.trim();
    return cleanImg.startsWith('http') ? cleanImg : `${BASE}${cleanImg}`;
  };

  return (
    <section id="inventory" className="py-16 sm:py-24 relative t-bg">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-[250px] sm:w-[400px] md:w-[600px] h-[250px] sm:h-[400px] md:h-[600px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle,var(--red-glow) 0%,transparent 70%)', filter: 'blur(64px)' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10 sm:mb-16">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-red-500 font-medium">Our Collection</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-3 sm:mb-4">Available <span className="italic text-red-500">Stock</span></h2>
          <p className="t2 font-light max-w-2xl mx-auto text-sm sm:text-base px-2">Hand-picked premium pre-owned cars, thoroughly inspected and ready for their next owner.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cars.map((car, index) => {
            const isLiked = !!wishlist[car.name];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="car-card group rounded-xl overflow-hidden t-card cursor-pointer h-full flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/5 relative"
                  onClick={() => handleCardClick(car)}
                >
                  {/* Top image section - Single Static Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-800">
                    {/* Certified stock banner */}
                    <div className="absolute top-3 left-3 bg-red-600 text-white font-semibold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-md z-20 flex items-center gap-1 pointer-events-none">
                      <iconify-icon icon="lucide:award" width="12"></iconify-icon>
                      Gautam Certified
                    </div>

                    {/* Wishlist Heart Icon */}
                    <button
                      onClick={(e) => toggleWishlist(car.name, e)}
                      className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60 active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-md"
                      title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <iconify-icon 
                        icon={isLiked ? "ph:heart-fill" : "ph:heart"} 
                        width="18" 
                        style={{ color: isLiked ? '#ef4444' : '#ffffff' }}
                      ></iconify-icon>
                    </button>

                    {/* Single Static Image */}
                    <img
                      src={getImgSrc(car.img)}
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Brand Label & RTO badge */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-semibold text-red-500 tracking-wider uppercase">Gautam Certified</span>
                        <span className="text-[9px] t-sub t3 px-1.5 py-0.5 rounded border tbd font-medium uppercase">{car.rtoCode || 'HR'} Registration</span>
                      </div>

                      {/* Heading (Year + Name) */}
                      <h3 className="text-base sm:text-lg font-semibold tracking-tight group-hover:text-red-400 transition-colors leading-snug">
                        {car.year} {car.name}
                      </h3>

                      {/* Specs Tags (Sleek Gray Capsules) */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        <span className="text-[10px] sm:text-[11px] t-sub t2 px-2.5 py-1 rounded-full font-light border border-bdr-lt flex items-center gap-1">
                          <iconify-icon icon="lucide:gauge" width="12"></iconify-icon>
                          {car.km}
                        </span>
                        <span className="text-[10px] sm:text-[11px] t-sub t2 px-2.5 py-1 rounded-full font-light border border-bdr-lt flex items-center gap-1">
                          <iconify-icon icon="lucide:fuel" width="12"></iconify-icon>
                          {car.fuel}
                        </span>
                        <span className="text-[10px] sm:text-[11px] t-sub t2 px-2.5 py-1 rounded-full font-light border border-bdr-lt flex items-center gap-1">
                          <iconify-icon icon="lucide:settings-2" width="12"></iconify-icon>
                          {car.trans}
                        </span>
                      </div>
                    </div>

                    {/* Pricing Block - Single Top Border Only with Green Price */}
                    <div className="mt-4 pt-3 pb-3 border-t tbd-lt flex items-center justify-between">
                      <div className="flex items-center">
                        {/* Changed to green color #22c55e */}
                        <span className="text-[#22c55e] font-bold text-lg sm:text-xl">{car.price}</span>
                      </div>
  
                      <button className="t-ghost-btn hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all">
                        Details <iconify-icon icon="lucide:arrow-right" width="14"></iconify-icon>
                      </button>
                    </div>

                    {/* Location Address Footer Bar - REMOVED */}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Inventory;