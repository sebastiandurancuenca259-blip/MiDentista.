import React, { useState, useEffect, useRef } from 'react';
import { 
  Stethoscope, Sparkles, ShieldCheck, Smile, Award, Zap, 
  Crown, HeartPulse, Shield, Scissors, Flame, ArrowRight, 
  CheckCircle2, Search, X, Clock, Check
} from 'lucide-react';
import gsap from 'gsap';

export const ServiceCategories = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const categories = [
    'Todos',
    'Odontología General',
    'Ortodoncia',
    'Prótesis y Rehabilitación',
    'Estética Dental',
    'Endodoncia y Cirugía',
  ];

  const services = [
    // Odontología General
    {
      id: 1,
      category: 'Odontología General',
      title: 'Consulta Diagnóstica y Evaluación',
      icon: Stethoscope,
      badge: '30 Min',
      tag: 'Inicial',
      description: 'Revisión clínica completa con diagnóstico visual y planificación del tratamiento.',
      features: ['Evaluación clínica', 'Diagnóstico preventivo', 'Plan de tratamiento personalizado'],
      fullDetails: 'Realizamos una revisión integral de la cavidad bucal para detectar caries tempranas, problemas de encías o desalineaciones, diseñando un plan de atención a tu medida.',
    },
    {
      id: 2,
      category: 'Odontología General',
      title: 'Limpieza Dental Profunda (Tartrectomía)',
      icon: Sparkles,
      badge: '45 Min',
      tag: 'Prevención',
      description: 'Remoción de sarro y placa bacteriana para encías sanas y un aliento fresco.',
      features: ['Eliminación de sarro', 'Pulido dental', 'Instrucción de higiene bucal'],
      fullDetails: 'Limpieza profesional con ultrasonido y pulido para retirar el sarro acumulado que el cepillado diario no logra eliminar, previniendo la gingivitis y enfermedad periodontal.',
    },
    {
      id: 3,
      category: 'Odontología General',
      title: 'Curaciones y Obturaciones de Resina',
      icon: ShieldCheck,
      badge: 'Mismo Día',
      tag: 'Restauración',
      description: 'Tratamiento de caries con resinas estéticas del mismo color de tu diente.',
      features: ['Resina libre de mercurio', 'Color natural', 'Restauración en una sesión'],
      fullDetails: 'Eliminamos el tejido dañado por la caries y restauramos la forma y función original del diente utilizando resinas de alta calidad que se mimetizan perfectamente con tu esmalte.',
    },

    // Ortodoncia
    {
      id: 4,
      category: 'Ortodoncia',
      title: 'Brackets Convencionales y Estéticos',
      icon: Smile,
      badge: 'Evaluación',
      tag: 'Alineación',
      description: 'Tratamiento de ortodoncia para alinear tus dientes y corregir la mordida.',
      features: ['Brackets metálicos y estéticos', 'Corrección de mordida', 'Para niños y adultos'],
      fullDetails: 'Diseñado para corregir apiñamientos y maloclusiones. Ofrecemos opciones metálicas tradicionales y cerámicas estéticas para mayor discreción durante el tratamiento.',
    },

    // Prótesis y Rehabilitación
    {
      id: 5,
      category: 'Prótesis y Rehabilitación',
      title: 'Prótesis Removibles y Definitivas',
      icon: Crown,
      badge: 'Personalizado',
      tag: 'Rehabilitación',
      description: 'Reemplazo de piezas dentales faltantes para recuperar la masticación y estética.',
      features: ['Prótesis parciales y totales', 'Materiales resistentes', 'Ajuste cómodo y natural'],
      fullDetails: 'Devolvemos la función masticatoria y la sonrisa a pacientes con ausencia de uno o varios dientes, confeccionando prótesis adaptadas a la anatomía de cada paciente.',
    },

    // Estética Dental
    {
      id: 6,
      category: 'Estética Dental',
      title: 'Blanqueamiento Dental Profesional',
      icon: Zap,
      badge: '1 Sesión',
      tag: 'Estética',
      description: 'Aclaramiento del tono de los dientes para una sonrisa brillante y renovada.',
      features: ['Aclaramiento rápido', 'Procedimiento seguro', 'Resultados visibles'],
      fullDetails: 'Tratamiento clínico seguro que reduce varios tonos del color de los dientes mediante geles blanqueadores activados de forma profesional, protegiendo la salud de tus encías.',
    },
    {
      id: 7,
      category: 'Estética Dental',
      title: 'Carillas de Resina y Diseño de Sonrisa',
      icon: Award,
      badge: 'Estética',
      tag: 'Transformación',
      description: 'Corrección de forma, tamaño y ligeros apiñamientos para mejorar la estética facial.',
      features: ['Diseño armónico', 'Corrección de bordes e imperfecciones', 'Mejora estética inmediata'],
      fullDetails: 'Modelado directo de resinas estéticas sobre la cara frontal del diente para corregir fracturas leves, manchas o formas irregulares de manera conservadora.',
    },

    // Endodoncia y Cirugía
    {
      id: 8,
      category: 'Endodoncia y Cirugía',
      title: 'Tratamiento de Conducto (Endodoncia)',
      icon: HeartPulse,
      badge: 'Alivio Dolor',
      tag: 'Urgencia',
      description: 'Tratamiento para salvar dientes con infección o inflamación de la pulpa dental.',
      features: ['Eliminación del dolor agudo', 'Conservación del diente natural', 'Sellado hermético'],
      fullDetails: 'Procedimiento enfocado en limpiar y desinfectar el interior del diente (nervio) cuando existe una caries profunda o dolor intenso, evitando así la extracción de la pieza.',
    },
    {
      id: 9,
      category: 'Endodoncia y Cirugía',
      title: 'Extracciones Dentales y Cirugía Simple',
      icon: Scissors,
      badge: 'Cuidadoso',
      tag: 'Cirugía',
      description: 'Extracción segura de piezas dentales no restaurables con técnica anestésica suave.',
      features: ['Anestesia efectiva', 'Procedimiento rápido', 'Indicaciones de recuperación'],
      fullDetails: 'Realizamos extracciones de dientes fracturados o severamente dañados priorizando el bienestar, la tranquilidad y una recuperación rápida sin dolor.',
    },
    {
      id: 10,
      category: 'Endodoncia y Cirugía',
      title: 'Atención de Urgencias Dentales',
      icon: Flame,
      badge: 'Prioritario',
      tag: 'Urgencia',
      description: 'Atención oportuna para dolores intensos, golpes, traumatismos o restauraciones caídas.',
      features: ['Alivio inmediato del dolor', 'Atención rápida', 'Solución de emergencia'],
      fullDetails: 'Si presentas un dolor agudo, inflamación o un accidente dental, te atendemos con prioridad para resolver la urgencia y calmar las molestias de inmediato.',
    },
  ];

  // Filter services by category & search query
  const filteredServices = services.filter((service) => {
    const matchesCategory = activeCategory === 'Todos' || service.category === activeCategory;
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Re-animate grid when active category or search changes
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
        }
      );
    }
  }, [activeCategory, searchQuery]);

  return (
    <section id="categories" ref={containerRef} className="py-16 lg:py-24 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Catálogo de Tratamientos</span>
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0f172a] mb-4">
          Nuestros Servicios Dentales
        </h2>
        <p className="text-base sm:text-lg font-light text-[#64748b] leading-relaxed">
          Explora nuestra variedad de tratamientos enfocados en mantener tu salud bucal y la de toda tu familia.
        </p>
      </div>

      {/* Search & Category Filter Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mb-12 bg-slate-50 p-3 sm:p-4 rounded-3xl border border-slate-200">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto flex-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0f172a] text-white shadow-md'
                  : 'bg-white text-[#64748b] hover:bg-slate-200 hover:text-[#0f172a] border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-64 lg:w-72 shrink-0">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]" />
          <input
            type="text"
            placeholder="Buscar tratamiento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-[#0f172a] focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20 transition-all placeholder:text-[#94a3b8]"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
          <p className="text-lg font-medium text-[#64748b]">No se encontraron servicios que coincidan con "{searchQuery}"</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('Todos'); }}
            className="mt-4 text-sm font-bold text-[#0ea5e9] underline hover:text-[#003852] cursor-pointer"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group rounded-3xl p-6 sm:p-8 bg-white border border-[#e2e8f0] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] smooth-hover hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300"
              >
                {/* Accent Top Line */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0f172a] via-[#0ea5e9] to-[#004666] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                <div>
                  {/* Icon & Category Tag Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-[#0f172a]/5 text-[#0f172a] flex items-center justify-center group-hover:bg-[#0f172a] group-hover:text-white smooth-hover shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-[#0f172a]">
                        {service.tag}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#0ea5e9]/10 text-[#0ea5e9]">
                        {service.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-serif font-semibold text-[#0f172a] mb-3 group-hover:text-[#0ea5e9] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm font-light text-[#64748b] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Bullet Checklist */}
                  <ul className="space-y-2 mb-8 border-t border-slate-100 pt-4">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-[#0f172a] font-medium">
                        <Check className="w-3.5 h-3.5 text-[#0ea5e9] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#0ea5e9]">
                  <span>Ver detalles del servicio</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Service Detail Modal Overlay */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#0f172a] text-white flex items-center justify-center shrink-0">
                {React.createElement(selectedService.icon, { className: 'w-7 h-7' })}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#0ea5e9]">
                  {selectedService.category}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#0f172a]">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-6 text-[#64748b] text-sm leading-relaxed border-t border-slate-100 pt-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-2">Descripción General</h4>
                <p>{selectedService.fullDetails}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-3">Beneficios Principales</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-[#0ea5e9] shrink-0" />
                      <span className="text-xs font-semibold text-[#0f172a]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0ea5e9]/5 border border-[#0ea5e9]/20 text-[#0f172a]">
                <Clock className="w-5 h-5 text-[#0ea5e9] shrink-0" />
                <div>
                  <span className="text-xs font-bold block text-[#0ea5e9]">Duración y Modalidad</span>
                  <span className="text-xs">{selectedService.badge} • Protocolos de atención sin dolor</span>
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4">
              <button
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 text-[#0f172a] text-xs font-bold uppercase tracking-wider hover:bg-slate-200 cursor-pointer"
              >
                Cerrar
              </button>
              <a
                href="#booking"
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0f172a] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0ea5e9] transition-colors text-center"
              >
                Agendar Consulta
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default ServiceCategories;