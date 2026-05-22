import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CAR_DATA } from "../data";
import './PremiumCarDetail.css';

// --- Icons Definition ---
const Icons = {
  ArrowLeft: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  Close: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  WhatsApp: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  ),
  Phone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Calendar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  ),
  Speed: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  ),
  Fuel: () => (
    <iconify-icon 
      icon="lucide:fuel" 
      width="18" 
      style={{ color: '#dc2626' }} 
    ></iconify-icon>
  ),
  Transmission: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  MapPin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
};

const PremiumCarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [activeTab, setActiveTab] = useState('exterior');
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // NEW: State for Lightbox (Image Zoom)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('gautam-theme') || 'dark';
    setCurrentTheme(savedTheme);
    
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  });

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'gautam-theme') {
        const newTheme = e.newValue || 'dark';
        setCurrentTheme(newTheme);
        if (newTheme === 'light') {
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.remove('light');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (!id) return;

    const foundCar = CAR_DATA.find(c => {
      const stringId = String(c.id);
      const slugId = c.slug || c.name.replace(/\s+/g, '-').toLowerCase();
      return stringId === id || slugId === id || c.name.replace(/\s+/g, '-').toLowerCase() === id;
    });

    if (foundCar) {
      setCar(foundCar);
      setCurrentImgIndex(0);
      setActiveTab('exterior');
      window.scrollTo(0, 0);
    } else {
      console.error("Car not found for ID:", id);
      setCar(null);
    }
  }, [id]);

  if (!car) {
    return (
      <div className={`premium-container${currentTheme === 'light' ? ' light' : ''}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>Loading Luxury Experience...</div>
      </div>
    );
  }

  const exteriorImages = car.images || (car.img ? [car.img] : []);
  const interiorImages = car.interiorImages || [];

  const hasInterior = interiorImages.length > 0;
  const currentImages = activeTab === 'exterior'
    ? exteriorImages
    : (hasInterior ? interiorImages : exteriorImages);

  if (currentImages.length === 0) currentImages.push('https://via.placeholder.com/800x600?text=No+Image');

  const totalImages = currentImages.length;
  const currentImage = currentImages[currentImgIndex] || '';

  const nextImage = () => setCurrentImgIndex((prev) => (prev + 1) % totalImages);
  const prevImage = () => setCurrentImgIndex((prev) => (prev - 1 + totalImages) % totalImages);

  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
  };

  const handleBookTestDrive = () => {
    window.location.href = `tel:+91${car.phone || '9354719192'}`;
  };

  const handleWhatsApp = () => {
    const msg = `Hi, I am interested in the ${car.name} listed on Gautam Automobile.`;
    window.open(` https://wa.me/91 ${car.phone || '9354719192'}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const getImgSrc = (src) => {
    if (!src) return '';
    if (src.startsWith('http')) return src;
    return `${import.meta.env.BASE_URL}${src}`;
  };

  // Open Lightbox
  const openLightbox = () => {
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Close Lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  // Handle Back Button Click
  const handleBackClick = () => {
    navigate('/');
    // Wait for navigation then scroll to inventory
    setTimeout(() => {
      const inventorySection = document.getElementById('inventory');
      if (inventorySection) {
        inventorySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className={`premium-container${currentTheme === 'light' ? ' light' : ''}`}>
      <div className="ambient-glow"></div>

      <nav className="premium-nav">
        <button onClick={handleBackClick} className="back-btn">
          <Icons.ArrowLeft /> Back to Inventory
        </button>
        <span className="brand-logo">GAUTAM <span className="accent-text">AUTOMOBILE</span></span>
      </nav>

      <div className="content-grid">
        <div className="gallery-section">
          <div className="gallery-tabs">
            <button
              className={`tab-btn ${activeTab === 'exterior' ? 'active' : ''}`}
              onClick={() => { setActiveTab('exterior'); setCurrentImgIndex(0); }}
            >
              Exterior View
            </button>
            <button
              className={`tab-btn ${activeTab === 'interior' ? 'active' : ''}`}
              onClick={() => { if (hasInterior) { setActiveTab('interior'); setCurrentImgIndex(0); } }}
              disabled={!hasInterior}
              style={{
                opacity: hasInterior ? 1 : 0.5,
                cursor: hasInterior ? 'pointer' : 'not-allowed',
                borderColor: hasInterior && activeTab === 'interior' ? '#dc2626' : 'var(--glass-border)'
              }}
            >
              Interior View {!hasInterior && '(N/A)'}
            </button>
          </div>

          <div className="main-image-wrapper" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <button className="nav-arrow left" onClick={prevImage}><Icons.ArrowLeft /></button>

            <div className="image-frame">
              <img
                src={getImgSrc(currentImage)}
                alt={`${car.name} - ${activeTab}`}
                className="main-car-img"
                onClick={openLightbox} // Add click handler
                style={{ cursor: 'zoom-in' }} // Visual cue
                onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Image+Error'; }}
              />
              <div className="img-counter">{currentImgIndex + 1} / {totalImages}</div>
            </div>

            <button className="nav-arrow right" onClick={nextImage}><Icons.ArrowRight /></button>
          </div>

          <div className="thumbnail-strip">
            {currentImages.slice(0, 6).map((img, idx) => (
              <div
                key={idx}
                className={`thumb ${idx === currentImgIndex ? 'active' : ''}`}
                onClick={() => setCurrentImgIndex(idx)}
              >
                <img src={getImgSrc(img)} alt="thumb" />
              </div>
            ))}
            {totalImages > 6 && <div className="more-indicator">+{totalImages - 6}</div>}
          </div>
        </div>

        <div className="details-section">
          <div className="glass-card">
            <div className="car-header">
              <h1 className="car-title">{car.name}</h1>
              <div className="model-year-badge">{car.year} Model</div>
            </div>

            <div className="specs-grid">
              <div className="spec-item">
                <Icons.Calendar />
                <span>{car.regYear || car.year}</span>
                <small>Reg. Year</small>
              </div>
              <div className="spec-item">
                <Icons.Speed />
                <span>{car.km}</span>
                <small>KM Driven</small>
              </div>
              <div className="spec-item">
                <Icons.Fuel />
                <span>{car.fuel}</span>
                <small>Fuel Type</small>
              </div>
              <div className="spec-item">
                <Icons.Transmission />
                <span>{car.trans}</span>
                <small>Transmission</small>
              </div>
              <div className="spec-item">
                <Icons.User />
                <span>{car.owner || '1st'}</span>
                <small>Ownership</small>
              </div>
              <div className="spec-item">
                <Icons.MapPin />
                <span>{car.rtoCode || 'HR'}</span>
                <small>Location</small>
              </div>
            </div>

            <div className="price-section">
              <div className="price-label">Exclusive Price</div>
              <div className="price-value">{car.price}</div>
              <div className="price-subtext">On-road price inclusive of all charges</div>
            </div>

            <div className="cta-group">
              <button className="btn-primary" onClick={handleBookTestDrive}>
                Book Free Test Drive
              </button>

              <div className="floating-actions">
                <button className="btn-whatsapp" onClick={handleWhatsApp}>
                  <Icons.WhatsApp />
                </button>
                <button className="btn-call" onClick={() => window.location.href = `tel:+91${car.phone || '9354719192'}`}>
                  <Icons.Phone />
                </button>
              </div>
            </div>

            <p className="disclaimer">*Price subject to verification. Exclusive offer valid for today.</p>
          </div>
        </div>
      </div>

      {/* --- LIGHTBOX OVERLAY --- */}
      {isLightboxOpen && (
        <div 
          className="lightbox-overlay" 
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '20px',
              right: '30px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              zIndex: 100000
            }}
          >
            <Icons.Close />
          </button>

          {/* Large Image */}
          <img 
            src={getImgSrc(currentImage)} 
            alt="Full Size" 
            style={{
              maxWidth: '90%',
              maxHeight: '90vh',
              objectFit: 'contain',
              boxShadow: '0 0 50px rgba(0,0,0,0.5)',
              borderRadius: '8px',
              animation: 'zoomIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          />
          
          {/* Optional: Navigation in Lightbox */}
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            style={{
              position: 'absolute',
              left: '20px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              padding: '10px',
              borderRadius: '50%',
              cursor: 'pointer',
              backdropFilter: 'blur(5px)'
            }}
          >
            <Icons.ArrowLeft />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            style={{
              position: 'absolute',
              right: '20px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              padding: '10px',
              borderRadius: '50%',
              cursor: 'pointer',
              backdropFilter: 'blur(5px)'
            }}
          >
            <Icons.ArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default PremiumCarDetail;