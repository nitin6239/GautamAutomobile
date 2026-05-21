"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";

const ZapIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default function GlassButtonDemo() {
  const containerRef = useRef(null);
  const buttonWrapperRef = useRef(null);

  // Framer motion values for the cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Apply a smooth spring physics effect to the cursor following
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Center the button initially
    if (containerRef.current && buttonWrapperRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = buttonWrapperRef.current.getBoundingClientRect();
      
      cursorX.set(containerRect.width / 2 - buttonRect.width / 2);
      cursorY.set(containerRect.height / 2 - buttonRect.height / 2);
    }

    // Update motion values on mouse move
    const handleMouseMove = (e) => {
      if (!buttonWrapperRef.current) return;
      const buttonRect = buttonWrapperRef.current.getBoundingClientRect();
      
      // Offset by half the button's width/height to center it exactly on the cursor
      cursorX.set(e.clientX - buttonRect.width / 2);
      cursorY.set(e.clientY - buttonRect.height / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <div 
      ref={containerRef}
      className="relative flex h-screen w-full overflow-hidden bg-black"
    >
      {/* Vibrant Background Image for Refraction Testing */}
      <div 
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f0733c36-a64b-4f7c-b06c-3c679f8ddbc1_3840w.webp')` 
        }}
      />

      {/* Floating Liquid Glass Button */}
      <motion.div
        ref={buttonWrapperRef}
        className="absolute left-0 top-0 z-10"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <GlassButton
          size="default"
          contentClassName="flex items-center gap-2"
        >
          <span>Generate</span>
          <ZapIcon className="h-5 w-5" />
        </GlassButton>
      </motion.div>
    </div>
  );
}
