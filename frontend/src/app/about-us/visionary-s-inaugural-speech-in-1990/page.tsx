"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Page_about_us_visionary_s_inaugural_speech_in_1990() {
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
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-text)' }}>1990</span>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-accent)' }}>INAUGURAL SPEECH</span>
               </h1>
            </div>

         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Story Intro Block                     */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ marginTop: '5vh' }}>
         <div className="grid-12" style={{ alignItems: 'flex-start' }}>
            <div className="col-span-full md-col-start-3 md-col-span-8" style={{ textAlign: 'center' }}>
               <h3 className="text-h3 gsap-text-reveal" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                 January 9th, 1990
               </h3>
               <p className="gsap-text-reveal" style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)' }}>
                 Christ the Redeemer’s Friends International (CRFI) was inaugurated on Sunday, 9th January 1990 by the President, Christ the Redeemers Ministries Inc., Pastor E. A. Adeboye, who is also the General Overseer of the Redeemed Christian Church of God. It was built as a tool to achieve one of the exact purposes for which God called him into full time ministry. 
               </p>
               <p className="gsap-text-reveal" style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'var(--color-accent)', marginTop: 'var(--space-4)', fontWeight: 600 }}>
                 Here is the story as told by the General Overseer on the day CRFI was launched:
               </p>
            </div>
         </div>
      </section>

      {/* ------------------------------------- */}
      {/* The Speech (Blockquote)               */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ position: 'relative', paddingBottom: '10vh' }}>
         <div className="gsap-text-reveal" style={{ position: 'absolute', top: '-10%', left: '5%', fontSize: '40rem', color: 'rgba(255,255,255,0.03)', lineHeight: 1, fontFamily: 'serif', pointerEvents: 'none' }}>"</div>
         
         <div className="grid-12">
            <div className="col-span-full md-col-start-2 md-col-span-10" style={{ position: 'relative', zIndex: 2, paddingLeft: 'clamp(2rem, 5vw, 5rem)', borderLeft: '4px solid var(--color-accent)' }}>
               
               <p className="gsap-text-reveal" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', fontWeight: 300, color: 'var(--color-text)', lineHeight: 1.6, marginBottom: 'var(--space-6)', fontStyle: 'italic', letterSpacing: '-0.01em' }}>
                 "As far back as 1973, I had already built a house of my own. I was happily married. I had everything one could have and a bright opportunity of becoming the youngest Vice-Chancellor in Africa. When the Lord, however, came to me and said I would have to go and work full time for Him, I did not at all initially take kindly to it. I, therefore, engaged God in arguments. The Almighty God, however, came with winning points, one of which was the need to bring the big men and women in the society to the knowledge and acceptance of the Lordship of Jesus Christ. And that, the Almighty revealed, could be done by me. There are many of them who have problems. The problems that they are either too shy to share with people they regard as inferior to them, or they believe that Jesus Christ is for the failures, dropouts, never-do-wells, and so on."
               </p>

               <p className="gsap-text-reveal" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', fontWeight: 300, color: 'var(--color-text)', lineHeight: 1.6, marginBottom: 'var(--space-6)', fontStyle: 'italic', letterSpacing: '-0.01em' }}>
                 "There is the need to see that Jesus Christ is not just for the poor alone, but also for the rich, the accomplished and for those who have made it in life. And the Lord said they would listen to me knowing that, at least with a Ph.D. in Mathematics, I cannot rightly be called a dropout. They will listen to me because they know that fools don’t get a Ph.D. in Mathematics."
               </p>

               <p className="gsap-text-reveal" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', fontWeight: 500, color: 'var(--color-accent)', lineHeight: 1.6, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
                 "I thank God, many have listened and many are on their way to heaven today because I did what God asked me to do."
               </p>
               
            </div>
         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Navigation CTA (Next Page)          */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ paddingBottom: 'var(--space-16)', textAlign: 'center' }}>
         <h3 className="text-h3 gsap-text-reveal" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Next</h3>
         <Link href="/about-us/articles-of-faith" style={{ textDecoration: 'none' }}>
           <h2 className="text-h1 gsap-text-reveal" style={{ color: 'var(--color-text)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}>
             ARTICLES OF FAITH
           </h2>
         </Link>
      </section>

    </main>
  );
}
