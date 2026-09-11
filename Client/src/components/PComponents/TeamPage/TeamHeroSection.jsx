import React, { useEffect, useRef } from 'react';
import { Award, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export const TeamHeroSection = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto text-center overflow-hidden">
      {/* Background Decorative Ambient Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-[#0ea5e9]/10 via-[#004c6e]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div ref={contentRef} className="max-w-4xl mx-auto flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0ea5e9] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4 text-[#0ea5e9]" />
          <span>Clinical Excellence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium leading-tight text-[#0f172a] mb-6 tracking-tight">
          The Masters of <br />
          <span className="text-gradient italic font-serif">Clinical Artistry</span>
        </h1>

        <p className="text-base sm:text-xl font-normal text-slate-800 leading-relaxed max-w-2xl mx-auto">
          Discover the clinical excellence behind DentaPremium. Our world-class specialists combine advanced 3D technology with meticulous artistry to deliver unparalleled aesthetic and surgical outcomes.
        </p>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-[#0ea5e9]">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>Board-Certified Specialists</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <span>15+ Years Clinical Experience</span>
        </div>
      </div>
    </section>
  );
};

export default TeamHeroSection;
