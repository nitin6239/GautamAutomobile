import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t tbd-lt py-10 sm:py-16 t-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-3">
              <img src="https://z-cdn-media.chatglm.cn/files/12075482-158d-4fb7-9660-3765e5ef4468.jpg?auth_key=1879018124-7564de2e83a44c44bb45426ea2a7dc84-0-f49092f13b96252ec677ba34dda9dda5" alt="Logo" className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover border tbd" />
              <div className="flex flex-col">
                <span className="brand-name text-sm sm:text-base">GAUTAM</span>
                <span className="brand-sub text-[8px] sm:text-[9px]">Automobile</span>
              </div>
            </div>
            <p className="brand-tag text-[8px] sm:text-[9px] mb-2">★ REAL VALUE FOR YOUR DREAM DRIVE ★</p>
            <p className="t3 text-xs sm:text-sm font-light">Your trusted destination for quality pre-owned vehicles in Jind.</p>
          </div>
          <div>
            <h4 className="text-[10px] sm:text-[11px] uppercase tracking-widest t3 font-medium mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#home" className="t2 hover:text-red-500 text-xs sm:text-sm font-light transition-colors">Home</a></li>
              <li><a href="#inventory" className="t2 hover:text-red-500 text-xs sm:text-sm font-light transition-colors">Inventory</a></li>
              <li><a href="#about" className="t2 hover:text-red-500 text-xs sm:text-sm font-light transition-colors">About Us</a></li>
              <li><a href="#services" className="t2 hover:text-red-500 text-xs sm:text-sm font-light transition-colors">Services</a></li>
              <li><a href="#contact" className="t2 hover:text-red-500 text-xs sm:text-sm font-light transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] sm:text-[11px] uppercase tracking-widest t3 font-medium mb-3 sm:mb-4">Popular Brands</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="t2 hover:text-red-500 text-xs sm:text-sm font-light transition-colors">Maruti Suzuki</a></li>
              <li><a href="#" className="t2 hover:text-red-500 text-xs sm:text-sm font-light transition-colors">Hyundai</a></li>
              <li><a href="#" className="t2 hover:text-red-500 text-xs sm:text-sm font-light transition-colors">Honda</a></li>
              <li><a href="#" className="t2 hover:text-red-500 text-xs sm:text-sm font-light transition-colors">Tata Motors</a></li>
              <li><a href="#" className="t2 hover:text-red-500 text-xs sm:text-sm font-light transition-colors">Mahindra</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[10px] sm:text-[11px] uppercase tracking-widest t3 font-medium mb-3 sm:mb-4">Contact</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center gap-2 t2 text-xs sm:text-sm font-light"><iconify-icon icon="lucide:phone" width="14" className="text-red-500 flex-shrink-0"></iconify-icon>+91 93547 19192</li>
              <li className="flex items-center gap-2 t2 text-xs sm:text-sm font-light"><iconify-icon icon="lucide:phone" width="14" className="text-red-500 flex-shrink-0"></iconify-icon>+91 85100 53232</li>
              <li className="flex items-center gap-2 t2 text-xs sm:text-sm font-light"><iconify-icon icon="lucide:mail" width="14" className="text-red-500 flex-shrink-0"></iconify-icon>automobilegautam@gmail.com</li>
              <li className="flex items-start gap-2 t2 text-xs sm:text-sm font-light">
                <iconify-icon icon="lucide:map-pin" width="14" className="text-red-500 mt-0.5 flex-shrink-0"></iconify-icon>
                <a 
                  href="https://maps.app.goo.gl/HH77DYgKcZJjGkon7" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-red-500 transition-colors"
                >
                  Jind, Rohtak Road, Near HDB Bank
                </a>
              </li>
              <li><a href="https://www.instagram.com/gautam_automobile_jind?igsh=MWtpeDM2eGZ5Y3V1Zg==" target="_blank" rel="noreferrer" className="flex items-center gap-2 t2 hover:text-pink-500 text-xs sm:text-sm font-light transition-colors"><iconify-icon icon="lucide:instagram" width="14" className="text-pink-500 flex-shrink-0"></iconify-icon>@gautam_automobile_jind</a></li>
              <li><a href="https://www.facebook.com/share/18e2Zsvaza/" target="_blank" rel="noreferrer" className="flex items-center gap-2 t2 hover:text-blue-500 text-xs sm:text-sm font-light transition-colors"><iconify-icon icon="lucide:facebook" width="14" className="text-blue-500 flex-shrink-0"></iconify-icon>Gautam Automobile</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 sm:pt-8 border-t tbd-lt flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="t4 text-[10px] sm:text-[12px] font-light">© 2025 Gautam Automobile. All rights reserved.</p>
          <p className="brand-tag t4 text-[9px] sm:text-[10px]">REAL VALUE FOR YOUR DREAM DRIVE</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
