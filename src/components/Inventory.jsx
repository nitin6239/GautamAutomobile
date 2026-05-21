import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Image carousel inside each car card
const CarImageCarousel = ({ images, name, BASE }) => {
  const [active, setActive] = useState(0);

  const src = (img) =>
    img.startsWith('http') ? img : `${BASE}${img}`;

  return (
    <div className="relative overflow-hidden aspect-[4/3] group/carousel">
      {/* Images */}
      {images.map((img, i) => (
        <motion.img
          key={i}
          src={src(img)}
          alt={`${name} view ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === active ? 1 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      ))}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setActive(i); }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === active ? 'bg-white scale-125' : 'bg-white/50'}`}
            />
          ))}
        </div>
      )}

      {/* Arrow buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setActive((active - 1 + images.length) % images.length); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-black/70"
          >
            <iconify-icon icon="lucide:chevron-left" width="16"></iconify-icon>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setActive((active + 1) % images.length); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-black/70"
          >
            <iconify-icon icon="lucide:chevron-right" width="16"></iconify-icon>
          </button>
        </>
      )}

      {/* Image counter badge */}
      {images.length > 1 && (
        <div className="absolute top-3 left-3 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
          {active + 1}/{images.length}
        </div>
      )}
    </div>
  );
};

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
                  {/* Top image section with overlays */}
                  <div className="relative">
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

                    {/* Carousel */}
                    <CarImageCarousel
                      images={car.images || [car.img]}
                      name={car.name}
                      BASE={BASE}
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

                    {/* Pricing Block - Single Top Border Only */}
                    <div className="mt-4 pt-3 pb-3 border-t tbd-lt flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-red-500 font-bold text-lg sm:text-xl">{car.price}</span>
                      </div>
  
                      <button className="t-ghost-btn hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all">
                        Details <iconify-icon icon="lucide:arrow-right" width="14"></iconify-icon>
                      </button>
                    </div>

                    {/* Location Address Footer Bar */}
                    <div className="bg-bg-alt/40 border-t tbd-lt px-4 py-2.5 sm:px-5 flex items-center gap-1.5">
                      <iconify-icon icon="lucide:map-pin" width="13" className="text-red-500 flex-shrink-0"></iconify-icon>
                      <span className="text-[10px] sm:text-[11px] t3 font-light truncate">{car.location || 'Near HDB Bank, Jind'}</span>
                    </div>
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