"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

const INSIGHTS = [
  {
    id: 1,
    date: "10 June 2026",
    title: "Understanding The Foundation Scripture",
    excerpt: "Ye are the light of the world. A city that is set on an hill cannot be hid. An exploration of Matthew 5:14-16.",
    image: "https://www.crfing.org/images/slider_people2.jpg"
  },
  {
    id: 2,
    date: "05 May 2026",
    title: "The Impact of Global Outreach",
    excerpt: "How our community development programs are reshaping international ministry.",
    image: "https://www.crfing.org/images/go_visionary.jpg"
  },
  {
    id: 3,
    date: "12 April 2026",
    title: "Inaugural Speech 1990: A Retrospective",
    excerpt: "Looking back at the structural beliefs that forged Christ The Redeemer's Friends International.",
    image: "https://www.crfing.org/images/slider_people2.jpg"
  }
];

export default function Insights() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.fromTo('.stagger-text-in', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo('.insight-row', 
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: '.insights-list', start: "top 80%" }
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
                 <span className="stagger-text-in" style={{ display: 'block' }}>LATEST</span>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-text-muted)' }}>INSIGHTS</span>
               </h1>
            </div>
         </div>
      </section>

      <section className="section-padding">
         <div className="grid-12 insights-list">
            
            <div className="col-span-full md-col-start-2 md-col-span-10" >
               {INSIGHTS.map((insight) => (
                 <a 
                   key={insight.id} 
                   href="#" 
                   className="insight-row"
                   style={{ 
                     display: 'flex', 
                     borderTop: '1px solid rgba(255,255,255,0.1)', 
                     padding: 'var(--space-4) 0',
                     textDecoration: 'none',
                     color: 'inherit',
                     gap: 'var(--space-4)'
                   }}
                 >
                    {/* Date */}
                    <div style={{ width: '15%', paddingTop: '0.5rem' }}>
                       <p style={{ fontSize: '0.875rem', color: 'var(--color-accent)' }}>{insight.date}</p>
                    </div>

                    {/* Title & Excerpt */}
                    <div style={{ width: '55%' }}>
                       <h2 className="text-h2" style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', marginBottom: '0.5rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}>
                         {insight.title}
                       </h2>
                       <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                         {insight.excerpt}
                       </p>
                    </div>

                    {/* Image Thumbnail */}
                    <div style={{ width: '30%' }}>
                       <div style={{ width: '100%', aspectRatio: '16/9', background: `url(${insight.image}) center/cover`, filter: 'grayscale(100%)', transition: 'filter 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'} onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%)'} />
                    </div>
                 </a>
               ))}
            </div>

         </div>
      </section>

      {/* Navigation CTA */}
      <section className="section-padding" style={{ paddingBottom: 'var(--space-16)', textAlign: 'center' }}>
         <h3 className="text-h3 gsap-text-reveal" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Next</h3>
         <Link href="/contact" style={{ textDecoration: 'none' }}>
           <h2 className="text-h1 gsap-text-reveal" style={{ color: 'var(--color-text)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}>
             CONTACT
           </h2>
         </Link>
      </section>

    </main>
  );
}
