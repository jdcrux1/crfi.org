"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Page_about_us_our_objects() {
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
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-text)' }}>OUR</span>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-accent)' }}>OBJECTIVES</span>
               </h1>
            </div>

         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Introduction (Overview)               */}
      {/* ------------------------------------- */}
      <section className="section-padding">
         <div className="grid-12" style={{ alignItems: 'flex-start' }}>
            <div className="col-span-full md-col-start-2 md-col-span-10" >
               <h2 className="text-h2 gsap-text-reveal" style={{ marginBottom: 'var(--space-4)', fontSize: 'clamp(1.5rem, 2vw, 2rem)', color: 'var(--color-text-muted)' }}>
                 Guiding Principles
               </h2>
               <p className="gsap-text-reveal" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 3rem)', fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                 Our mandate is clear: to strategically reach the upper echelons of society, foster deep spiritual growth, and build an unparalleled network of believers committed to <span style={{ color: 'var(--color-accent)' }}>transformative action</span>.
               </p>
            </div>
         </div>
      </section>

      {/* ------------------------------------- */}
      {/* The 11 Objectives (Grid)            */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ marginTop: '5vh' }}>
         <style>{`
           .objective-card {
             background: var(--color-bg);
             padding: var(--space-8);
             display: flex;
             flex-direction: column;
             justify-content: flex-start;
             position: relative;
             overflow: hidden;
             border: 1px solid rgba(255,255,255,0.05);
             transition: all 0.4s ease;
             min-height: 300px;
           }
           .objective-card:hover {
             background: rgba(255,255,255,0.02);
             border-color: var(--color-accent);
             transform: translateY(-5px);
           }
           .objective-number {
             position: absolute;
             top: -20px;
             right: -10px;
             font-size: 15rem;
             font-weight: 900;
             line-height: 1;
             color: rgba(255,255,255,0.03);
             pointer-events: none;
             transition: color 0.4s ease;
           }
           .objective-card:hover .objective-number {
             color: rgba(255,255,255,0.08);
           }
         `}</style>
         <div className="grid-12">
            <div className="col-span-full md-col-start-2 md-col-span-10" >
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                  {[
                    "To reach men and women in the middle and upper echelons of every society worldwide with the gospel of Jesus Christ using the believers within those echelons.",
                    "To organise outreaches in different forms e.g. breakfast meetings, luncheon or dinner outreaches, lectures, symposia, seminars, drama presentations, film shows, and praise/worship concerts.",
                    "To provide a forum for all converts to fellowship together. The forum will be inter-denominational where each convert can be discipled and established in a Bible-believing church.",
                    "To support and encourage unity, growth and love in the church by drawing members from all denominations without making them lose their local assembly characteristics.",
                    "To encourage the study, understanding, propagation and practical application of Biblical truth in every day life of members, transforming everyone to Christ-likeness.",
                    "To organise prayer meetings, establish prayer units and conduct prayer sessions on any matter, at any place and for any adequate period.",
                    "To publish or cause to be published Christian literature, tracts, bulletins, magazines, and books conducive to the propagation of the gospel.",
                    "To make broadcasts, announcements, or otherwise make its programmes known on media including radio, television or the internet.",
                    "To cooperate with any other fellowships or organisations whose aims and objectives are identical with or complementary to the fellowship’s.",
                    "To acquire, own, possess or otherwise hold interest in any business, properties, including land and have rights, title, license, etc.",
                    "To raise members that will be leading lights amidst the darkness of this world and who will encourage Christians to obey continually the commandments of Jesus Christ."
                  ].map((text, i) => (
                    <div key={i} className="gsap-text-reveal objective-card">
                       <div className="objective-number">{i + 1}</div>
                       <div style={{ position: 'relative', zIndex: 2 }}>
                         <h4 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-accent)', margin: '0 0 1rem 0' }}>Objective {i + 1}</h4>
                         <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', lineHeight: 1.8 }}>{text}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Navigation CTA (Next Page)          */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ paddingBottom: 'var(--space-16)', textAlign: 'center' }}>
         <h3 className="text-h3 gsap-text-reveal" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Next</h3>
         <Link href="/about-us/profile-of-the-visionary" style={{ textDecoration: 'none' }}>
           <h2 className="text-h1 gsap-text-reveal" style={{ color: 'var(--color-text)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}>
             THE VISIONARY
           </h2>
         </Link>
      </section>

    </main>
  );
}
