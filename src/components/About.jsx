import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-24 relative t-bg-alt">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-red-500 font-medium">About Us</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-4 sm:mb-6">Your Trusted Partner in <span className="italic text-red-500">Pre-Owned</span> Cars</h2>
          <p className="t2 font-light leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
            At <span className="brand-name text-sm sm:text-base text-red-500">GAUTAM</span> Automobile, Jind, we believe that everyone deserves a reliable vehicle without breaking the bank.
          </p>
          <p className="t2 font-light leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base">
            Every vehicle undergoes a rigorous 150-point inspection. We don't just sell cars — we build lasting relationships based on trust and transparency.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-left">
            {[
              { icon: 'shield-check', title: 'Certified Quality', desc: '150-point inspection' },
              { icon: 'receipt', title: 'Transparent Pricing', desc: 'No hidden charges or fees' },
              { icon: 'headphones', title: 'After-Sale Support', desc: "We're here even after you buy" },
              { icon: 'repeat', title: 'Easy Exchange', desc: 'Trade-in your old vehicle' }
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg t-red flex items-center justify-center flex-shrink-0">
                  <iconify-icon icon={`lucide:${item.icon}`} width="20" className="text-red-500"></iconify-icon>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">{item.title}</h4>
                  <p className="text-[11px] sm:text-[12px] t3 font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 sm:mt-10">
            <a href="#contact" className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 text-sm font-medium transition-colors">
              Learn More About Us <iconify-icon icon="lucide:arrow-right" width="16"></iconify-icon>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
