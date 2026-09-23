import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle, ArrowRight, ArrowLeft, Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });

  const pageRef = useRef(null);
  const cardRef = useRef(null);

  // Animación de entrada inicial
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power2.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  // Animación entre pasos
  useEffect(() => {
    if (cardRef.current && !isSubmitted) {
      gsap.fromTo(
        '.step-content',
        { opacity: 0, x: 15 },
        { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [step, isSubmitted]);

  // Generador dinámico de horarios válidos según el día
  const getAvailableSlots = (dateStr) => {
    if (!dateStr) return [];

    const [year, month, day] = dateStr.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const dayOfWeek = selectedDate.getDay(); // 0: Domingo, 6: Sábado

    // Domingo sin atención
    if (dayOfWeek === 0) return [];

    // Citas de 45 min
    // Turno mañana (08:00 a 12:00) -> Último inicio a las 11:15
    const morningSlots = ['08:00', '08:45', '09:30', '10:15', '11:15'];
    
    // Turno tarde (14:00 a 20:00) -> Último inicio a las 19:15
    const afternoonSlots = ['14:00', '14:45', '15:30', '16:15', '17:00', '17:45', '18:30', '19:15'];

    if (dayOfWeek === 6) {
      return morningSlots; // Sábados solo mañana
    }

    return [...morningSlots, ...afternoonSlots]; // Lunes a Viernes ambos turnos
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (!selectedDate) {
      setFormData({ ...formData, date: '', time: '' });
      return;
    }

    const [year, month, day] = selectedDate.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);

    if (dateObj.getDay() === 0) {
      alert('Los domingos la clínica permanece cerrada. Por favor selecciona un día de Lunes a Sábado.');
      setFormData({ ...formData, date: '', time: '' });
      return;
    }

    setFormData({ ...formData, date: selectedDate, time: '' });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.date || !formData.time) {
        alert('Por favor selecciona una fecha y un horario válido.');
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 2));
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert('Por favor completa todos tus datos de contacto.');
      return;
    }

    setLoading(true);

    const dataToInsert = {
      servicio_id: 'consulta-general',
      dentista_id: 'general',
      fecha_cita: formData.date,
      hora_cita: formData.time,
      paciente_nombre: formData.name,
      paciente_email: formData.email,
      paciente_telefono: formData.phone
    };

    try {
      const { data, error } = await supabase
        .from('citas')
        .insert([dataToInsert])
        .select();

      if (error) {
        console.error('Error al registrar en Supabase:', error);
        alert('Error al guardar la cita: ' + error.message);
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error('Error de red/servidor:', err);
      alert('Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const availableSlots = getAvailableSlots(formData.date);
  const todayStr = new Date().toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <main className="flex-1 max-w-2xl mx-auto px-6 py-20 w-full text-center">
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-10 shadow-lg flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
          <h2 className="text-3xl font-serif font-bold text-[#0f172a] mb-2">¡Cita Almacenada!</h2>
          <p className="text-slate-600 mb-6 text-sm max-w-md">
            Tu reserva ha sido registrada con éxito para el día <strong className="text-slate-800">{formData.date}</strong> a las <strong className="text-slate-800">{formData.time} hs</strong>.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ date: '', time: '', name: '', email: '', phone: '' });
              setStep(1);
            }}
            className="px-8 py-3 bg-[#0f172a] text-white font-semibold rounded-full hover:bg-[#0ea5e9] transition-all cursor-pointer shadow-md"
          >
            Reservar Otra Cita
          </button>
        </div>
      </main>
    );
  }

  return (
    <main ref={pageRef} className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-widest text-[#0ea5e9] uppercase">Atención Odontológica</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f172a] mt-1">Reserva tu Cita</h1>
        <p className="text-slate-500 text-sm mt-1">Selecciona el horario de tu preferencia e ingresa tus datos.</p>
      </div>

      <div ref={cardRef} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl">
        {/* Stepper */}
        <div className="flex justify-around items-center mb-8 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
              step === 1 ? 'bg-[#0ea5e9] text-white shadow-md' : 'bg-slate-100 text-slate-500'
            }`}>
              1
            </span>
            <span className={`text-xs font-semibold ${step === 1 ? 'text-[#0f172a]' : 'text-slate-400'}`}>
              Fecha y Hora
            </span>
          </div>

          <div className="w-12 h-[2px] bg-slate-100" />

          <div className="flex items-center gap-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
              step === 2 ? 'bg-[#0ea5e9] text-white shadow-md' : 'bg-slate-100 text-slate-500'
            }`}>
              2
            </span>
            <span className={`text-xs font-semibold ${step === 2 ? 'text-[#0f172a]' : 'text-slate-400'}`}>
              Tus Datos
            </span>
          </div>
        </div>

        {/* Pasos */}
        <div className="step-content">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-2">
                  <Calendar className="w-4 h-4 text-[#0ea5e9]" /> Fecha de Atención
                </label>
                <input
                  type="date"
                  min={todayStr}
                  className="w-full border border-slate-200 rounded-xl p-3.5 text-slate-800 focus:outline-none focus:border-[#0ea5e9] transition-all bg-slate-50/50"
                  value={formData.date}
                  onChange={handleDateChange}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-2">
                  <Clock className="w-4 h-4 text-[#0ea5e9]" /> Horario Disponible
                </label>
                <select
                  disabled={!formData.date}
                  className="w-full border border-slate-200 rounded-xl p-3.5 text-slate-800 focus:outline-none focus:border-[#0ea5e9] transition-all bg-slate-50/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                >
                  <option value="">
                    {formData.date ? '-- Selecciona un horario --' : 'Primero selecciona una fecha'}
                  </option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot} hs
                    </option>
                  ))}
                </select>
                {formData.date && availableSlots.length === 0 && (
                  <p className="text-xs text-amber-600 mt-2">
                    No hay atención disponible para la fecha seleccionada.
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-1">
                  <User className="w-3.5 h-3.5 text-[#0ea5e9]" /> Nombre completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez"
                  className="w-full border border-slate-200 rounded-xl p-3.5 text-slate-800 focus:outline-none focus:border-[#0ea5e9] transition-all bg-slate-50/50"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-1">
                  <Mail className="w-3.5 h-3.5 text-[#0ea5e9]" /> Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  className="w-full border border-slate-200 rounded-xl p-3.5 text-slate-800 focus:outline-none focus:border-[#0ea5e9] transition-all bg-slate-50/50"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-1">
                  <Phone className="w-3.5 h-3.5 text-[#0ea5e9]" /> Teléfono / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ej. +591 70000000"
                  className="w-full border border-slate-200 rounded-xl p-3.5 text-slate-800 focus:outline-none focus:border-[#0ea5e9] transition-all bg-slate-50/50"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </form>
          )}
        </div>

        {/* Navegación */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Anterior
          </button>

          {step === 2 ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-2.5 rounded-full bg-[#0ea5e9] text-white text-sm font-semibold hover:bg-sky-600 transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Almacenando...' : 'Confirmar Cita'}
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