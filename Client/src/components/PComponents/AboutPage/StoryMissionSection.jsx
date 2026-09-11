import React, { useEffect, useRef } from 'react';
import { Heart, Target, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StoryMissionSection = () => {
  const sectionRef = useRef(null);
  const storyRef = useRef(null);
  const missionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(storyRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
          }
        }
      );

      gsap.fromTo(missionRef.current,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-slate-50/70 py-20 lg:py-28 px-6 md:px-12 lg:px-20 xl:px-32 w-full">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          
          {/* Our Story Column */}
          <div ref={storyRef} className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-[#0ea5e9]"></span>
              <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Legacy & Origin</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f172a] mb-6">
              Our Story
            </h2>

            <div className="space-y-5 text-base sm:text-lg font-normal text-slate-800 leading-relaxed">
              <p>
                Founded on an unwavering commitment to uncompromising clinical quality, DentaPremium began with a clear vision: to elevate the dental experience from an intimidating medical chore into a comforting, specialized service.
              </p>
              <p>
                Our founding surgeons recognized that anxiety and sterile, cold clinical environments often deterred patients from seeking the care they deserved. We set out to build a sanctuary of oral health—a place where cutting-edge 3D technology meets warm, compassionate attention.
              </p>
            </div>
          </div>

          {/* Our Mission Column */}
          <div ref={missionRef} className="flex flex-col justify-center">
            <div className="bg-white p-8 sm:p-10 lg:p-12 rounded-3xl border border-slate-200/80 shadow-lg relative overflow-hidden flex flex-col justify-between h-full group">
              <Quote className="w-20 h-20 text-slate-100 absolute top-4 right-4 -z-0 pointer-events-none group-hover:text-[#0ea5e9]/10 transition-colors" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center mb-6 shadow-xs">
                  <Heart className="w-7 h-7" />
                </div>

                <div className="inline-flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-[#0ea5e9]" />
                  <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Our Core Mission</span>
                </div>

                <p className="text-xl sm:text-2xl font-serif italic text-[#0f172a] leading-relaxed mb-6">
                  "To provide world-class, bespoke dental care in an environment that prioritizes patient comfort, trust, and clinical excellence above all else."
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 relative z-10 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748b]">DentaPremium Executive Board</span>
                <span className="w-2 h-2 rounded-full bg-[#0ea5e9]"></span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoryMissionSection;
