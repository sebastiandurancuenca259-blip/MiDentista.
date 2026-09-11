import React, { useEffect, useRef } from 'react';
import { Calendar, Award, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SpecialistsShowcaseSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.specialist-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const specialists = [
    {
      id: 1,
      role: 'Implantologist & Lead Clinician',
      name: 'Dr. Sarah Jenkins',
      tags: ['Full-Mouth Rehab', 'Bone Grafting', '15+ Yrs Exp'],
      bio: 'With over 15 years of dedicated experience in complex implantology, Dr. Jenkins specializes in full-mouth rehabilitation and advanced bone grafting. Her meticulous approach ensures functional longevity and aesthetic perfection for every patient.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000',
      alignment: 'normal',
    },
    {
      id: 2,
      role: 'Microscopic Endodontist',
      name: 'Dr. Marcus Thorne',
      tags: ['Root Canal Therapy', 'Microsurgery', 'Pain-Free Tech'],
      bio: 'Dr. Thorne is a leading expert in microscopic root canal therapy. Utilizing state-of-the-art 3D imaging and micro-invasive techniques, he focuses on pain-free procedures and saving compromised natural dentition with supreme accuracy.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000',
      alignment: 'reverse',
    },
    {
      id: 3,
      role: 'Cosmetic Dentist & Architect',
      name: 'Dr. Elena Rostova',
      tags: ['Smile Design', 'Ultra-Thin Veneers', 'Aesthetic Harmony'],
      bio: 'Renowned for her architectural approach to smile design, Dr. Rostova blends fine artistry with clinical science. She specializes in ultra-thin veneers and non-destructive aesthetic enhancements, delivering radiant results tailored to individual facial harmony.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000',
      alignment: 'normal',
    },
  ];

  return (
    <section ref={containerRef} className="py-20 lg:py-28 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Specialist Roster</span>
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0f172a] mb-4">
          Meet Our Clinicians
        </h2>
        <p className="text-base sm:text-lg font-normal text-slate-800">
          World-renowned specialists dedicated to crafting your healthiest, most radiant smile.
        </p>
      </div>

      {/* Profiles Showcase */}
      <div className="space-y-24 sm:space-y-32">
        {specialists.map((doc) => {
          const isReverse = doc.alignment === 'reverse';
          return (
            <div
              key={doc.id}
              className={`specialist-card grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center`}
            >
              {/* Image Column */}
              <div
                className={`lg:col-span-5 relative group ${
                  isReverse ? 'order-1 lg:order-2' : ''
                }`}
              >
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl relative z-10 border border-slate-200 group-hover:-translate-y-1.5 transition-transform duration-500 bg-slate-100">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 flex items-center justify-between text-xs font-bold text-[#0f172a]">
                    <span className="flex items-center gap-1.5 text-[#0ea5e9]">
                      <Award className="w-4 h-4" /> Board Certified
                    </span>
                    <span className="text-slate-600">DentaPremium Faculty</span>
                  </div>
                </div>
                {/* Decorative Offset Background Box */}
                <div className={`absolute -bottom-6 ${isReverse ? '-left-6' : '-right-6'} w-full h-full bg-slate-100 rounded-3xl -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500`}></div>
              </div>

              {/* Details Column */}
              <div
                className={`lg:col-span-7 flex flex-col justify-center ${
                  isReverse ? 'order-2 lg:order-1 lg:text-right lg:items-end' : ''
                }`}
              >
                <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9] mb-3 block">
                  {doc.role}
                </span>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0f172a] mb-6">
                  {doc.name}
                </h3>

                {/* Skill Pills */}
                <div className={`flex flex-wrap gap-2.5 mb-6 ${isReverse ? 'justify-start lg:justify-end' : ''}`}>
                  {doc.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold uppercase tracking-wider border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bio text with high contrast */}
                <p className="text-base sm:text-lg font-normal text-slate-800 leading-relaxed mb-8 max-w-2xl">
                  {doc.bio}
                </p>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={() => window.__navigateToContact && window.__navigateToContact()}
                  className="w-fit inline-flex items-center justify-center h-13 px-8 rounded-full bg-[#0f172a] text-white hover:bg-[#0ea5e9] transition-all duration-300 text-xs font-bold tracking-widest uppercase gap-3 shadow-md active:scale-95 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation with {doc.name.split(' ')[1]}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default SpecialistsShowcaseSection;
