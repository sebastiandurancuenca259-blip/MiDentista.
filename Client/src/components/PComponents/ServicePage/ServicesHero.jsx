import React, { useEffect, useRef } from 'react';
import { Sparkles, Calendar, ShieldCheck, Award, HeartHandshake, Smile } from 'lucide-react';
import gsap from 'gsap';

export const ServicesHero = () => {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, 
        { y: -15, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4 }
      )
      .fromTo(titleRef.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5 }, 
        '-=0.2'
      )
      .fromTo(textRef.current, 
        { y: 15, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4 }, 
        '-=0.3'
      )
      .fromTo(ctaRef.current, 
        { y: 15, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4 }, 
        '-=0.3'
      )
      .fromTo(statsRef.current?.children || [], 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 }, 
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Award, value: '15+', label: 'Specialized Doctors' },
    { icon: Smile, value: '10k+', label: 'Smiles Transformed' },
    { icon: HeartHandshake, value: '99.8%', label: 'Patient Satisfaction' },
    { icon: ShieldCheck, value: '100%', label: 'Pain-Free Protocol' },
  ];

  return (
    <section ref={containerRef} className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto overflow-hidden">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#0ea5e9]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#004c6e]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0ea5e9] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4 text-[#0ea5e9]" />
          <span>Comprehensive Dental Excellence</span>
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0f172a] leading-tight tracking-tight mb-6">
          Advanced Dental Care <br className="hidden sm:block" />
          <span className="text-gradient">Tailored to Your Smile</span>
        </h1>

        {/* Description */}
        <p ref={textRef} className="text-base sm:text-lg lg:text-xl font-light text-[#64748b] leading-relaxed max-w-2xl mb-10">
          Experience a new standard of clinical precision paired with ultimate comfort. From routine hygiene to full reconstructive oral surgery, we deliver world-class dental care.
        </p>

        {/* Action Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => window.__navigateToContact && window.__navigateToContact()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#0f172a] text-white font-semibold text-sm tracking-wider uppercase hover:bg-[#0ea5e9] transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
          <a
            href="#categories"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-100 text-[#0f172a] font-semibold text-sm tracking-wider uppercase hover:bg-slate-200 transition-all duration-300 active:scale-95 border border-slate-200"
          >
            <span>Explore All Services</span>
          </a>
        </div>
      </div>

      {/* Stats Bar */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md smooth-hover flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center mb-3 group-hover:scale-110 smooth-hover">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0f172a]">{item.value}</span>
              <span className="text-xs font-medium text-[#64748b] mt-1">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesHero;
