"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const SLIDES = [
  {
    image: "https://www.crfing.org/images/go_visionary.jpg",
    text1: "Faith As",
    text2: "Architecture."
  },
  {
    image: "https://www.crfing.org/images/slider_people2.jpg",
    text1: "Action As",
    text2: "Outreach."
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // 1. Initial ScrollTrigger Logic for the page
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => ctx.revert(); 
  }, []);

  // 2. Slider Logic (Crossfade Images and Stagger Text)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000); // 6 second slides

    return () => clearInterval(slideInterval);
  }, []);

  // 3. GSAP Animation when currentSlide changes
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the background images
      gsap.to(`.slide-bg-${currentSlide}`, {
        opacity: 0.6, // Target opacity (with dark overlay effect)
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        zIndex: 1
      });
      gsap.to(`.slide-bg-${currentSlide === 0 ? 1 : 0}`, {
        opacity: 0,
        scale: 1.05,
        duration: 1.5,
        ease: "power2.inOut",
        zIndex: 0
      });

      // Animate the text IN
      gsap.fromTo(`.hero-text-${currentSlide} .hero-text-line`, 
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.3
        }
      );

      // Animate the old text OUT
      gsap.to(`.hero-text-${currentSlide === 0 ? 1 : 0} .hero-text-line`, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.in"
      });

    }, sliderRef);

    return () => ctx.revert();
  }, [currentSlide]);

  return (
    <main ref={containerRef} style={{ paddingBottom: '10vh' }}>
      
      {/* ------------------------------------- */}
      {/* GSAP Fullscreen Slider Hero           */}
      {/* ------------------------------------- */}
      <section ref={sliderRef} style={{ 
        position: 'relative', 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden',
        background: 'var(--color-bg)'
      }}>
        
        {/* Background Images Layer */}
        {SLIDES.map((slide, index) => (
          <div 
            key={index} 
            className={`slide-bg-${index}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(to bottom, rgba(11, 8, 22, 0.8) 0%, rgba(11, 8, 22, 0) 30%), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === 0 ? 0.6 : 0,
              scale: index === 0 ? 1 : 1.05,
              filter: 'grayscale(100%) contrast(1.2)' // Keep the brutalist aesthetic
            }}
          />
        ))}

        {/* Text Layer */}
        <div className="grid-12" style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          padding: 'var(--space-16) var(--space-4) 0',
          zIndex: 10
        }}>
           
           <div className="col-span-full md-col-start-2 md-col-span-10" style={{ position: 'relative', height: '100%' }}>
              
              {/* Static Top Text */}
              <div style={{ position: 'absolute', top: '15%' }}>
                 <h1 className="text-h1" style={{ 
                    color: 'var(--color-accent)', 
                    marginBottom: '0.5rem',
                    lineHeight: 0.8
                 }}>
                   CRFI
                 </h1>
                 <p style={{ 
                    fontSize: 'clamp(1.5rem, 2.5vw, 3rem)', 
                    fontWeight: 400, 
                    color: 'var(--color-text)', 
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2
                 }}>Christ The Redeemer&apos;s Friends International</p>
              </div>

              {/* Dynamic Bottom Text */}
              {SLIDES.map((slide, index) => (
                <div 
                  key={index} 
                  className={`hero-text-${index}`}
                  style={{
                    position: 'absolute',
                    bottom: '15%',
                    pointerEvents: currentSlide === index ? 'auto' : 'none'
                  }}
                >
                  <h1 className="text-h1 stagger-text">
                     <span className="stagger-line hero-text-line" style={{ display: 'block' }}>{slide.text1}</span>
                     <span className="stagger-line hero-text-line" style={{ display: 'block', color: 'var(--color-accent)' }}>{slide.text2}</span>
                  </h1>
                </div>
              ))}
           </div>

        </div>

      </section>

      {/* ------------------------------------- */}
      {/* Visionary Profile Section (Clean text)*/}
      {/* ------------------------------------- */}
      <section id="visionary" className="section-padding" style={{ background: 'var(--color-primary)' }}>
         <div className="grid-12" style={{ alignItems: 'center' }}>
            
            {/* The Text Block Spanning 8 Columns and Centered */}
            <div className="col-span-full md-col-start-3 md-col-span-8" style={{ textAlign: 'center' }}>
               <h2 className="text-h2 gsap-text-reveal" style={{ marginBottom: 'var(--space-4)' }}>
                 Profile of The Visionary
               </h2>
               <h3 className="text-h3 gsap-text-reveal" style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-2)' }}>
                 Pastor Enoch Adeboye
               </h3>
               <p className="text-body gsap-text-reveal" style={{ marginBottom: 'var(--space-4)', fontSize: '1.25rem', lineHeight: 1.8 }}>
                 Pastor Enoch Adeboye has dedicated his life to spiritual leadership, community outreach, and fostering global connections. His inaugural vision established the core tenets that guide our international ministry today. Christ The Redeemer&apos;s Friends International is a global network engineered to deliver lasting impact.
               </p>
                  <a href="/about-us/profile-of-the-visionary" className="gsap-text-reveal" style={{
                    background: 'transparent',
                    border: '1px solid var(--color-accent)',
                    color: 'var(--color-text)',
                    padding: '1rem 2rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    minHeight: '48px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none'
                  }}>DISCOVER THE LEGACY &rarr;</a>
            </div>

         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Our People Section (Clean text)       */}
      {/* ------------------------------------- */}
      <section id="people" className="section-padding">
         <div className="grid-12" style={{ alignItems: 'center' }}>
            
            <div className="col-span-full md-col-start-3 md-col-span-8" style={{ textAlign: 'center' }}>
               <h2 className="text-h2 gsap-text-reveal" style={{ marginBottom: 'var(--space-4)' }}>
                 Our People
               </h2>
               <h3 className="text-h3 gsap-text-reveal" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
                 Why CRFI?
               </h3>
               <p className="text-body gsap-text-reveal" style={{ marginBottom: 'var(--space-4)', fontSize: '1.25rem', lineHeight: 1.8 }}>
                 We are an international family bound by faith and committed to action. Discover the people driving change in communities worldwide. Our network stretches across borders, uniting professionals and leaders under a singular banner of faith.
               </p>
               <button className="gsap-text-reveal" style={{ 
                 background: 'var(--color-text)', 
                 border: 'none', 
                 color: 'var(--color-bg)', 
                 padding: '1rem 2rem',
                 textTransform: 'uppercase',
                 letterSpacing: '0.05em',
                 cursor: 'pointer',
                 fontWeight: 'bold',
                 minHeight: '48px',
                 display: 'inline-flex',
                 alignItems: 'center',
                 justifyContent: 'center'
               }}>
                 Read More
               </button>
            </div>

         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Foundation Scripture                  */}
      {/* ------------------------------------- */}
      <section id="scripture" className="section-padding" style={{ background: 'var(--color-primary)' }}>
         <div className="grid-12">
            <div className="col-span-full md-col-start-3 md-col-span-8" style={{ textAlign: 'center' }}>
               <h2 className="text-h2 gsap-text-reveal" style={{ marginBottom: 'var(--space-8)' }}>
                 Foundation Scripture
               </h2>
               <blockquote className="gsap-text-reveal" style={{ 
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
                  lineHeight: 1.4, 
                  fontStyle: 'italic', 
                  color: 'var(--color-text-muted)' 
               }}>
                  &ldquo;Ye are the light of the world. A city that is set on an hill cannot be hid. Neither do men light a candle, and put it under a bushel, but on a candlestick; and it giveth light unto all that are in the house. Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.&rdquo;
               </blockquote>
               <p className="gsap-text-reveal" style={{ marginTop: 'var(--space-4)', fontSize: '1.2rem', color: 'var(--color-accent)', fontWeight: 'bold' }}>
                 — Matthew 5:14-16
               </p>
            </div>
         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Newsletter Subscribe                  */}
      {/* ------------------------------------- */}
      <section id="newsletter" className="section-padding">
         <div className="grid-12">
            <div className="col-span-full md-col-start-4 md-col-span-6" style={{ textAlign: 'center' }}>
               <h3 className="text-h3 gsap-text-reveal" style={{ marginBottom: 'var(--space-4)' }}>
                 Stay up to date, subscribe to our newsletter
               </h3>
               <form className="gsap-text-reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: 'var(--space-4)' }}>
                  <input 
                    type="email" 
                    placeholder="E-mail address" 
                    style={{ 
                      flex: 1, 
                      padding: '1rem', 
                      background: 'transparent', 
                      border: '1px solid var(--color-text-muted)', 
                      color: 'var(--color-text)',
                      fontSize: '1rem',
                      minHeight: '48px',
                      minWidth: '200px'
                    }} 
                  />
                  <button type="submit" style={{ 
                     background: 'var(--color-accent)', 
                     border: 'none', 
                     color: '#fff', 
                     padding: '1rem 2rem',
                     textTransform: 'uppercase',
                     letterSpacing: '0.05em',
                     cursor: 'pointer',
                     fontWeight: 'bold',
                     minHeight: '48px',
                     display: 'inline-flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     flex: '1 1 auto'
                  }}>
                    Subscribe
                  </button>
               </form>
            </div>
         </div>
      </section>

    </main>
  );
}
