"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

export default function About() {
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
            <div className="col-span-full">
               <h1 style={{ overflow: 'hidden', margin: 0, lineHeight: 0.9, fontSize: 'clamp(4rem, 10vw, 10rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-text)' }}>ABOUT</span>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-accent)' }}>OUR FOUNDATION</span>
               </h1>
            </div>

         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Introduction (Strict Asymmetry)       */}
      {/* ------------------------------------- */}
      <section className="section-padding">
         <div className="grid-12" style={{ alignItems: 'flex-start' }}>
            
            {/* Left Column (Content) */}
            <div className="col-span-full md-col-start-2 md-col-span-5">
               <h2 className="text-h2 gsap-text-reveal" style={{ marginBottom: 'var(--space-4)', fontSize: 'clamp(1.5rem, 2vw, 2rem)' }}>
                 Introduction
               </h2>
               <p className="gsap-text-reveal" style={{ fontSize: 'clamp(1.5rem, 2vw, 2.5rem)', fontWeight: 600, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                 To build a global network engineered to deliver lasting impact, <span style={{ color: 'var(--color-accent)' }}>spiritual leadership</span>, and transformative outreach. We are an international family bound by faith and <span style={{ color: 'var(--color-accent)' }}>committed to action</span>.
               </p>
            </div>

            {/* Right Column (Intentionally Empty per Master Prompt) */}
            <div className="hidden-mobile md-col-start-8 md-col-span-4" style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
               {/* Lottie/SVG Placeholder for Tension Graphic */}
               <div className="gsap-text-reveal" style={{ width: '100px', height: '100px', border: '1px solid var(--color-primary)', borderRadius: '50%', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '-50%', width: '200%', height: '1px', background: 'var(--color-accent)', transform: 'rotate(-45deg)' }}></div>
               </div>
            </div>

         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Our Sectors (Grid per Master Prompt)  */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ marginTop: '10vh' }}>
         <style>{`
           .sector-card {
             background: var(--color-bg);
             padding: var(--space-8) var(--space-4);
             display: flex;
             flex-direction: column;
             justify-content: center;
             transition: background 0.4s ease;
             cursor: pointer;
             min-height: 200px;
           }
           .sector-card:hover {
             background: var(--color-primary);
           }
           .sector-desc {
             max-height: 0;
             opacity: 0;
             overflow: hidden;
             transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
             margin-top: 0;
             color: rgba(255,255,255,0.7);
             font-size: 0.95rem;
             line-height: 1.6;
           }
           .sector-card:hover .sector-desc {
             max-height: 150px;
             opacity: 1;
             margin-top: 1rem;
           }
         `}</style>
         <div className="grid-12">
            <div className="col-span-full md-col-start-2 md-col-span-10">
               <h3 className="text-h3 gsap-text-reveal" style={{ marginBottom: 'var(--space-8)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                 Areas of Impact
               </h3>
               
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2px', background: 'rgba(255,255,255,0.1)' }}>
                  {[
                    { title: 'Community Development', desc: 'Building sustainable local infrastructure, support systems, and resource networks to uplift marginalized neighborhoods.' },
                    { title: 'Global Outreach', desc: 'Expanding our reach across borders to deliver immediate aid, essential resources, and spiritual hope to those in need.' },
                    { title: 'Spiritual Leadership', desc: 'Fostering profound moral guidance, leadership training, and faith-based mentorship for the next generation of believers.' },
                    { title: 'Youth Empowerment', desc: 'Equipping young minds with practical skills, education, and the spiritual confidence required to lead tomorrow.' },
                    { title: 'International Missions', desc: 'Deploying dedicated mission teams worldwide to actively serve and uplift communities facing extraordinary hardship.' },
                    { title: 'Education & Grants', desc: 'Providing crucial financial support, scholarships, and learning opportunities to unlock unparalleled human potential.' }
                  ].map((sector, i) => (
                    <div key={i} className="gsap-text-reveal sector-card">
                       <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>{sector.title}</h4>
                       <p className="sector-desc">{sector.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Articles of Faith / Our Objects       */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ background: 'var(--color-primary)', marginTop: 'var(--space-8)' }}>
         <div className="grid-12" style={{ alignItems: 'center' }}>
            
            {/* Left Column (Image) */}
            <div className="col-span-full md-col-start-1 md-col-span-5">
               <div className="image-mask gsap-text-reveal" style={{ height: '70vh', overflow: 'hidden', position: 'relative' }}>
                  <div 
                    className="parallax-image"
                    style={{
                      position: 'absolute',
                      top: '-15%', left: 0, width: '100%', height: '130%',
                      backgroundImage: 'url(https://www.crfing.org/images/go_visionary.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'grayscale(100%) contrast(1.2)'
                    }}
                  />
               </div>
            </div>

            {/* Right Column (Text Pull) */}
            <div className="col-span-full md-col-start-7 md-col-span-5">
               <h3 className="text-h3 gsap-text-reveal" style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-2)' }}>
                 Why CRFI?
               </h3>
               <h2 className="text-h2 gsap-text-reveal" style={{ marginBottom: 'var(--space-4)', fontSize: 'clamp(2rem, 3vw, 3.5rem)' }}>
                 Objectives & Articles of Faith
               </h2>
               <p className="text-body gsap-text-reveal" style={{ marginBottom: 'var(--space-4)', fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text)' }}>
                 Our core tenets are built on the foundational teachings and inaugural vision established in 1990. We prioritize community development, global outreach, and maintaining a strict adherence to our structural beliefs.
               </p>
               <ul className="gsap-text-reveal" style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <li style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>1. Unwavering commitment to spiritual growth.</li>
                 <li style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>2. Execution of global outreach initiatives.</li>
                 <li style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>3. Fostering a supportive international community.</li>
               </ul>
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
