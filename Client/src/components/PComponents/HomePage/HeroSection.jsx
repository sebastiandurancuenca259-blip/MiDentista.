import React, { useEffect, useRef } from 'react';
import { Phone, Star, ShieldCheck, Sparkles, Award, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

export const HeroSection = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const floatingCardRef = useRef(null);
  const bgImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(bgImgRef.current, 
        { scale: 1.15, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.6 }
      )
      .fromTo(headingRef.current, 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }, 
        '-=1.0'
      )
      .fromTo(subtitleRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        '-=0.6'
      )
      .fromTo(ctaRef.current, 
        { y: 25, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        '-=0.5'
      )
      .fromTo(statsRef.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.7 }, 
        '-=0.4'
      )
      .fromTo(floatingCardRef.current, 
        { x: 30, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.9 }, 
        '-=0.7'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[85vh] flex items-center pt-6 md:pt-10 pb-16 overflow-hidden bg-white">
      {/* Background Image Layer with GSAP reveal */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={bgImgRef}
          alt="Luxury dental clinic interior" 
          className="w-full h-full object-cover origin-center" 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40 lg:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4 md:pt-6">
        
        {/* Left Main Content */}
        <div className="lg:col-span-7 flex flex-col gap-8 text-left">

          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0ea5e9] text-xs font-bold uppercase tracking-widest w-fit">
            <Sparkles className="w-4 h-4 text-[#0ea5e9]" />
            <span>World-Class Cosmetic & Surgical Dentistry</span>
          </div>

          {/* Heading */}
          <h1 ref={headingRef} className="text-5xl md:text-6xl lg:text-[5rem] font-serif font-medium leading-[1.1] tracking-tight text-[#0f172a]">
            Artistry in <br />
            <span className="text-gradient italic font-serif">Modern Dentistry</span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-lg md:text-xl font-light text-[#64748b] leading-relaxed max-w-2xl">
            Experience premium private dentistry tailored to your unique smile. State-of-the-art 3D technology meets compassionate care in a tranquil, architectural environment.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-5 mt-2">
            <button 
              type="button"
              onClick={() => window.__navigateToContact && window.__navigateToContact()}
              className="flex items-center justify-center rounded-full h-14 px-10 bg-[#0f172a] text-white text-sm font-semibold tracking-widest uppercase smooth-hover hover:bg-[#0ea5e9] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <span>Book Appointment</span>
            </button>

            <div 
              className="flex items-center justify-center rounded-full h-14 px-8 bg-slate-100/80 backdrop-blur-md text-[#0f172a] border border-slate-200 text-sm font-semibold tracking-widest uppercase cursor-default select-none shadow-xs"
            >
              <Phone className="mr-3 w-4 h-4 text-[#0ea5e9]" />
              <span>(555) 012-3456</span>
            </div>
          </div>

          {/* Trust Metrics Bar */}
          <div ref={statsRef} className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-6 max-w-xl">
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-[#0f172a]">15+</p>
              <p className="text-xs text-[#64748b] font-medium mt-1">Board Specialists</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-[#0f172a]">10k+</p>
              <p className="text-xs text-[#64748b] font-medium mt-1">Smiles Transformed</p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-lg sm:text-xl">
                <span>4.9</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <p className="text-xs text-[#64748b] font-medium mt-1">500+ Verified Reviews</p>
            </div>
          </div>

        </div>

        {/* Right Column: Floating Glassmorphic Feature Card */}
        <div ref={floatingCardRef} className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-white/85 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ea5e9]/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0f172a]">Bespoke Patient Care</h3>
                <p className="text-xs text-[#64748b]">Private Luxury Dental Clinic</p>
              </div>
            </div>

            <hr className="border-slate-100" />

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#0f172a]">100% Painless Tech</h4>
                  <p className="text-xs text-[#64748b]">Computerized micro-anesthesia & laser therapy.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#0f172a]">Same-Day Emergency</h4>
                  <p className="text-xs text-[#64748b]">Priority slots reserved daily for immediate relief.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#0f172a]">3D Digital Scanning</h4>
                  <p className="text-xs text-[#64748b]">No messy molds. Preview your smile before treatment.</p>
                </div>
              </li>
            </ul>

            <div className="p-4 rounded-2xl bg-[#0ea5e9]/5 border border-[#0ea5e9]/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <span className="w-7 h-7 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-700">JD</span>
                  <span className="w-7 h-7 rounded-full bg-sky-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-sky-800">AS</span>
                  <span className="w-7 h-7 rounded-full bg-emerald-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-800">MK</span>
                </div>
                <span className="text-xs font-semibold text-[#0f172a]">500+ Happy Patients</span>
              </div>
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
