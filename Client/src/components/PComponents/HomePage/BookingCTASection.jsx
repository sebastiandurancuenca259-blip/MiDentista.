import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { Calendar, X, CheckCircle, AlertCircle } from 'lucide-react';

export const BookingCTASection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    paciente_nombre: '',
    paciente_telefono: '',
    paciente_email: '',
    fecha_cita: '',
    hora_cita: '',
    servicio_id: 'Consulta General',
    dentista_id: 'Turno General'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data, error } = await supabase
      .from('citas')
      .insert([formData]);

    setLoading(false);

    if (error) {
      console.error('Error insertando cita:', error);
      setErrorMsg(error.message);
    } else {
      setSuccess(true);
      setFormData({
        paciente_nombre: '',
        paciente_telefono: '',
        paciente_email: '',
        fecha_cita: '',
        hora_cita: '',
        servicio_id: 'Consulta General',
        dentista_id: 'Turno General'
      });
      setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
      }, 2500);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" id="booking">
      <div className="absolute inset-0 bg-[#0f172a] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.2)_0%,transparent_70%)] z-0"></div>

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 xl:px-40 relative z-10 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight text-white mb-8 max-w-3xl">
          ¿Listo para lucir una sonrisa saludable?
        </h2>
        <p className="text-xl font-light text-white/80 mb-12 max-w-2xl">
          Agenda tu cita hoy mismo y da el primer paso para cuidar la salud bucal de toda tu familia.
        </p>
        <div className="flex flex-wrap gap-6 justify-center">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center rounded-full h-16 px-12 bg-white text-[#0f172a] text-base font-medium tracking-widest uppercase hover:bg-[#f8fafc] shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>Solicitar Cita</span>
          </button>
        </div>
      </div>

      {/* Modal de Formulario con Supabase */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#0f172a]">
                Agendar Cita
              </h3>
            </div>

            {success ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
                <h4 className="text-xl font-bold text-[#0f172a]">¡Cita Registrada!</h4>
                <p className="text-sm text-slate-500">Nos pondremos en contacto contigo para confirmar la atención.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    name="paciente_nombre"
                    required
                    value={formData.paciente_nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0ea5e9]"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      name="paciente_telefono"
                      required
                      value={formData.paciente_telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0ea5e9]"
                      placeholder="Ej. 78410535"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      name="paciente_email"
                      value={formData.paciente_email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0ea5e9]"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Fecha *</label>
                    <input
                      type="date"
                      name="fecha_cita"
                      required
                      value={formData.fecha_cita}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0ea5e9]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hora *</label>
                    <input
                      type="time"
                      name="hora_cita"
                      required
                      value={formData.hora_cita}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0ea5e9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Servicio</label>
                  <select
                    name="servicio_id"
                    value={formData.servicio_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0ea5e9]"
                  >
                    <option value="Consulta General">Consulta General</option>
                    <option value="Limpieza Dental">Limpieza Dental</option>
                    <option value="Ortodoncia">Ortodoncia</option>
                    <option value="Blanqueamiento">Blanqueamiento</option>
                    <option value="Urgencia Dental">Urgencia Dental</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 mt-2 bg-[#0ea5e9] text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-[#0284c7] transition-all disabled:opacity-50"
                >
                  {loading ? 'Guardando...' : 'Confirmar Cita'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default BookingCTASection;