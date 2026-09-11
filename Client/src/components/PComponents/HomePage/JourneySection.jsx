import React from 'react';

export const JourneySection = () => {
  const steps = [
    {
      num: "01",
      title: "Consultation",
      desc: "Comprehensive discussion of your goals, medical history, and a detailed examination using 3D digital imaging.",
      offset: false
    },
    {
      num: "02",
      title: "Planning",
      desc: "Bespoke treatment design utilizing digital smile architecture to preview your final aesthetic results.",
      offset: true
    },
    {
      num: "03",
      title: "Treatment",
      desc: "Gentle execution in our private clinical suites, utilizing world-class ceramic materials and painless techniques.",
      offset: false
    },
    {
      num: "04",
      title: "Follow-up",
      desc: "Ongoing preventative maintenance and post-care programs to ensure long-lasting oral health and brilliance.",
      offset: true
    }
  ];

  return (
    <section className="py-24 lg:py-32 w-full bg-[#f8fafc]" id="journey">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 xl:px-32">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20 gap-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-px bg-[#0ea5e9]"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">The Patient Journey</span>
            <span className="w-8 h-px bg-[#0ea5e9]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight text-[#0f172a]">
            Step-by-Step Excellence
          </h2>
          <p className="text-base sm:text-lg font-light text-[#64748b] leading-relaxed max-w-xl">
            A seamless, transparent treatment roadmap designed around your comfort and individual desires.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-[#e2e8f0] -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 lg:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center text-center group bg-white md:bg-transparent p-6 md:p-0 rounded-2xl border border-slate-100 md:border-none shadow-xs md:shadow-none ${step.offset ? 'md:mt-10' : ''}`}
              >
                <div className="w-16 h-16 rounded-full bg-white border-2 border-[#0f172a] text-[#0f172a] flex items-center justify-center text-xl font-serif font-bold mb-6 group-hover:bg-[#0f172a] group-hover:text-white smooth-hover shadow-md transition-all duration-300">
                  {step.num}
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3 text-[#0f172a]">{step.title}</h3>
                <p className="text-[#64748b] font-light text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default JourneySection;
