import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const brandText = "GAUTAM".split("");
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden t-bg" style={{ overflow: 'hidden' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 t-hero-grad"></div>
        <div className="absolute inset-0 t-hero-side"></div>
      </div>
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] md:w-[1000px] h-[400px] sm:h-[700px] md:h-[1000px] rounded-full opacity-60" style={{ y: yBg, background: 'radial-gradient(circle,rgba(220,38,38,0.35) 0%,rgba(220,38,38,0.1) 40%,transparent 70%)', filter: 'blur(80px)' }}></motion.div>
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-16 sm:pt-20">

        
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border t-rbd t-red text-red-500 text-[10px] sm:text-[12px] uppercase tracking-widest font-medium mb-6 sm:mb-8">
            <iconify-icon icon="lucide:star" width="14"></iconify-icon> Trusted Since 2025
          </span>
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-3 sm:mb-4">
          <h1 className="brand-name text-4xl sm:text-5xl md:text-6xl lg:text-7xl brand-glow flex justify-center" style={{ perspective: 1000 }}>
            {brandText.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, type: "spring", damping: 12 }}
                style={{ display: 'inline-block', transformOrigin: 'bottom' }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
          <div className="brand-sub text-sm sm:text-base md:text-lg mt-1 tracking-[0.3em]">AUTOMOBILE</div>
        </motion.div>
        
        <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="brand-tag text-xs sm:text-sm md:text-base mt-2 sm:mt-3 mb-6 sm:mb-8 tracking-[0.15em] sm:tracking-[0.2em]">
          ★ REAL VALUE FOR YOUR DREAM DRIVE ★
        </motion.p>
        
        <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="t2 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
          Discover premium pre-owned vehicles at unbeatable prices. Every car inspected, certified, and ready to hit the road with confidence.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a href="#inventory" className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 uppercase tracking-wider">
            Browse Inventory <iconify-icon icon="lucide:arrow-right" width="18"></iconify-icon>
          </a>
          <a href="#contact" className="w-full sm:w-auto t-ghost-btn text-sm font-semibold px-8 py-4 rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wider">
            <iconify-icon icon="lucide:phone" width="18"></iconify-icon> Schedule Visit
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="grid grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t tbd-lt max-w-xl sm:max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-logo text-red-500 mb-1">50+</div>
            <div className="text-[9px] sm:text-[11px] uppercase tracking-widest t3 font-medium">Cars Sold</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-logo text-red-500 mb-1">100%</div>
            <div className="text-[9px] sm:text-[11px] uppercase tracking-widest t3 font-medium">Certified</div>
            <div className="mt-2"><iconify-icon icon="lucide:chevron-down" width="20" className="text-red-500 float-anim"></iconify-icon></div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-logo text-red-500 mb-1">2025</div>
            <div className="text-[9px] sm:text-[11px] uppercase tracking-widest t3 font-medium">Established</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
