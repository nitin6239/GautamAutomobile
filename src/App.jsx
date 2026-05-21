import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Inventory from './components/Inventory';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
// import CarModal from './components/CarModal'; // We don't need this on the home page anymore
import CrazyBackground from './components/CrazyBackground';
import PremiumCarDetail from './components/PremiumCarDetail';
import { CAR_DATA } from './data';

// --- Home Page Component ---
// Removed setSelectedCar prop since we aren't using the modal here anymore
function HomePage() { 
  const [theme, setTheme] = useState(localStorage.getItem('gautam-theme') || 'dark');
  const [toastMsg, setToastMsg] = useState('');
  
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('gautam-theme', theme);
  }, [theme]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [themeWipe, setThemeWipe] = useState(null);

  const toggleTheme = () => {
    if (themeWipe) return;
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setThemeWipe(nextTheme);
    
    setTimeout(() => {
      setTheme(nextTheme);
    }, 1200);
    
    setTimeout(() => {
      setThemeWipe(null);
    }, 1600);
  };

  return (
    <>
      <CrazyBackground />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left"
        style={{ scaleX, zIndex: 100000 }}
      />

      <AnimatePresence>
        {themeWipe && (
          <motion.div
            initial={{ x: themeWipe === 'dark' ? '-100%' : '100%' }}
            animate={{ 
              x: themeWipe === 'dark' 
                ? ['-100%', '-55%', '-45%', '200%'] 
                : ['100%', '55%', '45%', '-200%']
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5, 
              times: [0, 0.35, 0.65, 1],
              ease: ["circOut", "linear", "circIn"]
            }}
            className={`fixed inset-0 z-[99999] pointer-events-none flex items-center ${themeWipe === 'dark' ? 'justify-end' : 'justify-start'}`}
            style={{ width: '150vw' }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: themeWipe === 'dark' ? '#09090b' : '#f5f4f2',
                clipPath: themeWipe === 'dark' 
                  ? 'polygon(0% -200%, 100% 50%, 0% 300%)' 
                  : 'polygon(100% -200%, 0% 50%, 100% 300%)'
              }}
            />

            <div className={`absolute ${themeWipe === 'dark' ? 'right-0 translate-x-[95%]' : 'left-0 -translate-x-[95%]'} flex items-center`}>
              <iconify-icon 
                icon="ph:car-profile-fill" 
                width="160" 
                className="relative z-10"
                style={{ 
                  color: themeWipe === 'dark' ? '#09090b' : '#f5f4f2', 
                  transform: themeWipe === 'dark' ? 'scaleX(1)' : 'scaleX(-1)',
                  filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.3))'
                }}
              ></iconify-icon>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {toastMsg && (
        <div id="toastBox" className="fixed top-24 right-4 sm:right-6 z-[100] flex flex-col gap-3">
          <div className="toast bg-green-600 text-white px-4 sm:px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium max-w-xs sm:max-w-sm">
            <iconify-icon icon="lucide:check-circle" width="18" className="flex-shrink-0"></iconify-icon>
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <Hero theme={theme} />
      
      {/* Pass CAR_DATA to Inventory */}
      <Inventory cars={CAR_DATA} /> 
      
      <About />
      <Services />
      <WhyChooseUs />
      <Contact showToast={showToast} />
      
      <a href="https://wa.me/919354719192?text=Hi%20Gautam%20Automobile!%20I'm%20interested%20in%20buying%20a%20car." target="_blank" rel="noreferrer" className="wa-float" title="Chat on WhatsApp" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      <Footer />

      {/* CarModal removed from here as we now use a dedicated route for details */}
    </>
  );
}

// --- Main App Component ---
function App() {
  return (
    // ADD basename="/GautamAutomobile/" HERE
    <Router basename="/GautamAutomobile/"> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car/:id" element={<PremiumCarDetail />} />
      </Routes>
    </Router>
  );
}

export default App;