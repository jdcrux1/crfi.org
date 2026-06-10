"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

const TEAM = [
  {
    id: 1,
    name: "Pastor Enoch Adeboye",
    role: "The Visionary",
    image: "https://www.crfing.org/images/go_visionary.jpg",
  },
  {
    id: 2,
    name: "Rev. Dr. Olubi Johnson",
    role: "Global Overseer",
    image: "https://www.crfing.org/images/slider_people2.jpg",
  },
  {
    id: 3,
    name: "Pastor Folu Adeboye",
    role: "Director of Outreach",
    image: "https://www.crfing.org/images/go_visionary.jpg",
  },
  {
    id: 4,
    name: "Executive Council",
    role: "International Board",
    image: "https://www.crfing.org/images/slider_people2.jpg",
  }
];

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
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

      gsap.fromTo('.team-card', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.team-grid',
            start: "top 80%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <main ref={containerRef} style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: 'var(--space-16)' }}>
      
      {/* ------------------------------------- */}
      {/* Page Header                           */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ paddingTop: '15vh', paddingBottom: '10vh' }}>
         <div className="grid-12">
            <div className="col-span-full" >
               <h1 className="text-h1" style={{ overflow: 'hidden' }}>
                 <span className="stagger-text-in" style={{ display: 'block' }}>OUR</span>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-text-muted)' }}>PEOPLE</span>
               </h1>
            </div>
         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Team Grid                             */}
      {/* ------------------------------------- */}
      <section className="section-padding">
         <div className="grid-12 team-grid" style={{ rowGap: 'var(--space-8)' }}>
            
            {TEAM.map((member) => (
              <div 
                key={member.id} 
                className="team-card" 
                style={{ 
                  gridColumn: 'span 3', // 4 columns on desktop
                  position: 'relative'
                }}
              >
                 <a href="#" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                   
                   {/* Image Container */}
                   <div style={{ 
                     width: '100%', 
                     aspectRatio: '3/4', 
                     overflow: 'hidden',
                     position: 'relative',
                     background: 'var(--color-primary)',
                     marginBottom: 'var(--space-2)'
                   }}>
                      <div 
                         style={{
                           width: '100%',
                           height: '100%',
                           backgroundImage: `url(${member.image})`,
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                           filter: 'grayscale(100%)',
                           transition: 'transform 0.5s ease, filter 0.5s ease'
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.transform = 'scale(1.05)';
                           e.currentTarget.style.filter = 'grayscale(0%)';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.transform = 'scale(1)';
                           e.currentTarget.style.filter = 'grayscale(100%)';
                         }}
                      />
                   </div>

                   {/* Meta Data */}
                   <div>
                      <h3 className="text-h3" style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                        {member.name}
                      </h3>
                      <p style={{ 
                        fontSize: '0.875rem', 
                        color: 'var(--color-text-muted)'
                      }}>
                        {member.role}
                      </p>
                   </div>

                 </a>
              </div>
            ))}

         </div>
      </section>

      {/* Navigation CTA */}
      <section className="section-padding" style={{ paddingBottom: 'var(--space-16)', textAlign: 'center' }}>
         <h3 className="text-h3 gsap-text-reveal" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Next</h3>
         <Link href="/insights" style={{ textDecoration: 'none' }}>
           <h2 className="text-h1 gsap-text-reveal" style={{ color: 'var(--color-text)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}>
             INSIGHTS
           </h2>
         </Link>
      </section>

    </main>
  );
}
