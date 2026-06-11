"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Glow and pulse effect
      gsap.to(".glow-circle", {
        scale: 1.2,
        opacity: 0.6,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // Text stagger reveal
      gsap.fromTo('.stagger-text-in', 
        { y: 50, opacity: 0, rotateX: -20 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 1.2, 
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2
        }
      );
    }, containerRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <main ref={containerRef} style={{ background: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Graphic */}
      <div className="glow-circle" style={{ position: 'absolute', width: '60vw', height: '60vw', background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)', opacity: 0.3, filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }}></div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: 'var(--space-8)', maxWidth: '800px' }}>
         <h3 className="stagger-text-in" style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '1rem', marginBottom: 'var(--space-4)' }}>
           Pardon Our Dust
         </h3>
         
         <h1 className="text-h1 stagger-text-in" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 1.1, marginBottom: 'var(--space-4)' }}>
           WORK IN PROGRESS
         </h1>
         
         <p className="text-body stagger-text-in" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-8)' }}>
           This section of the global network is currently under construction. We are actively engineering this page to bring you a transformative experience. Please check back soon.
         </p>

         <div className="stagger-text-in">
           <Link href="/" style={{ textDecoration: 'none' }}>
             <button style={{ 
                background: 'transparent', 
                border: '1px solid var(--color-accent)', 
                color: 'var(--color-accent)', 
                padding: '1rem 3rem', 
                fontSize: '1rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em', 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderRadius: '4px'
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.background = 'var(--color-accent)';
               e.currentTarget.style.color = 'var(--color-bg)';
               e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,102,0.4)';
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.background = 'transparent';
               e.currentTarget.style.color = 'var(--color-accent)';
               e.currentTarget.style.boxShadow = 'none';
             }}>
               Return Home
             </button>
           </Link>
         </div>
      </div>

    </main>
  );
}
