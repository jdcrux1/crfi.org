"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.fromTo('.stagger-text-in', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo('.fade-up', 
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: '.contact-content', start: "top 80%" }
        }
      );
    }, containerRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <main ref={containerRef} style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: 'var(--space-16)' }}>
      
      <section className="section-padding" style={{ paddingTop: '15vh', paddingBottom: '10vh' }}>
         <div className="grid-12">
            <div className="col-span-full" >
               <h1 className="text-h1" style={{ overflow: 'hidden' }}>
                 <span className="stagger-text-in" style={{ display: 'block' }}>GET IN</span>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-text-muted)' }}>TOUCH</span>
               </h1>
            </div>
         </div>
      </section>

      <section className="section-padding contact-content" style={{ paddingBottom: '20vh' }}>
         <div className="grid-12">
            
            {/* Left Col: Contact Info */}
            <div  className="fade-up col-span-full md-col-start-2 md-col-span-4">
               <h3 className="text-h3" style={{ marginBottom: 'var(--space-4)', color: 'var(--color-accent)' }}>Offices</h3>
               <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--color-text)', marginBottom: 'var(--space-4)' }}>
                 Christ The Redeemer&apos;s Friends International<br />
               </p>
               
               <h3 className="text-h3" style={{ marginBottom: '1rem', color: 'var(--color-accent)', marginTop: 'var(--space-4)' }}>Direct</h3>
               <a href="mailto:info@crfing.org" style={{ display: 'block', fontSize: '1.25rem', color: 'var(--color-text)', textDecoration: 'none', marginBottom: '0.5rem' }}>info@crfing.org</a>
            </div>

            {/* Right Col: Form */}
            <div  className="fade-up col-span-full md-col-start-7 md-col-span-5">
               <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <label style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Name</label>
                     <input type="text" style={{ padding: '1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--color-text)', fontSize: '1rem', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <label style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Email</label>
                     <input type="email" style={{ padding: '1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--color-text)', fontSize: '1rem', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <label style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Message</label>
                     <textarea rows={5} style={{ padding: '1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--color-text)', fontSize: '1rem', outline: 'none', resize: 'vertical' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'} />
                  </div>

                  <button type="submit" style={{ alignSelf: 'flex-start', padding: '1rem 3rem', background: 'var(--color-text)', color: 'var(--color-bg)', border: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
                    Send Message
                  </button>
               </form>
            </div>

         </div>
      </section>

    </main>
  );
}
