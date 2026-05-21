import React, { useEffect, useRef } from 'react';

const CrazyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates and magnetic gravity properties
    const mouse = {
      x: width / 2,
      y: height / 2,
      tx: width / 2,
      ty: height / 2,
      active: false,
      radius: 170 // repulsion/warp radius
    };

    // Glow dot particle class
    class Dot {
      constructor() {
        this.reset();
        // Spread evenly across the entire initial canvas
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 2 + 1.2;
        this.opacity = Math.random() * 0.45 + 0.25;
      }

      update(scrollVel) {
        // Slow natural drift velocity
        this.x += this.vx;
        this.y += this.vy + scrollVel * 0.04;

        // Antigravity repulsion field from cursor
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Push dots away to simulate an antigravity ripple
            this.x += (dx / dist) * force * 2.2;
            this.y += (dy / dist) * force * 2.2;
          }
        }

        // Warp screen edges (wrapping boundaries)
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(isLight, colorPrefix) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorPrefix}, ${this.opacity.toFixed(3)})`;
        
        // Extra dynamic micro-glow when near the cursor
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = `rgba(${colorPrefix}, 0.8)`;
          }
        }

        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    // Dynamic dot count based on canvas resolution (performance optimized)
    const dotCount = Math.min(75, Math.floor((width * height) / 16000));
    const dots = Array.from({ length: dotCount }, () => new Dot());

    let scrollVel = 0;
    let lastScrollY = window.scrollY;

    // Listeners
    const handleMouseMove = (e) => {
      mouse.active = true;
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVel = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      dots.forEach((d) => d.reset());
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Main render loop
    const render = () => {
      // Keep canvas completely transparent
      ctx.clearRect(0, 0, width, height);

      // Smooth easing for mouse movement
      if (mouse.active) {
        mouse.x += (mouse.tx - mouse.x) * 0.08;
        mouse.y += (mouse.ty - mouse.y) * 0.08;
      }

      // Smooth scroll deceleration
      scrollVel *= 0.92;

      // Define brand colors based on active theme
      const isLight = document.documentElement.classList.contains('light');
      const colorPrefix = isLight ? '220, 38, 38' : '239, 68, 68'; // Scarlet vs Crimson red

      // 1. Draw connecting constellation lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 110;

          if (dist < maxDist) {
            // Line opacity fades as distance increases
            const opacity = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${colorPrefix}, ${opacity.toFixed(3)})`;
            ctx.lineWidth = 0.55;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }

        // Draw dynamic vector lines from dots to the active cursor
        if (mouse.active) {
          const dx = dots[i].x - mouse.x;
          const dy = dots[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseMaxDist = 150;

          if (dist < mouseMaxDist) {
            const opacity = (1 - dist / mouseMaxDist) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${colorPrefix}, ${opacity.toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw and update the dots
      dots.forEach((dot) => {
        dot.update(scrollVel);
        dot.draw(isLight, colorPrefix);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Clean up events
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-55 sm:opacity-70 transition-opacity duration-700"
    />
  );
};

export default CrazyBackground;
