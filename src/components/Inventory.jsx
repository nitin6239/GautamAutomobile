import React from 'react';
import { motion } from 'framer-motion';

const Inventory = ({ cars, onCarSelect }) => {
  return (
    <section id="inventory" className="py-16 sm:py-24 relative t-bg">
      <div className="absolute top-0 left-1/4 w-[250px] sm:w-[400px] md:w-[600px] h-[250px] sm:h-[400px] md:h-[600px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle,var(--red-glow) 0%,transparent 70%)', filter: 'blur(64px)' }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10 sm:mb-16">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-red-500 font-medium">Our Collection</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-3 sm:mb-4">Available <span className="italic text-red-500">Stock</span></h2>
          <p className="t2 font-light max-w-2xl mx-auto text-sm sm:text-base px-2">Hand-picked premium pre-owned cars, thoroughly inspected and ready for their next owner.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {cars.map((car, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="car-card group rounded-xl overflow-hidden t-card transition-all duration-300 cursor-pointer"
              onClick={() => onCarSelect(car)}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={car.img} alt={car.name} className="car-img w-full h-full object-cover" />
                <div className="absolute top-3 right-3 t-year-badge text-[9px] sm:text-[10px] uppercase tracking-widest font-medium px-2.5 sm:px-3 py-1 rounded-full">{car.year}</div>
                <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20" style={{ background: 'linear-gradient(to top,var(--bg),transparent)' }}></div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg sm:text-xl font-medium tracking-tight group-hover:text-red-400 transition-colors">{car.name}</h3>
                  <span className="text-red-500 font-semibold text-base sm:text-lg">{car.short}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t tbd-lt">
                  <div className="flex items-center gap-1.5"><iconify-icon icon="lucide:gauge" width="14" className="t3"></iconify-icon><span className="text-[10px] sm:text-[11px] t2">{car.km}</span></div>
                  <div className="flex items-center gap-1.5"><iconify-icon icon="lucide:fuel" width="14" className="t3"></iconify-icon><span className="text-[10px] sm:text-[11px] t2">{car.fuel}</span></div>
                  <div className="flex items-center gap-1.5"><iconify-icon icon="lucide:settings-2" width="14" className="t3"></iconify-icon><span className="text-[10px] sm:text-[11px] t2">{car.trans}</span></div>
                  <div className="flex items-center gap-1.5"><iconify-icon icon="lucide:user" width="14" className="t3"></iconify-icon><span className="text-[10px] sm:text-[11px] t2">{car.owner}</span></div>
                </div>
                <button className="w-full mt-4 sm:mt-5 t-ghost-btn text-xs sm:text-sm font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2">
                  View Details <iconify-icon icon="lucide:arrow-right" width="16"></iconify-icon>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inventory;
