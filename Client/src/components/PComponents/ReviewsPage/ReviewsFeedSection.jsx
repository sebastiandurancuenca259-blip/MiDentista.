import React, { useEffect, useRef } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ReviewsFeedSection = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 95%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const reviews = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Verified Patient',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      text: '"The entire experience at DentaPremium was transformative. From the moment I walked in, the staff made me feel incredibly comfortable. The whitening treatment exceeded my expectations, and the follow-up care was exceptional. I finally have the smile I\'ve always wanted."',
      source: 'Published on Google Reviews • 2 days ago',
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'Verified Patient',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      text: '"As someone with severe dental anxiety, I was hesitant about getting my implants. Dr. Aris and his team were patient, explained every step, and used state-of-the-art 3D technology that made the procedure completely painless. Highly recommend for any major dental work."',
      source: 'Published on Yelp • 1 week ago',
    },
    {
      id: 3,
      name: 'Robert Harrison',
      role: 'Verified Patient',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      text: '"Simply the best dental clinic in the city. The attention to detail and the \'premium\' feel isn\'t just marketing—it\'s reality. From the complimentary espresso in the waiting lounge to the digital screens above the chair, they\'ve thought of everything."',
      source: 'Published on Google Reviews • 2 weeks ago',
    },
    {
      id: 4,
      name: 'Elena Rodriguez',
      role: 'Verified Patient',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      text: '"Found DentaPremium through a friend and I\'m so glad I did. The hygiene appointment was so thorough. I\'ve never had a dentist spend so much time explaining my oral health to me. Very educational and high-quality."',
      source: 'Published on Google Reviews • 1 month ago',
    },
  ];

  return (
    <section ref={containerRef} className="py-16 lg:py-24 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Unfiltered Feedback</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0f172a] mb-3">
          Real Stories from Real Patients
        </h2>
        <p className="text-base sm:text-lg font-normal text-slate-800">
          Read authentic testimonials from individuals who trusted DentaPremium with their smiles.
        </p>
      </div>

      {/* Grid of Reviews */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Header inside card */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                    }}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-[#0f172a]">{rev.name}</h4>
                    <p className="text-xs font-bold text-[#0ea5e9] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{rev.role}</span>
                    </p>
                  </div>
                </div>

                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-base font-normal text-slate-800 leading-relaxed mb-6">
                {rev.text}
              </p>
            </div>

            {/* Source footer */}
            <span className="text-xs font-medium text-slate-700 block">
              {rev.source}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
};

export default ReviewsFeedSection;
