import React, { useEffect, useRef } from 'react';
import { Sparkles, Quote } from 'lucide-react';
import gsap from 'gsap';

export const ContactHeroSection = () => {
  const containerRef = useRef(null);
  const textColRef = useRef(null);
  const imageColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (textColRef.current) {
        tl.fromTo(
          textColRef.current.children,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }
        );
      }

      if (imageColRef.current) {
        tl.fromTo(
          imageColRef.current,
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8 },
          '-=0.4'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-6 pb-12 lg:pt-10 lg:pb-16 px-4 md:px-8 lg:px-16 xl:px-24 w-full max-w-[1440px] mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Text Content Column */}
        <div ref={textColRef} className="lg:col-span-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0ea5e9] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4 text-[#0ea5e9]" />
            <span>Concierge Patient Care</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0f172a] leading-tight tracking-tight mb-6">
            Get in Touch <br />
            <span className="text-gradient italic font-serif">The Art of Personalized Care</span>
          </h1>

          <p className="text-base sm:text-lg font-normal text-slate-800 leading-relaxed max-w-lg">
            Experience dental care redefined. We invite you to begin your journey towards profound clinical excellence and serene aesthetics.
          </p>
        </div>

        {/* Image Showcase Column with Floating Quote Card */}
        <div ref={imageColRef} className="lg:col-span-6 relative">
          <div className="aspect-[4/3] sm:aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group relative">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
              alt="Serene luxury waiting sanctuary"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200';
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent"></div>
          </div>

          {/* Floating Quote Box */}
          <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-xl max-w-xs hidden sm:flex items-start gap-3">
            <Quote className="w-6 h-6 text-[#0ea5e9] shrink-0 mt-0.5" />
            <p className="text-xs font-serif italic text-[#0f172a] leading-relaxed">
              "A sanctuary for your smile, where precision meets tranquility."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactHeroSection;
