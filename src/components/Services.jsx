import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Easy Finance',
    desc: 'Hassle-free loan approval with competitive interest rates from trusted banks.',
    icon: 'lucide:wallet'
  },
  {
    title: 'Free Test Drive',
    desc: 'Experience the car before you buy. Schedule a free test drive at your convenience.',
    icon: 'lucide:car'
  },
  {
    title: 'Insurance',
    desc: 'Comprehensive insurance solutions for both new and pre-owned vehicles.',
    icon: 'lucide:shield-check'
  },
  {
    title: 'RC Transfer',
    desc: 'Complete assistance with RC transfer paperwork and legal formalities.',
    icon: 'lucide:file-text'
  },
  {
    title: '24/7 Support',
    desc: 'Round the clock customer support for all your post-purchase queries.',
    icon: 'lucide:headphones'
  },
  {
    title: 'Quality Check',
    desc: '150-point inspection checklist to ensure premium quality standards.',
    icon: 'lucide:check-circle'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-16 sm:py-24 relative t-bg">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle,var(--red-glow) 0%,transparent 70%)', filter: 'blur(80px)' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-red-500 font-medium">What We Offer</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3 mb-4">Premium <span className="italic text-red-500">Services</span></h2>
          <p className="t2 font-light max-w-2xl mx-auto text-sm sm:text-base">Beyond just selling cars, we provide end-to-end solutions for a seamless ownership experience.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 sm:p-8 rounded-xl t-card transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/5 hover:-translate-y-1 flex flex-col items-start"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-red-500/10 flex items-center justify-center mb-5 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 text-red-500">
                <iconify-icon icon={item.icon} width="24"></iconify-icon>
              </div>
              
              <h3 className="text-lg sm:text-xl font-semibold mb-3 t-heading">{item.title}</h3>
              <p className="t2 text-sm sm:text-base font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;