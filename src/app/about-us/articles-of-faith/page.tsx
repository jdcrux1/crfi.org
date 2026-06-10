"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Page_about_us_articles_of_faith() {
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
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-text)' }}>ARTICLES OF</span>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-accent)' }}>FAITH</span>
               </h1>
            </div>

         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Intro Statement                       */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ marginTop: '5vh' }}>
         <div className="grid-12" style={{ alignItems: 'flex-start' }}>
            <div className="col-span-full md-col-start-3 md-col-span-8" style={{ textAlign: 'center' }}>
               <p className="gsap-text-reveal" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', lineHeight: 1.6, color: 'var(--color-text)', fontWeight: 300 }}>
                 The fellowship, being an inter-denominational one, is conscious of the varied interpretations of the Bible amongst devout Christians as well as the difference in the areas of emphasis and focus amongst the different denominations in matters of doctrine. The fellowship is also cognisant of the fact that the devil may exploit these differences to debilitate the fellowship. In order to guide against this potential danger, the fellowship subscribes to the following Biblical doctrines to which all members must also subscribe:
               </p>
            </div>
         </div>
      </section>

      {/* ------------------------------------- */}
      {/* 13 Articles of Faith (Grid Layout)    */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ position: 'relative' }}>
         <style>{`
           .article-card {
             background: rgba(25,25,25,0.6);
             backdrop-filter: blur(10px);
             padding: var(--space-8);
             border-radius: 8px;
             border: 1px solid rgba(255,255,255,0.03);
             position: relative;
             overflow: hidden;
             transition: all 0.4s ease;
             min-height: 250px;
             display: flex;
             flex-direction: column;
             justify-content: center;
           }
           .article-card:hover {
             border-color: var(--color-accent);
             transform: translateY(-5px);
             background: rgba(35,35,35,0.8);
           }
           .article-number {
             position: absolute;
             top: -20px;
             left: -10px;
             font-size: 14rem;
             font-weight: 900;
             line-height: 1;
             color: rgba(255,255,255,0.02);
             pointer-events: none;
             transition: color 0.4s ease;
           }
           .article-card:hover .article-number {
             color: rgba(255,255,255,0.06);
           }
           .article-text {
             position: relative;
             z-index: 2;
             font-size: 1.1rem;
             line-height: 1.7;
             color: rgba(255,255,255,0.85);
           }
         `}</style>
         
         <div className="grid-12">
            <div className="col-span-full md-col-start-2 md-col-span-10" >
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                  {[
                    "We believe that all scriptures, both New and Old Testaments, are written by the inspiration of the Holy Spirit (2 Tim. 3: 16 – 17). All the Christian teachings and the Christian attitude of the children of God are such that are established in the Holy Bible.",
                    "We believe that there is only one God who is the creator of both visible and invisible creatures and being in Trinity of God the Father, the Son and the Holy Ghost.",
                    "We believe that Jesus Christ is the Son of God who died for and took away the sins of the world and He is the Saviour of the world. We also believe Jesus Christ is God and man begotten by the Holy Spirit and born by the virgin Mary.",
                    "We believe in the existence of the Holy Spirit as the third Person in the Trinity having the same power and glory with God the Father and God the Son.",
                    "We believe that there is Satan, the devil, who seeks the downfall of every man... hence his activities must be resisted steadfastly in prayers and application of the Word of God.",
                    "We believe in the gift of personal salvation of man, made possible by the death of Jesus Christ on the cross whenever a man or woman repents from and forsakes his/her sins.",
                    "We believe in sanctification by the blood of Jesus Christ and the Word of God, in personal holiness of heart and life and in separation from the world.",
                    "We believe in divine healing by faith in God through Christ Jesus as healing is included in the atonement for our sins by Jesus Christ.",
                    "We believe in water baptism by immersion in the name of God the Father, God the Son and God the Holy Spirit as a demonstration of our association with Jesus Christ.",
                    "We believe in the baptism of the Holy Ghost accompanied by the initial physical sign of speaking in tongues as the Spirit of God gives utterance.",
                    "We believe in the resurrection of the dead, the eternal happiness of the believer in heaven and the eternal punishment of the unbeliever in hell fire.",
                    "We believe in the imminent Second Coming of Jesus Christ in physical form that will be visible to all in like manner as He was seen ascending up to heaven.",
                    "We believe in the Great Commission, which calls for a diligent, intensive and aggressive evangelisation of the whole world, especially the middle and top echelons of every society."
                  ].map((text, i) => (
                    <div key={i} className="gsap-text-reveal article-card">
                       <div className="article-number">{(i + 1).toString().padStart(2, '0')}</div>
                       <div className="article-text">
                         {text}
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
         <Link href="/about-us/why-crfi" style={{ textDecoration: 'none' }}>
           <h2 className="text-h1 gsap-text-reveal" style={{ color: 'var(--color-text)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}>
             WHY CRFI?
           </h2>
         </Link>
      </section>

    </main>
  );
}
