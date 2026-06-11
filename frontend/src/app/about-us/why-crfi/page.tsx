"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Page_about_us_articles_of_faith_2() {
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
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-text)' }}>WHY</span>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-accent)' }}>CRFI?</span>
               </h1>
            </div>

         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Sticky Content Layout                 */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ marginTop: '5vh' }}>
         <div className="grid-12" style={{ alignItems: 'flex-start', position: 'relative' }}>
            
            {/* Left Column (Sticky Sidebar Quote) */}
            <div className="col-span-full md-col-start-2 md-col-span-4" style={{ position: 'sticky', top: '15vh' }}>
               <div className="gsap-text-reveal" style={{ background: 'var(--color-primary)', padding: 'var(--space-8)', borderRadius: '8px', borderLeft: '4px solid var(--color-accent)' }}>
                  <div style={{ fontSize: '4rem', color: 'var(--color-accent)', opacity: 0.3, lineHeight: 0.5, marginBottom: 'var(--space-4)' }}>"</div>
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text)', fontStyle: 'italic', marginBottom: 'var(--space-4)' }}>
                    I exhort therefore, that, first of all, supplications, prayers, intercessions, and giving of thanks, be made for all men; For kings, and for all that are in authority; that we may lead a quiet and peaceable life in all godliness and honesty. For this is good and acceptable in the sight of God our Saviour...
                  </p>
                  <h4 style={{ color: 'var(--color-accent)', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.05em' }}>— 1 Timothy 2:1-6</h4>
               </div>
            </div>

            {/* Right Column (Scrolling Points) */}
            <div className="col-span-full md-col-start-7 md-col-span-5" >
               <style>{`
                 .reason-card {
                   padding: var(--space-6);
                   border-bottom: 1px solid rgba(255,255,255,0.05);
                   transition: all 0.3s ease;
                   position: relative;
                 }
                 .reason-card:hover {
                   background: rgba(255,255,255,0.02);
                   transform: translateX(10px);
                 }
                 .reason-card::before {
                   content: '';
                   position: absolute;
                   left: 0;
                   top: 0;
                   bottom: 0;
                   width: 2px;
                   background: var(--color-accent);
                   transform: scaleY(0);
                   transition: transform 0.3s ease;
                   transform-origin: top;
                 }
                 .reason-card:hover::before {
                   transform: scaleY(1);
                 }
               `}</style>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[
                    "The creation of CRFI is simply to ensure efficiency in evangelism through division of labour. We have children evangelism, youth evangelism, singles evangelism... to cater for each segment of people.",
                    "Those at the top echelon of the society are among the least reach in the normal run of church evangelism due to their tight schedules, protocol, and security.",
                    "The power, position, wealth and influence of CRFI target audience are wrongly being equated to mean salvation. CRFI is created to correct this wrong mental disposition.",
                    "Despite the exalted positions of CRFI target audience, they are first and foremost human beings who are subject to all human afflictions and frailties hence they need healing miracles, deliverance, and divine protection.",
                    "In our journey of life, we all need a supernatural being to guide and protect us to ensure success and progress. Only Jesus can adequately perform this role.",
                    "Those at the top echelon of the society control our lives by the laws they make and they also control our resources... If only for our own selfish reasons, we need to bring them to the knowledge of the saving grace of God.",
                    "Leaders have a spiritual umbrella over their followers which can be for good or for bad. Satan and his demons are spirits... They control a community by controlling the head. When such a leader is converted, the spiritual atmosphere changes. This makes CRFI evangelism a spiritual warfare.",
                    "Evangelising people at the top calls for self-confidence, good communication ability and above average intelligence. A member must belong to the middle or upper echelon of the society.",
                    "CRFI modus operandi is scriptural as its mode of evangelism has many examples in the Bible... Apostle Paul proclaimed the gospel to King Agrippa and Governor Festus not in a church but in a one-on-one meeting in the palace.",
                    "CRFI members are not money bags but they are rich in Christ (Phil. 4:19). The active participation of members in the fellowship activities takes precedence over financial considerations.",
                    "CRFI is not a church but an independent, self-governing inter-denominational evangelistic fellowship serving as the recruiting arm of the body of Christ worldwide. Our members have their respective local churches.",
                    "There is synergy in CRFI evangelism. The conversion of a member of our target audience can lead to the salvation of many souls without further effort."
                  ].map((text, i) => (
                    <div key={i} className="gsap-text-reveal reason-card">
                       <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.1)' }}>
                            {(i + 1).toString().padStart(2, '0')}
                          </div>
                          <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--color-text)', margin: 0, fontWeight: 300 }}>
                            {text}
                          </p>
                       </div>
                    </div>
                  ))}
               </div>

               {/* Outro Paragraph */}
               <div className="gsap-text-reveal" style={{ marginTop: 'var(--space-8)', padding: 'var(--space-6)', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                 <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text)', textAlign: 'justify' }}>
                   In view of the foregoing, we urge every believer to be part and/or support this fellowship and ensure the success of her activities in our different areas of influence. The success of the fellowship will engender a peaceful, fruitful, rewarding, fulfilling and victorious life in this world and more importantly a blissful life in eternity with Jesus Christ. This is the true definition of success that every living being should strive to attain.
                 </p>
               </div>

            </div>
         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Navigation CTA (Next Page)          */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ paddingBottom: 'var(--space-16)', textAlign: 'center' }}>
         <h3 className="text-h3 gsap-text-reveal" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Next</h3>
         <Link href="/about-us/foundation-scripture" style={{ textDecoration: 'none' }}>
           <h2 className="text-h1 gsap-text-reveal" style={{ color: 'var(--color-text)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}>
             FOUNDATION SCRIPTURE
           </h2>
         </Link>
      </section>

    </main>
  );
}
