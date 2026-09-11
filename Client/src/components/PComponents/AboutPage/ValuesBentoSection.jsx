import React, { useEffect, useRef } from 'react';
import { Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ValuesBentoSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
          }
        }
      );

      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 95%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      
      {/* Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Core Principles</span>
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0f172a] mb-4">
          Patient-First Philosophy
        </h2>
        <p className="text-base sm:text-lg font-normal text-slate-700">
          The three foundational pillars guiding every procedure, consultation, and patient interaction at DentaPremium.
        </p>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Value 1 */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl smooth-hover hover:-translate-y-2 flex flex-col justify-between min-h-[280px] group">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center mb-6 group-hover:bg-[#0f172a] group-hover:text-white smooth-hover">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#0f172a] mb-3 group-hover:text-[#0ea5e9] smooth-hover">
              Clinical Excellence
            </h3>
            <p className="text-base font-normal text-slate-700 leading-relaxed">
              We utilize only the most advanced, evidence-based techniques and state-of-the-art technology to ensure precision in every procedure.
            </p>
          </div>
          <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0ea5e9]">
            <span>Precision Standard</span>
          </div>
        </div>

        {/* Value 2 (Dark Accent Card) */}
        <div className="bg-gradient-to-br from-[#0f172a] via-[#003852] to-[#004666] text-white p-8 sm:p-10 rounded-3xl shadow-xl hover:shadow-2xl smooth-hover hover:-translate-y-2 flex flex-col justify-between min-h-[280px] border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#0ea5e9]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md text-cyan-300 flex items-center justify-center mb-6 border border-white/10">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-3">
              Unwavering Integrity
            </h3>
            <p className="text-base font-normal text-slate-100 leading-relaxed">
              Transparent diagnoses, honest communication, and treatment plans tailored exclusively to your unique health needs and goals.
            </p>
          </div>
          <div className="pt-6 border-t border-white/10 mt-6 relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
            <span>Zero Hidden Fees</span>
          </div>
        </div>

        {/* Value 3 */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl smooth-hover hover:-translate-y-2 flex flex-col justify-between min-h-[280px] group">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center mb-6 group-hover:bg-[#0f172a] group-hover:text-white smooth-hover">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#0f172a] mb-3 group-hover:text-[#0ea5e9] smooth-hover">
              Empathetic Compassion
            </h3>
            <p className="text-base font-normal text-slate-700 leading-relaxed">
              We understand dental anxiety. Our team is dedicated to listening, reassuring, and creating a pain-free, gentle experience.
            </p>
          </div>
          <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0ea5e9]">
            <span>100% Gentle Care</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ValuesBentoSection;
