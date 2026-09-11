import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ZenithPhilosophySection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-slate-50/80 border-y border-slate-200/60 px-6 md:px-12 lg:px-20 xl:px-32 w-full">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Column */}
          <div ref={textRef}>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-[#0ea5e9]"></span>
              <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Multi-Disciplinary Synergy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0f172a] mb-6">
              The Zenith Philosophy
            </h2>

            <div className="w-12 h-1 bg-[#0ea5e9] mb-6 rounded-full"></div>

            <div className="space-y-5 text-base sm:text-lg font-normal text-slate-800 leading-relaxed">
              <p>
                We believe that true dental mastery requires intense specialization. Each of our clinicians focuses exclusively on their chosen discipline, ensuring you receive care from an expert who has dedicated their career to perfecting a specific facet of oral health.
              </p>
              <p>
                This collaborative, multi-disciplinary approach allows us to orchestrate complex full-mouth treatments with seamless precision, minimal chair time, and unmatched aesthetic results.
              </p>
            </div>
          </div>

          {/* Image Showcase Column */}
          <div ref={imageRef} className="rounded-3xl overflow-hidden shadow-xl relative aspect-[4/3] border border-slate-200 group">
            <img
              src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=1200"
              alt="Dental team collaboration"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200';
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-lg">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0ea5e9] block mb-1">
                Collaborative Excellence
              </span>
              <p className="text-xs text-[#0f172a] font-medium leading-relaxed">
                Surgeons, prosthodontists, and ceramists working side-by-side on your custom treatment plan.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ZenithPhilosophySection;
