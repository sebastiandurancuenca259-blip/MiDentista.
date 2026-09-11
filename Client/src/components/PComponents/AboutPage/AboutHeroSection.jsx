import React, { useEffect, useRef } from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import gsap from 'gsap';

export const AboutHeroSection = () => {
  const containerRef = useRef(null);
  const textColRef = useRef(null);
  const imageColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(textColRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 }
      )
      .fromTo(imageColRef.current,
        { scale: 0.95, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto overflow-hidden">
      {/* Background Decorative Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#0ea5e9]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#004c6e]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Text Content Column */}
        <div ref={textColRef} className="lg:col-span-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0ea5e9] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4 text-[#0ea5e9]" />
            <span>The DentaPremium Difference</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0f172a] leading-tight tracking-tight mb-6">
            Your Smile, <br />
            <span className="text-gradient">Our Passion.</span>
          </h1>

          <p className="text-base sm:text-lg font-normal text-slate-800 leading-relaxed mb-8 max-w-lg">
            We believe that exceptional dental care is an art form. At DentaPremium, we combine clinical precision with a serene, luxurious environment to redefine your expectations of modern dentistry.
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => window.__navigateToContact && window.__navigateToContact()}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#0f172a] text-white font-semibold text-sm tracking-wider uppercase hover:bg-[#0ea5e9] transition-all duration-300 shadow-lg active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

        {/* Image Showcase Column */}
        <div ref={imageColRef} className="lg:col-span-6 relative rounded-3xl overflow-hidden h-[380px] sm:h-[480px] lg:h-[520px] shadow-xl border border-slate-200 group">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
            alt="Modern luxury dental waiting lounge"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0ea5e9] block mb-1">
              Sanctuary of Healing
            </span>
            <p className="text-xs text-[#0f172a] font-medium leading-relaxed">
              Designed with calming aesthetics, natural light, and state-of-the-art air filtration for zero anxiety.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutHeroSection;
