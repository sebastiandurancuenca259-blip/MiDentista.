import React, { useEffect, useRef } from 'react';
import { Cpu, Scan, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TechBentoSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto bg-slate-50/50">
      
      {/* Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">State-of-the-Art Infrastructure</span>
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0f172a] mb-4">
          Advanced Clinical Technology
        </h2>
        <p className="text-base sm:text-lg font-light text-[#64748b] leading-relaxed">
          We invest in ultra-modern digital equipment to increase treatment precision, eliminate discomfort, and drastically reduce chair time.
        </p>
      </div>

      {/* Bento Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
        
        {/* Large Feature Card 1: 3D CBCT Imaging */}
        <div className="md:col-span-2 lg:col-span-2 rounded-3xl relative overflow-hidden group shadow-md hover:shadow-xl smooth-hover border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
            alt="3D CBCT Imaging Machine"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-3">
              <Scan className="w-3.5 h-3.5 text-[#0ea5e9]" />
              <span>360° Volumetric Scans</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">3D CBCT Tomography</h3>
            <p className="text-sm font-light text-slate-200 max-w-lg leading-relaxed">
              Provides multi-dimensional views of bone density, nerve pathways, and root structures for zero-error implant & surgical planning.
            </p>
          </div>
        </div>

        {/* Bento Card 2: Laser Dentistry */}
        <div className="rounded-3xl bg-gradient-to-br from-[#004c6e] to-[#0f172a] p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-xl smooth-hover border border-cyan-900/30 text-white relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-cyan-300 mb-4">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest block mb-1">Pain-Free Healing</span>
            <h3 className="text-xl font-serif font-bold text-white mb-2">Laser Soft-Tissue Tech</h3>
            <p className="text-xs font-light text-slate-300 leading-relaxed">
              Enables suture-free gum reshaping and bacteria elimination with zero bleeding and rapid recovery.
            </p>
          </div>
        </div>

        {/* Bento Card 3: AI Digital Intraoral Scanner */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md smooth-hover border border-slate-200 relative">
          <div className="w-12 h-12 rounded-2xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center mb-4">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#0ea5e9] uppercase tracking-widest block mb-1">No Sticky Molds</span>
            <h3 className="text-xl font-serif font-bold text-[#0f172a] mb-2">AI 3D Digital Scanners</h3>
            <p className="text-xs font-light text-[#64748b] leading-relaxed">
              Captures thousands of optical 3D frames per second to create instant digital impressions for aligners & crowns.
            </p>
          </div>
        </div>

        {/* Bento Card 4: Microscopic Surgery */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md smooth-hover border border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-[#0f172a]/5 text-[#0f172a] flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#0f172a] uppercase tracking-widest block mb-1">25x Magnification</span>
            <h3 className="text-xl font-serif font-bold text-[#0f172a] mb-2">Optical Operating Microscope</h3>
            <p className="text-xs font-light text-[#64748b] leading-relaxed">
              Microscopic visualization allows micro-restorations while preserving maximum healthy tooth structure.
            </p>
          </div>
        </div>

        {/* Wide Bento Card 5: Digital Smile Simulation */}
        <div className="md:col-span-2 lg:col-span-3 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0f172a] to-[#003953] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-slate-800 text-white relative">
          <div className="space-y-3 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Predictable Outcomes</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">Digital Smile Simulation Engine</h3>
            <p className="text-sm font-light text-slate-300 max-w-md leading-relaxed">
              Try on your new smile virtually before touching a single tooth. Our DSD system aligns treatment with your unique facial anatomy.
            </p>
          </div>
          <div className="shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <span className="text-3xl font-serif font-bold text-cyan-300 block">100%</span>
            <span className="text-xs text-slate-300 uppercase font-semibold">Visual Accuracy</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechBentoSection;
