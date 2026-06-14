// LiquidGlassNavbar.jsx
// iOS 26-style Liquid Glass Navbar
// Stack: React + Tailwind CSS + Framer Motion
// Usage: Drop this into your existing navbar component

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// ── ICONS (swap with your actual icons / react-icons) ──────────────────────
const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);
const CarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
  </svg>
);
const InfoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);
const WrenchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const NAV_ITEMS = [
  { id: "home",      label: "Home",      icon: HomeIcon },
  { id: "inventory", label: "Inventory", icon: CarIcon },
  { id: "about",     label: "About",     icon: InfoIcon },
  { id: "services",  label: "Services",  icon: WrenchIcon },
  { id: "contact",   label: "Contact",   icon: PhoneIcon },
];

// ── LIQUID GLASS NAVBAR ─────────────────────────────────────────────────────
export default function LiquidGlassNavbar({ isDark = true }) {
  const [active, setActive]       = useState("home");
  const [hovered, setHovered]     = useState(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [isMobile, setIsMobile]   = useState(false);
  const itemRefs                  = useRef({});
  const navRef                    = useRef(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Move pill to active item
  useEffect(() => {
    const key   = hovered ?? active;
    const el    = itemRefs.current[key];
    const nav   = navRef.current;
    if (!el || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect  = el.getBoundingClientRect();
    setPillStyle({
      left:  elRect.left - navRect.left,
      width: elRect.width,
    });
  }, [active, hovered]);

  // ── Theme-aware glass tokens ───────────────────────────────────────────────
  const glass = isDark
    ? {
        // Dark theme — frosted dark glass
        navBg:        "rgba(20, 20, 22, 0.55)",
        navBorder:    "rgba(255,255,255,0.10)",
        navShadow:    "0 8px 32px rgba(0,0,0,0.55), 0 1.5px 0 rgba(255,255,255,0.07) inset",
        pillBg:       "rgba(255,255,255,0.13)",
        pillBorder:   "rgba(255,255,255,0.22)",
        pillShadow:   "0 2px 16px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.15) inset",
        iconDefault:  "rgba(180,180,185,0.75)",
        iconActive:   "#ffffff",
        labelActive:  "#ffffff",
        labelDefault: "rgba(160,160,165,0.7)",
        accentRing:   "rgba(232,35,26,0.7)",   // Gautam red glow
      }
    : {
        // Light theme — frosted white glass (exactly like iOS image)
        navBg:        "rgba(255,255,255,0.55)",
        navBorder:    "rgba(0,0,0,0.08)",
        navShadow:    "0 8px 32px rgba(0,0,0,0.12), 0 1.5px 0 rgba(255,255,255,0.9) inset",
        pillBg:       "rgba(255,255,255,0.80)",
        pillBorder:   "rgba(255,255,255,0.95)",
        pillShadow:   "0 2px 16px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,1) inset",
        iconDefault:  "rgba(80,80,90,0.75)",
        iconActive:   "#111111",
        labelActive:  "#111111",
        labelDefault: "rgba(80,80,90,0.65)",
        accentRing:   "rgba(232,35,26,0.5)",
      };

  // Spring config — makes pill feel liquid/bouncy
  const springCfg = { type: "spring", stiffness: 380, damping: 28, mass: 0.6 };

  return (
    <div
      style={{
        position: "fixed",
        bottom: isMobile ? 20 : "auto",
        top:    isMobile ? "auto" : 20,
        left:   "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: isMobile ? "calc(100vw - 32px)" : "auto",
        maxWidth: 560,
      }}
    >
      {/* ── Outer glow ring (Gautam red accent) ── */}
      <div
        style={{
          position: "absolute",
          inset: -2,
          borderRadius: 999,
          background: "transparent",
          boxShadow: `0 0 0 1.5px ${glass.accentRing}`,
          opacity: 0.5,
          pointerEvents: "none",
          filter: "blur(1px)",
        }}
      />

      {/* ── Main Navbar Pill ── */}
      <motion.nav
        ref={navRef}
        initial={{ y: isMobile ? 80 : -80, opacity: 0, scale: 0.92 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
        style={{
          display:        "flex",
          alignItems:     "center",
          gap:            isMobile ? 0 : 4,
          padding:        isMobile ? "8px 10px" : "8px 12px",
          borderRadius:   999,
          background:     glass.navBg,
          border:         `1px solid ${glass.navBorder}`,
          boxShadow:      glass.navShadow,
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          position:       "relative",
          overflow:       "hidden",
          justifyContent: isMobile ? "space-between" : "flex-start",
        }}
      >
        {/* ── Noise texture overlay (makes it feel like real glass) ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 999,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            pointerEvents: "none",
            opacity: 0.6,
          }}
        />

        {/* ── Liquid highlight — top shimmer (key iOS effect) ── */}
        <div
          style={{
            position: "absolute",
            top: 0, left: "10%", right: "10%",
            height: 1,
            background: isDark
              ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
            borderRadius: 999,
            pointerEvents: "none",
          }}
        />

        {/* ── Animated background pill (liquid morphing) ── */}
        <motion.div
          animate={{ left: pillStyle.left, width: pillStyle.width }}
          transition={springCfg}
          style={{
            position:       "absolute",
            top:            6,
            bottom:         6,
            borderRadius:   999,
            background:     glass.pillBg,
            border:         `1px solid ${glass.pillBorder}`,
            boxShadow:      glass.pillShadow,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            pointerEvents:  "none",
          }}
        />

        {/* ── Nav Items ── */}
        {NAV_ITEMS.map((item) => {
          const isActive  = active  === item.id;
          const isHovered = hovered === item.id;
          const highlight = isActive || isHovered;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              ref={(el) => (itemRefs.current[item.id] = el)}
              onClick={() => setActive(item.id)}
              onHoverStart={() => setHovered(item.id)}
              onHoverEnd={() => setHovered(null)}
              whileTap={{ scale: 0.88 }}
              style={{
                position:        "relative",
                display:         "flex",
                flexDirection:   "column",
                alignItems:      "center",
                justifyContent:  "center",
                gap:             3,
                padding:         isMobile ? "8px 14px" : "8px 18px",
                borderRadius:    999,
                border:          "none",
                background:      "transparent",
                cursor:          "pointer",
                outline:         "none",
                flex:            isMobile ? 1 : "none",
                minWidth:        isMobile ? 0 : 72,
                zIndex:          1,
              }}
            >
              {/* Icon */}
              <motion.div
                animate={{
                  color:  highlight ? glass.iconActive : glass.iconDefault,
                  scale:  isActive ? 1.12 : 1,
                  y:      isActive ? -1 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ lineHeight: 0 }}
              >
                <Icon />
              </motion.div>

              {/* Label */}
              <motion.span
                animate={{
                  color:      highlight ? glass.labelActive  : glass.labelDefault,
                  fontWeight: isActive  ? 600 : 400,
                  opacity:    highlight ? 1 : 0.75,
                }}
                transition={{ duration: 0.18 }}
                style={{
                  fontSize:      10,
                  letterSpacing: "0.02em",
                  fontFamily:    "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                  lineHeight:    1,
                  whiteSpace:    "nowrap",
                }}
              >
                {item.label}
              </motion.span>

              {/* Active dot indicator */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    style={{
                      position:     "absolute",
                      bottom:       2,
                      left:         "50%",
                      transform:    "translateX(-50%)",
                      width:        4,
                      height:       4,
                      borderRadius: "50%",
                      background:   "#E8231A",
                      boxShadow:    "0 0 6px rgba(232,35,26,0.8)",
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </motion.nav>
    </div>
  );
}


// ── HOW TO USE IN YOUR APP ──────────────────────────────────────────────────
//
// 1. Install framer-motion if not already:
//    npm install framer-motion
//
// 2. In your App.jsx or Layout.jsx:
//
//    import LiquidGlassNavbar from "./LiquidGlassNavbar";
//
//    function App() {
//      const [isDark, setIsDark] = useState(true);
//      return (
//        <>
//          <LiquidGlassNavbar isDark={isDark} />
//          {/* rest of your app */}
//        </>
//      );
//    }
//
// 3. Tailwind note: This component uses inline styles for the glass
//    effect (backdropFilter, boxShadow etc.) because Tailwind doesn't
//    support arbitrary backdrop-filter values well. No extra Tailwind
//    config needed.
//
// 4. For theme toggle, pass isDark={yourThemeState} as prop.
//    The navbar automatically switches between dark glass & white glass.
//
// 5. Replace NAV_ITEMS icons with your actual react-icons:
//    import { FiHome } from "react-icons/fi";
//    { id: "home", label: "Home", icon: () => <FiHome size={22}/> }
