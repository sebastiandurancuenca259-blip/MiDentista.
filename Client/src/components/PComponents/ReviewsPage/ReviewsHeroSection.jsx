import React, { useEffect, useRef } from 'react';
import { Star, MessageSquarePlus } from 'lucide-react';
import gsap from 'gsap';

export const ReviewsHeroSection = () => {
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
    <section ref={containerRef} className="py-12 md:py-16 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      <div className="relative rounded-3xl overflow-hidden min-h-[420px] md:min-h-[480px] flex items-center justify-center p-8 md:p-12 shadow-2xl border border-slate-200 group">
        {/* Background Image with Dark Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.65) 0%, rgba(15, 23, 42, 0.85) 100%), url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600')`,
          }}
        ></div>

        <div ref={contentRef} className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>4.9 / 5.0 Star Reputation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight mb-6">
            What Our Patients Say
          </h1>

          <p className="text-base sm:text-xl font-normal text-slate-100 leading-relaxed max-w-2xl mx-auto mb-8">
            Experience the premium care that has earned us an unmatched reputation for clinical excellence, gentle treatment, and life-changing smiles.
          </p>

          <a
            href="#write-review"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-[#0f172a] hover:bg-[#0ea5e9] hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl active:scale-95"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Leave a Review</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsHeroSection;
