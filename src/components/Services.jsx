import React from 'react';
import { motion } from 'framer-motion';

const servicesData = [
  { icon: 'car', title: 'Pre-Owned Car Sales', desc: 'Wide range of certified pre-owned vehicles from all major brands.', link: '#inventory', linkText: 'Browse Cars' },
  { icon: 'banknote', title: 'Easy Financing', desc: 'Hassle-free loan assistance with competitive interest rates.', link: '#contact', linkText: 'Get Pre-Approved' },
  { icon: 'repeat', title: 'Car Exchange', desc: 'Trade in your old vehicle for a better one. Fair valuation, minimum paperwork.', link: '#contact', linkText: 'Get Valuation' },
  { icon: 'file-check', title: 'RC Transfer & RTO', desc: 'Complete RTO documentation, RC transfer, insurance handled by our team.', link: '#contact', linkText: 'Learn More' },
  { icon: 'shield-check', title: 'Warranty & Assurance', desc: 'Select vehicles with extended warranty options.', link: '#contact', linkText: 'Check Coverage' },
  { icon: 'wrench', title: 'Service & Detailing', desc: 'Complete car service, detailing, and polishing before delivery.', link: '#contact', linkText: 'Book Service' }
];

const Services = () => {
  return (
    <section id="services" className="py-16 sm:py-24 relative t-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10 sm:mb-16">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-red-500 font-medium">What We Offer</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-3 sm:mb-4">Our <span className="italic text-red-500">Services</span></h2>
          <p className="t2 font-light max-w-2xl mx-auto text-sm sm:text-base px-2">From buying to financing to maintenance — we've got you covered at every step.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
          {servicesData.map((s, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="group p-6 sm:p-8 rounded-xl t-card transition-all duration-300">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-red-600 flex items-center justify-center mb-4 sm:mb-6 shadow-[0_4px_12px_rgba(220,38,38,0.4)] group-hover:bg-red-500 group-hover:scale-110 transition-all duration-300">
                <iconify-icon icon={`lucide:${s.icon}`} width="24" className="text-white"></iconify-icon>
              </div>
              <h3 className="text-lg sm:text-xl font-medium tracking-tight mb-2 sm:mb-3">{s.title}</h3>
              <p className="t2 font-light text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{s.desc}</p>
              <a href={s.link} className="text-red-500 hover:text-red-400 text-xs sm:text-sm font-medium flex items-center gap-1 transition-colors">
                {s.linkText} <iconify-icon icon="lucide:arrow-right" width="14"></iconify-icon>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
