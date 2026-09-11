import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../supabaseClient';

const SERVICES = [
  { id: 's1', name: 'Limpieza Profiláctica', time: '45 min', price: '$60' },
  { id: 's2', name: 'Valoración Diagnóstica 3D', time: '30 min', price: '$45' },
  { id: 's3', name: 'Diseño de Sonrisa', time: '60 min', price: '$120' },
  { id: 's4', name: 'Blanqueamiento LED', time: '60 min', price: '$180' }
];

const DOCTORS = [
  { id: 'd1', name: 'Dr. Alejandro Vance', spec: 'Ortodoncia' },
  { id: 'd2', name: 'Dra. Elena Rostova', spec: 'Estética Dental' },
  { id: 'd3', name: 'Dr. Carlos Mendoza', spec: 'Odontopediatría' }
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceId: 's1',
    doctorId: 'd1',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });

  const pageRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.2, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (cardRef.current && !isSubmitted) {
      gsap.fromTo(
        '.step-content',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [step, isSubmitted]);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  // Función de envío conectada directamente a Supabase
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const dataToInsert = {
      servicio_id: formData.serviceId || 's1',
      dentista_id: formData.doctorId || 'd1',
      fecha_cita: formData.date || new Date().toISOString().split('T')[0],
      hora_cita: formData.time || '10:00:00',
      paciente_nombre: formData.name || 'Sin Nombre',
      paciente_email: formData.email || 'sin@email.com',
      paciente_telefono: formData.phone || '00000000'
    };

    console.log('Enviando datos a Supabase:', dataToInsert);

    try {
      const { data, error } = await supabase
        .from('citas')
        .insert([dataToInsert])
        .select();

      if (error) {
        console.error('Error al insertar en Supabase:', error);
        alert('Error en Supabase: ' + error.message);
      } else {
        console.log('Cita guardada con éxito:', data);
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error('Error inesperado:', err);
      alert('Error inesperado: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="flex-1 max-w-3xl mx-auto px-6 py-20 w-full text-center">
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-10 shadow-sm flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
          <h2 className="text-3xl font-serif font-bold text-[#0f172a] mb-2">¡Reserva Registrada en Supabase!</h2>
          <p className="text-slate-600 mb-6">
            La cita ha sido almacenada correctamente en tu base de datos.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setStep(1);
            }}
            className="px-8 py-3 bg-[#0f172a] text-white font-semibold rounded-full hover:bg-[#0ea5e9] transition-all cursor-pointer"
          >
            Hacer Otra Reserva
          </button>
        </div>
      </main>
    );
  }

  return (
    <main ref={pageRef} className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold tracking-widest text-[#0ea5e9] uppercase">Citas en línea</span>
        <h1 className="text-4xl font-serif font-bold text-[#0f172a] mt-1">Reserva tu Consulta</h1>
        <p className="text-slate-500 mt-2">Gestiona tu atención personalizada en solo unos minutos.</p>
      </div>

      <div ref={cardRef} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-xl backdrop-blur-md">
        {/* Stepper */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
          {['Servicio', 'Especialista', 'Fecha u Hora', 'Datos'].map((label, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
                step === idx + 1 ? 'bg-[#0ea5e9] text-white shadow-md' : 'bg-slate-100 text-slate-400'
              }`}>
                {idx + 1}
              </span>
              <span className="hidden sm:inline text-xs font-medium text-slate-600">{label}</span>
            </div>
          ))}
        </div>

        {/* Contenido Dinámico */}
        <div className="step-content">
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setFormData({ ...formData, serviceId: s.id })}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                    formData.serviceId === s.id ? 'border-[#0ea5e9] bg-sky-50/50 shadow-md' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <h3 className="font-semibold text-[#0f172a]">{s.name}</h3>
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>{s.time}</span>
                    <span className="text-[#0ea5e9] font-bold">{s.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {DOCTORS.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setFormData({ ...formData, doctorId: doc.id })}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                    formData.doctorId === doc.id ? 'border-[#0ea5e9] bg-sky-50/50 shadow-md' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <h3 className="font-semibold text-[#0f172a] text-sm">{doc.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{doc.spec}</p>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Fecha</label>
                <input
                  type="date"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#0ea5e9] transition-all"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Hora</label>
                <input
                  type="time"
                  className="w-full border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#0ea5e9] transition-all"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Nombre completo"
                className="w-full border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#0ea5e9] transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                required
                placeholder="Correo electrónico"
                className="w-full border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#0ea5e9] transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="tel"
                required
                placeholder="Teléfono / WhatsApp"
                className="w-full border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#0ea5e9] transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </form>
          )}
        </div>

        {/* Navegación entre pasos */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 text-sm font-medium disabled:opacity-40 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Anterior
          </button>
          
          {step === 4 ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-2.5 rounded-full bg-[#0ea5e9] text-white text-sm font-semibold hover:bg-sky-600 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Guardando en BD...' : 'Confirmar Cita'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-2.5 rounded-full bg-[#0f172a] text-white text-sm font-semibold hover:bg-[#0ea5e9] transition-all shadow-md cursor-pointer"
            >
              Siguiente <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}