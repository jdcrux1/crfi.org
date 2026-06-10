"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Fade and slide up the grid content
      gsap.fromTo('.footer-content', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          }
        }
      );

      // Massive parallax reveal for the CRFI text
      gsap.fromTo('.footer-massive-text',
        { y: '50%', opacity: 0, scale: 0.9 },
        {
          y: '0%',
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 75%",
          }
        }
      )
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} style={{
      position: 'relative',
      background: 'var(--color-bg)',
      color: 'var(--color-text)',
      paddingTop: 'var(--space-16)',
      overflow: 'hidden', 
      borderTop: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '70vh'
    }}>
      
      {/* Top Information Section */}
      <div className="section-padding" style={{ paddingBottom: '0', flexGrow: 1 }}>
        <div className="grid-12">
          
          {/* Column 1: Intro & Email */}
          <div className="footer-content col-span-full md-col-span-5" style={{ marginBottom: 'var(--space-8)' }}>
             <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, margin: '0 0 var(--space-4) 0', color: 'var(--color-text)', lineHeight: 1.2 }}>
               Join the vision.<br/>
               <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>Together we build.</span>
             </h3>
             <Link href="mailto:info@crfing.org" className="hover-underline-anim" style={{ 
               color: 'var(--color-accent)', 
               fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
               fontWeight: 'bold',
               padding: '1rem 0',
               display: 'inline-block',
               minHeight: '48px',
               minWidth: '48px'
             }}>
               info@crfing.org
             </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-content col-span-full md-col-start-7 md-col-span-3" style={{ marginBottom: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Navigation</p>
             {[
               { name: 'Home', href: '/' },
               { name: 'About Us', href: '/about' },
               { name: 'Event Gallery', href: '/event-gallery' },
               { name: 'Contact', href: '/contact' }
             ].map((link) => (
               <Link key={link.name} href={link.href} className="hover-underline-anim" style={{ 
                 color: 'var(--color-text)', 
                 fontSize: '1.1rem',
                 width: 'fit-content',
                 minHeight: '48px',
                 display: 'flex',
                 alignItems: 'center'
               }}>
                 {link.name}
               </Link>
             ))}
          </div>

          {/* Column 3: Socials & Copyright */}
          <div className="footer-content col-span-full md-col-start-10 md-col-span-3" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: 'var(--space-8)' }}>
             <div>
               <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Social</p>
               <div style={{ display: 'flex', gap: '1.5rem' }}>
                  {/* X / Twitter */}
                  <a href="#" className="social-icon" aria-label="X (Twitter)" style={{ minWidth: '48px', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-12px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                       <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a href="#" className="social-icon" aria-label="Facebook" style={{ minWidth: '48px', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-12px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                       <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z"/>
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="#" className="social-icon" aria-label="LinkedIn" style={{ minWidth: '48px', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-12px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="#" className="social-icon" aria-label="Instagram" style={{ minWidth: '48px', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-12px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                       <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                       <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
               </div>
             </div>
             
             <div style={{ marginTop: 'auto', paddingTop: 'var(--space-8)' }}>
               <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
                 &copy; {new Date().getFullYear()} CRFI. All rights reserved.
               </p>
             </div>
          </div>

        </div>
      </div>

      {/* Massive Brand Typograhpy */}
      <div className="footer-massive-text" style={{ 
        width: '100%', 
        textAlign: 'center',
        lineHeight: 0.75,
        marginTop: 'var(--space-8)'
      }}>
         <h1 style={{ 
           margin: 0, 
           fontSize: 'clamp(6rem, 25vw, 30rem)', 
           fontWeight: 800, 
           letterSpacing: '-0.05em', 
           color: 'var(--color-bg)', 
           WebkitTextStroke: '2px rgba(255,255,255,0.05)',
           userSelect: 'none',
           textTransform: 'uppercase'
         }}>
           CRFI
         </h1>
      </div>

    </footer>
  );
}
