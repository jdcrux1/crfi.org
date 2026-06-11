"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline but pause it initially
      tlRef.current = gsap.timeline({ paused: true });

      // 1. Reveal Overlay (clipPath from top down)
      tlRef.current.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power4.inOut"
      });

      // 2. Stagger text reveals
      tlRef.current.fromTo(
        ".menu-link-text",
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out"
        },
        "-=0.4" // Start before overlay finishes
      );
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tlRef.current?.reverse();
      // Un-lock body scroll
      document.body.style.overflow = "auto";
    } else {
      tlRef.current?.play();
      // Lock body scroll
      document.body.style.overflow = "hidden";
    }
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    if (isOpen) toggleMenu();
  };

  return (
    <>
      {/* The Sticky Top-Bar */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 'var(--space-16)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5000,
        padding: '0 var(--gutter)',
        color: '#fff'
      }}>
        {/* Centered Logo mark (48px min touch target) */}
        <Link href="/" onClick={closeMenu} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textDecoration: 'none', zIndex: 5001, minHeight: '48px', minWidth: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src="https://www.crfing.org/images/logo.png" 
            alt="CRFI Logo" 
            style={{ height: '40px', objectFit: 'contain' }}
          />
        </Link>

        {/* Hamburger / Close Toggle (48px min touch target) */}
        <button onClick={toggleMenu} style={{
          position: 'absolute',
          right: 'var(--gutter)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          width: '48px',
          height: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          zIndex: 5001,
          padding: '12px 4px'
        }}>
          {isOpen ? (
            // Close 'X'
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <span style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', background: '#fff', transform: 'translateY(-50%) rotate(45deg)' }}></span>
              <span style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', background: '#fff', transform: 'translateY(-50%) rotate(-45deg)' }}></span>
            </div>
          ) : (
            // Hamburger
            <div style={{ width: '32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span style={{ width: '100%', height: '2px', background: '#fff', transition: 'width 0.3s' }}></span>
              <span style={{ width: '80%', height: '2px', background: '#fff', transition: 'width 0.3s' }}></span>
              <span style={{ width: '100%', height: '2px', background: '#fff', transition: 'width 0.3s' }}></span>
            </div>
          )}
        </button>
      </header>

      {/* The Fullscreen GSAP Overlay */}
      <div 
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'var(--color-bg)',
          zIndex: 4999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", // Hidden initially
          paddingTop: 'var(--space-16)',
          paddingBottom: 'var(--space-8)',
          overflowY: 'auto' // Crucial for vertical scroll on short screens
        }}
      >
        <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 var(--gutter)', display: 'flex', flexDirection: 'column' }}>
           
           {/* Row 1: Flush Left / Right */}
           <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', padding: '1.5rem 0', overflow: 'hidden' }}>
              <Link href="/about-us/mission-vision" onClick={closeMenu} style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', minHeight: '48px' }}>
                 <div className="menu-link-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>MISSION & VISION</div>
              </Link>
              <Link href="/about-us/our-objects" onClick={closeMenu} style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', minHeight: '48px' }}>
                 <div className="menu-link-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>OBJECTIVES</div>
              </Link>
           </div>

           {/* Row 2: Inset Left / Right */}
           <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-around', padding: '1.5rem 0', overflow: 'hidden' }}>
              <Link href="/about-us/profile-of-the-visionary" onClick={closeMenu} style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', minHeight: '48px' }}>
                 <div className="menu-link-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>THE VISIONARY</div>
              </Link>
              <Link href="/about-us/visionary-s-inaugural-speech-in-1990" onClick={closeMenu} style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', minHeight: '48px' }}>
                 <div className="menu-link-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>SPEECH 1990</div>
              </Link>
           </div>

           {/* Row 3: Center */}
           <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', padding: '1.5rem 0', overflow: 'hidden' }}>
              <Link href="/about-us/articles-of-faith" onClick={closeMenu} style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', minHeight: '48px' }}>
                 <div className="menu-link-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>ARTICLES OF FAITH</div>
              </Link>
           </div>

           {/* Row 4: Inset Left */}
           <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'flex-start', padding: '1.5rem 5%', overflow: 'hidden' }}>
              <Link href="/about-us/why-crfi" onClick={closeMenu} style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', minHeight: '48px' }}>
                 <div className="menu-link-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>WHY CRFI?</div>
              </Link>
           </div>

           {/* Row 5: Inset Right */}
           <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'flex-end', padding: '1.5rem 5%', overflow: 'hidden' }}>
              <Link href="/about-us/foundation-scripture" onClick={closeMenu} style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', minHeight: '48px' }}>
                 <div className="menu-link-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>FOUNDATION SCRIPTURE</div>
              </Link>
           </div>

           {/* Row 6: Center Accent */}
           <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', padding: '1.5rem 0', overflow: 'hidden' }}>
              <Link href="/event-gallery" onClick={closeMenu} style={{ textDecoration: 'none', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', minHeight: '48px' }}>
                 <div className="menu-link-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>EVENT GALLERY</div>
              </Link>
           </div>

        </div>
      </div>
    </>
  );
}
