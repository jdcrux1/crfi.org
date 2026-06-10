"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Page_about_us_foundation_scripture() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Staggered text reveal for headers
      gsap.fromTo('.stagger-text-in', 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2
        }
      );

      // Section Text Reveal on Scroll
      const textBlocks = gsap.utils.toArray('.gsap-text-reveal');
      textBlocks.forEach((block: any) => {
         gsap.fromTo(block, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
            }
          }
        );
      });
      
      // Image Parallax 
      const images = gsap.utils.toArray('.parallax-image');
      images.forEach((img: any) => {
        gsap.to(img, {
          y: '15%',   
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom", 
            end: "bottom top",   
            scrub: true,         
          }
        });
      });

    }, containerRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <main ref={containerRef} style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: 'var(--space-16)' }}>
      
      {/* ------------------------------------- */}
      {/* Internal Page Hero (100vh)            */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
         {/* Animated Tension SVG Background Placeholder */}
         <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <path className="gsap-text-reveal" d="M0,100 C30,50 70,50 100,0" stroke="var(--color-primary)" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke" />
         </svg>

         <div className="grid-12" style={{ width: '100%', textAlign: 'center', zIndex: 10 }}>
            
            {/* CRFI Typography & Byline (Smaller, White/Muted) */}
            <div className="col-span-full" style={{ marginBottom: 'var(--space-4)' }}>
               <h2 className="text-h1 stagger-text-in" style={{ color: 'var(--color-text)', fontSize: 'clamp(2rem, 4vw, 4rem)', margin: 0, lineHeight: 1, letterSpacing: '0.05em' }}>
                 CRFI
               </h2>
               <p className="stagger-text-in" style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(0.875rem, 1.5vw, 1.5rem)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '0.5rem', fontWeight: 500 }}>
                  Christ Redeemer's Friends International
               </p>
            </div>

            {/* Dynamic Page Header (Massive, White/Green) */}
            <div className="col-span-full" >
               <h1 style={{ overflow: 'hidden', margin: 0, lineHeight: 0.9, fontSize: 'clamp(4rem, 10vw, 10rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-text)' }}>FOUNDATION</span>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-accent)' }}>SCRIPTURE</span>
               </h1>
            </div>

         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Intro Context                         */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ marginTop: '5vh' }}>
         <div className="grid-12" style={{ alignItems: 'center' }}>
            <div className="col-span-full md-col-start-3 md-col-span-8" style={{ textAlign: 'center' }}>
               <p className="gsap-text-reveal" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', lineHeight: 1.8, color: 'var(--color-text)', fontWeight: 300 }}>
                 According to the CRM President, while he was seeking the face of God for direction on the fellowship before it was established, God gave him Matthew 5:14-16 as the scripture upon which to build the fellowship. It says:
               </p>
            </div>
         </div>
      </section>

      {/* ------------------------------------- */}
      {/* The Scripture (Glowing Layout)        */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ position: 'relative', margin: '10vh 0', overflow: 'hidden' }}>
         
         {/* Background Glow Effect */}
         <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none', zIndex: 0 }}></div>

         <div className="grid-12" style={{ position: 'relative', zIndex: 2 }}>
            <div className="col-span-full md-col-start-2 md-col-span-10" style={{ textAlign: 'center' }}>
               <div className="gsap-text-reveal" style={{ display: 'inline-block', padding: 'var(--space-8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', background: 'rgba(10,10,10,0.4)', backdropFilter: 'blur(20px)', boxShadow: '0 0 40px rgba(255,255,255,0.03)' }}>
                  
                  {/* Decorative Icon */}
                  <div style={{ marginBottom: 'var(--space-6)', color: 'var(--color-accent)' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
                    </svg>
                  </div>

                  <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1.6, color: 'var(--color-text)', fontStyle: 'italic', fontWeight: 400, textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                    "You are the light of the world. A city that is set on a hill cannot be hidden. Nor do they light a lamp and put it under a basket, but on a lampstand, and it gives light to all who are in the house. Let your light so shine before men, that they may see your good works and glorify your Father in heaven."
                  </p>
                  
                  <h4 style={{ marginTop: 'var(--space-6)', color: 'var(--color-accent)', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    — Matthew 5:14-16
                  </h4>
               </div>
            </div>
         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Outro Reflection                      */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ marginBottom: '10vh' }}>
         <div className="grid-12" style={{ alignItems: 'center' }}>
            <div className="col-span-full md-col-start-3 md-col-span-8" style={{ textAlign: 'center' }}>
               <p className="gsap-text-reveal" style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                 Pause a while here and reflect on this scripture and the kind of character it will give the fellowship God was about to birth through the President. God ordained the fellowship from conception to be a fellowship of the leading lights of the society, spiritual pathfinders, and leaders in every sphere of life. The scripture also highlights the conduct God’s expects the members of the fellowship to exhibit: ”Let your light so shine before men, that they may see your good works and glorify your Father in heaven.” Every member should meditate on this scripture daily and make it a watchword in all he or she does.
               </p>
            </div>
         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Navigation CTA (Next Page)          */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ paddingBottom: 'var(--space-16)', textAlign: 'center' }}>
         <h3 className="text-h3 gsap-text-reveal" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Next</h3>
         <Link href="/event-gallery" style={{ textDecoration: 'none' }}>
           <h2 className="text-h1 gsap-text-reveal" style={{ color: 'var(--color-text)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}>
             EVENT GALLERY
           </h2>
         </Link>
      </section>

    </main>
  );
}
