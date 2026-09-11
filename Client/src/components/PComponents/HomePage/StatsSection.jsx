import React from 'react';

export const StatsSection = () => {
  const stats = [
    { value: "10k+", label: "Happy Patients", hasPlus: true },
    { value: "15+", label: "Years Experience", hasPlus: true },
    { value: "4.9", label: "Star Rating", hasPlus: false },
    { value: "24/7", label: "Emergency Care", hasPlus: false }
  ];

  return (
    <section className="border-y border-[#e2e8f0]/30 bg-[#f8fafc]/30">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 xl:px-40 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 divide-x-0 md:divide-x divide-[#e2e8f0]/30">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-6 group">
              <p className="text-5xl md:text-6xl font-serif font-light text-[#0f172a] group-hover:text-[#0ea5e9] smooth-hover mb-4">
                {stat.value}
              </p>
              <p className="text-xs font-medium uppercase tracking-widest text-[#64748b]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
