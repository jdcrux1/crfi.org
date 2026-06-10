"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

const PROJECTS = [
  {
    id: 1,
    title: "Global Summit 2025",
    category: "Leadership & Outreach",
    image: "https://www.crfing.org/images/slider_people2.jpg",
  },
  {
    id: 2,
    title: "Community Action Initiative",
    category: "Community Development",
    image: "https://www.crfing.org/images/go_visionary.jpg",
  },
  {
    id: 3,
    title: "Youth Empowerment Program",
    category: "Education",
    image: "https://www.crfing.org/images/slider_people2.jpg",
  },
  {
    id: 4,
    title: "International Missions",
    category: "Global Faith",
    image: "https://www.crfing.org/images/go_visionary.jpg",
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Staggered Text In
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

      // Card Stagger Reveal
      gsap.fromTo('.project-card', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.projects-grid',
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
                 <span className="stagger-text-in" style={{ display: 'block' }}>OUR LATEST</span>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-text-muted)' }}>OUTREACH & EVENTS</span>
               </h1>
            </div>
         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Projects Grid                         */}
      {/* ------------------------------------- */}
      <section className="section-padding">
         <div className="grid-12 projects-grid">
            
            {PROJECTS.map((project, index) => {
              // Asymmetrical Grid Logic
              // Card 1: 5 cols. Card 2: 6 cols (offset). Card 3: 7 cols. Card 4: 4 cols.
              let columnLayout = "";
              if (index % 4 === 0) columnLayout = "1 / span 5";
              if (index % 4 === 1) columnLayout = "7 / span 6";
              if (index % 4 === 2) columnLayout = "2 / span 7";
              if (index % 4 === 3) columnLayout = "10 / span 3";

              return (
                <div 
                  key={project.id} 
                  className="project-card" 
                  style={{ 
                    gridColumn: columnLayout, 
                    marginBottom: 'var(--space-8)',
                    position: 'relative'
                  }}
                >
                   {/* Using standard anchor tags styling to bypass routing limits in this demo */}
                   <a href={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} className="group">
                     
                     {/* Image Container with Hover Zoom */}
                     <div style={{ 
                       width: '100%', 
                       aspectRatio: index % 2 === 0 ? '4/5' : '16/9', 
                       overflow: 'hidden',
                       position: 'relative',
                       background: 'var(--color-primary)'
                     }}>
                        <div 
                           className="project-image"
                           style={{
                             width: '100%',
                             height: '100%',
                             backgroundImage: `url(${project.image})`,
                             backgroundSize: 'cover',
                             backgroundPosition: 'center',
                             filter: 'grayscale(100%)',
                             transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), filter 0.8s'
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
                     <div style={{ marginTop: 'var(--space-2)' }}>
                        <p style={{ 
                          fontSize: '0.875rem', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.05em',
                          color: 'var(--color-accent)',
                          marginBottom: '0.5rem'
                        }}>
                          {project.category}
                        </p>
                        <h3 className="text-h3" style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)' }}>
                          {project.title}
                        </h3>
                     </div>

                   </a>
                </div>
              );
            })}

         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Navigation CTA (Next Page)          */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ paddingBottom: 'var(--space-16)', textAlign: 'center' }}>
         <h3 className="text-h3 gsap-text-reveal" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Next</h3>
         <Link href="/team" style={{ textDecoration: 'none' }}>
           <h2 className="text-h1 gsap-text-reveal" style={{ color: 'var(--color-text)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}>
             OUR PEOPLE
           </h2>
         </Link>
      </section>

    </main>
  );
}
