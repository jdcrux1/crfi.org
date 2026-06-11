"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Page_about_us_mission_vision() {
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
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-text)' }}>MISSION &</span>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-accent)' }}>VISION</span>
               </h1>
            </div>

         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Our Vision (Strict Asymmetry)       */}
      {/* ------------------------------------- */}
      <section className="section-padding">
         <div className="grid-12" style={{ alignItems: 'flex-start' }}>
            
            {/* Left Column (Content) */}
            <div className="col-span-full md-col-start-2 md-col-span-7" >
               <h2 className="text-h2 gsap-text-reveal" style={{ marginBottom: 'var(--space-4)', fontSize: 'clamp(1.5rem, 2vw, 2rem)', color: 'var(--color-text-muted)' }}>
                 Our Vision
               </h2>
               <p className="gsap-text-reveal" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 3rem)', fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                 To bring people at the top echelon of every society to the saving knowledge and acceptance of Jesus Christ as their Lord and Saviour through the instrumentality of born-again Christians.
               </p>
            </div>

            {/* Right Column (Intentionally Empty per Master Prompt) */}
            <div className="col-span-full md-col-start-10 md-col-span-2 hidden-mobile" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
               {/* Lottie/SVG Placeholder for Tension Graphic */}
               <div className="gsap-text-reveal" style={{ width: '100px', height: '100px', border: '1px solid var(--color-primary)', borderRadius: '50%', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '-50%', width: '200%', height: '1px', background: 'var(--color-accent)', transform: 'rotate(-45deg)' }}></div>
               </div>
            </div>

         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Our Mission (Grid)  */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ marginTop: '10vh' }}>
         <style>{`
           .mission-card {
             background: var(--color-bg);
             padding: var(--space-8);
             display: flex;
             flex-direction: column;
             justify-content: flex-start;
             transition: all 0.4s ease;
             cursor: pointer;
             min-height: 250px;
             border-top: 1px solid rgba(255,255,255,0.1);
           }
           .mission-card:hover {
             background: rgba(255,255,255,0.03);
             transform: translateY(-5px);
             border-top: 1px solid var(--color-accent);
           }
         `}</style>
         <div className="grid-12">
            <div className="col-span-full md-col-start-2 md-col-span-10" >
               <h3 className="text-h3 gsap-text-reveal" style={{ marginBottom: 'var(--space-8)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                 Our Mission
               </h3>
               
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                  {[
                    { num: '#1', desc: 'To witness Jesus Christ to people in the top echelon of the society – people in control – whether in control of government or in control of commerce and industry; win them to Christ and provide a forum for them to mix together in the love of God.' },
                    { num: '#2', desc: 'To let them know that there is an alternative to all other ways they have tried without results. And that, that alternative is Jesus Christ. There is a void in every man’s life that only Jesus Christ can fill.' },
                    { num: '#3', desc: 'To give them an opportunity to share their problems among people who are their equals or almost their equals, disciple them and establish them in a Bible believing church of their choice for spiritual growth and fruitfulness.' },
                    { num: '#4', desc: 'To destroy the darkness at the top echelon of the society, as the greatest darkness known in any nation is always at the top. When people at the top come to the light of Jesus, they would go and shine, and the darkness would disappear.' }
                  ].map((mission, i) => (
                    <div key={i} className="gsap-text-reveal mission-card">
                       <h4 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 200, color: 'var(--color-accent)', margin: '0 0 1.5rem 0', lineHeight: 1 }}>{mission.num}</h4>
                       <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', lineHeight: 1.8 }}>{mission.desc}</p>
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
         <Link href="/about-us/our-objects" style={{ textDecoration: 'none' }}>
           <h2 className="text-h1 gsap-text-reveal" style={{ color: 'var(--color-text)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}>
             OBJECTIVES
           </h2>
         </Link>
      </section>

    </main>
  );
}
