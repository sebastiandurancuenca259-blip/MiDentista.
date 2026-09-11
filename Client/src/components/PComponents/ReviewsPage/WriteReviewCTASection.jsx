import React, { useEffect, useRef } from 'react';
import { Edit3, Calendar, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const WriteReviewCTASection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="write-review" className="pb-20 lg:pb-28 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      <div
        ref={containerRef}
        className="bg-gradient-to-br from-[#0f172a] via-[#003852] to-[#004666] rounded-3xl p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Background Decorative Orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0ea5e9]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md text-cyan-300 flex items-center justify-center mb-6 border border-white/20 shadow-lg">
            <Sparkles className="w-7 h-7" />
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Had a great experience with us?
          </h3>

          <p className="text-base sm:text-lg font-normal text-slate-100 leading-relaxed mb-8">
            Your feedback helps us continue providing the highest level of clinical care and personal comfort. Share your story with our community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <div
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0ea5e9] text-white font-bold text-xs uppercase tracking-widest cursor-default select-none shadow-xl"
            >
              <Edit3 className="w-4 h-4" />
              <span>Write a Review</span>
            </div>

            <button
              type="button"
              onClick={() => window.__navigateToContact && window.__navigateToContact()}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Visit</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WriteReviewCTASection;
