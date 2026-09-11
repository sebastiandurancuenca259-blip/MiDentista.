import React, { useEffect, useRef } from 'react';
import { Star, ShieldCheck, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ReviewsStatsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
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
    <section ref={sectionRef} className="py-12 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 lg:p-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Score Column */}
          <div className="lg:col-span-4 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-200 pb-8 lg:pb-0 lg:pr-8">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-5xl sm:text-6xl font-serif font-black text-[#0f172a]">4.9</span>
              <span className="text-lg font-bold text-slate-500">out of 5.0</span>
            </div>

            <div className="flex text-amber-400 mb-3 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-base font-medium text-slate-700">
              Based on <span className="font-bold text-[#0f172a]">2,450+ verified patient reviews</span>
            </p>
          </div>

          {/* Rating Breakdown Bars Column */}
          <div className="lg:col-span-4 space-y-3 border-b lg:border-b-0 lg:border-r border-slate-200 pb-8 lg:pb-0 lg:pr-8">
            {/* 5 Star */}
            <div className="flex items-center gap-3 text-sm font-semibold text-[#0f172a]">
              <span className="w-12 text-slate-700">5 Star</span>
              <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#0f172a] rounded-full" style={{ width: '90%' }}></div>
              </div>
              <span className="w-10 text-right text-slate-600 font-bold">90%</span>
            </div>

            {/* 4 Star */}
            <div className="flex items-center gap-3 text-sm font-semibold text-[#0f172a]">
              <span className="w-12 text-slate-700">4 Star</span>
              <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#0f172a]/70 rounded-full" style={{ width: '6%' }}></div>
              </div>
              <span className="w-10 text-right text-slate-600 font-bold">6%</span>
            </div>

            {/* 3 Star */}
            <div className="flex items-center gap-3 text-sm font-semibold text-[#0f172a]">
              <span className="w-12 text-slate-700">3 Star</span>
              <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#0f172a]/40 rounded-full" style={{ width: '2%' }}></div>
              </div>
              <span className="w-10 text-right text-slate-600 font-bold">2%</span>
            </div>
          </div>

          {/* Trust Badges Column */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0f172a]">Google Trusted</h4>
                <p className="text-xs font-normal text-slate-700">4.9 Star Verified Rating</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0f172a]">Yelp Elite</h4>
                <p className="text-xs font-normal text-slate-700">Verified High-Care Standard</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReviewsStatsSection;
