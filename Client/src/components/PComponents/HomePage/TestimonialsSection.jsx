import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "The level of care and attention to detail at DentaPremium is simply unmatched. They completely transformed my smile with veneers, and the entire process felt more like visiting a luxury spa than a dental clinic. Truly life-changing.",
      name: "Elena Rodriguez",
      role: "Smile Makeover Patient",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      rating: 5
    },
    {
      quote: "As someone who had severe dental anxiety, Dr. Jenkins and her team completely put me at ease with their gentle sedation techniques. My implant procedure was flawless and painless.",
      name: "Marcus Vance",
      role: "Dental Implant Patient",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      rating: 5
    },
    {
      quote: "State-of-the-art diagnostic technology combined with real human empathy. I've recommended DentaPremium to my entire family and colleagues.",
      name: "Sophia Chen",
      role: "Preventative & Cosmetic Patient",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const active = testimonials[currentIndex];

  return (
    <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-left">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-px bg-[#0ea5e9]"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Patient Stories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight text-[#0f172a]">
            Transformations That Speak for Themselves
          </h2>

          <p className="text-base sm:text-lg font-light text-[#64748b] leading-relaxed">
            Read about the life-changing experiences of our patients, and discover how a confident smile can impact every aspect of your life.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-[#e2e8f0] flex items-center justify-center hover:bg-[#0f172a] hover:text-white smooth-hover text-[#0f172a] transition-colors shadow-xs"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-[#0f172a] text-white flex items-center justify-center hover:bg-[#0ea5e9] smooth-hover shadow-lg transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <span className="text-xs font-semibold text-[#64748b] ml-2">
              0{currentIndex + 1} / 0{testimonials.length}
            </span>
          </div>
        </div>

        {/* Right Column: Card */}
        <div className="lg:col-span-7 relative">
          <div className="absolute -top-10 -left-6 text-[10rem] sm:text-[14rem] font-serif text-[#f1f5f9] leading-none select-none -z-10 opacity-70">"</div>
          
          <div className="glass-panel p-8 sm:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/80 relative z-10 text-left transition-all duration-300">
            
            <div className="flex items-center gap-1 mb-6 text-[#0ea5e9]">
              {[...Array(active.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#0ea5e9] text-[#0ea5e9]" />
              ))}
            </div>
            
            <p className="text-lg sm:text-2xl font-serif font-light text-[#0f172a] leading-relaxed mb-8 italic">
              "{active.quote}"
            </p>

            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
              <img 
                alt={active.name} 
                className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-white" 
                src={active.image}
              />
              <div>
                <p className="font-bold text-[#0f172a] text-base sm:text-lg">{active.name}</p>
                <p className="text-xs font-medium text-[#64748b]">{active.role}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
