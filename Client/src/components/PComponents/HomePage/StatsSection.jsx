import React from 'react';

export const StatsSection = () => {
  const features = [
    { value: "Familia", label: "Atención Niños y Adultos" },
    { value: "100%", label: "Higiene y Bioseguridad" },
    { value: "Rayos X", label: "Diagnóstico Inmediato" },
    { value: "Urgencias", label: "Atención Disponible" }
  ];

  return (
    <section className="border-y border-[#e2e8f0]/30 bg-[#f8fafc]/30">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 xl:px-40 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 divide-x-0 md:divide-x divide-[#e2e8f0]/30">
          {features.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-4 group">
              <p className="text-3xl md:text-4xl font-serif font-medium text-[#0f172a] group-hover:text-[#0ea5e9] smooth-hover mb-2">
                {item.value}
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#64748b]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;