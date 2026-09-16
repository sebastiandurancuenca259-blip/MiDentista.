export const StatsSection = () => {
  const features = [
    { value: "Familia", label: "Atención Niños y Adultos" },
    { value: "100%", label: "Higiene y Bioseguridad" },
    { value: "Rayos X", label: "Diagnóstico Inmediato" },
    { value: "Urgencias", label: "Atención Disponible" }
  ];

  return (
    <section className="border-y border-line/30 bg-slate-50/30">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 xl:px-40 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 divide-x-0 md:divide-x divide-line/30">
          {features.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-4 group">
              <p className="text-3xl md:text-4xl font-serif font-medium text-ink group-hover:text-brand smooth-hover mb-2">
                {item.value}
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
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