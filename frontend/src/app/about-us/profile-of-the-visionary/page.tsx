"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Page_about_us_profile_of_the_visionary() {
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
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-text)' }}>THE VISIONARY</span>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-accent)' }}>PROFILE</span>
               </h1>
            </div>

         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Biography Section (Creative Layout)   */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ marginTop: '5vh', position: 'relative', overflow: 'hidden' }}>
         
         {/* Background Accent Text */}
         <div className="gsap-text-reveal" style={{ position: 'absolute', top: '10%', left: '-5%', fontSize: '20vw', fontWeight: 900, color: 'rgba(255,255,255,0.02)', zIndex: 0, pointerEvents: 'none', whiteSpace: 'nowrap' }}>
            VISIONARY
         </div>

         <div className="grid-12" style={{ alignItems: 'center' }}>
            
            {/* Left Column (Image) */}
            <div className="col-span-full md-col-start-2 md-col-span-5" style={{ position: 'relative', zIndex: 2 }}>
               <div className="image-mask gsap-text-reveal" style={{ height: '75vh', width: '130%', overflow: 'hidden', position: 'relative', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                  <div 
                    className="parallax-image"
                    style={{
                      position: 'absolute',
                      top: '-15%', left: 0, width: '100%', height: '130%',
                      backgroundImage: 'url(https://www.crfing.org/images/go_visionary.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'grayscale(20%) contrast(1.1)'
                    }}
                  />
               </div>
            </div>

            {/* Right Column (Glassmorphic Overlap) */}
            <div className="gsap-text-reveal col-span-full md-col-start-6 md-col-span-6" style={{ position: 'relative', zIndex: 3, background: 'rgba(20,20,20,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: 'var(--space-8)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', transform: 'translateY(5%)' }}>
               <h3 className="text-h3" style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                 Pastor Enoch Adejare Adeboye
               </h3>
               
               <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--color-text)', marginBottom: 'var(--space-4)', textAlign: 'justify' }}>
                 Pastor Enoch Adejare Adeboye hails from the tiny village of Ifewara in the south-western area of Nigeria in the early 1940s. He had to struggle with abject poverty early in life and through the help of God coupled with dogged determination, self-discipline and hard work, he chose to be educated under very difficult circumstances. He moved forward to bag himself a PhD in Applied Mathematics and had a successful carrier in the academic world.
               </p>

               <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--color-text)', marginBottom: 'var(--space-6)', textAlign: 'justify' }}>
                 Later in life when he was already a Senior Lecturer and acting head of Mathematics Department in the University of Lagos, he became the General Overseer of the Redeemed Christian Church of God by divine providence. Under his leadership, the church experienced phenomenal growth from 40 small parishes which were located only in the south-western part of Nigeria to a church with parishes in 160 countries of the world. He hosts the annual Holy Ghost Congress which attracts worshipers from all the continents of the world and reputed to be the largest gathering of human beings in history.
               </p>

               <div style={{ paddingLeft: 'var(--space-4)', borderLeft: '2px solid var(--color-accent)', marginBottom: 'var(--space-4)' }}>
                 <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', textAlign: 'justify', fontStyle: 'italic', fontWeight: 300 }}>
                   "He is a Christian Elder Statesman, a spiritual father to millions of people and a devoted prophet, dedicated to proclaiming the power of Christ."
                 </p>
               </div>

               <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', textAlign: 'justify' }}>
                 Pastor Adeboye is also the President of the Christ the Redeemer’s Ministries Incorporated. It is under this ministry that his interdenominational ministries like the Redeemed Christian Fellowship (RCF) in the tertiary institutions, the Christ the Redeemer schools from the nursery to the Redeemer’s University and Christ the Redeemer’s Friends International (CRFI) among many others operate. He is married to Pastor Folu Adeboye and they are blessed with four grown up children.
               </p>
            </div>

         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Navigation CTA (Next Page)          */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ paddingBottom: 'var(--space-16)', textAlign: 'center' }}>
         <h3 className="text-h3 gsap-text-reveal" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Next</h3>
         <Link href="/about-us/visionary-s-inaugural-speech-in-1990" style={{ textDecoration: 'none' }}>
           <h2 className="text-h1 gsap-text-reveal" style={{ color: 'var(--color-text)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}>
             1990 SPEECH
           </h2>
         </Link>
      </section>

    </main>
  );
}
