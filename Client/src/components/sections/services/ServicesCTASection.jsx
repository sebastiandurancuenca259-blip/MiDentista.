import { Link } from 'react-router';
import { Calendar, ArrowRight, ShieldCheck, Clock, Award, MessageCircle } from 'lucide-react';
import { enlaceWhatsApp } from '../../../lib/whatsapp';

export const ServicesCTASection = () => {
  return (
    <section className="py-16 lg:py-24 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-br from-ink via-deep to-deep-2 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
            <Award className="w-4 h-4 text-cyan-300" />
            <span>¿Listo para renovar tu sonrisa?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-6">
            Agenda tu Consulta Odontológica Hoy Mismo
          </h2>

          <p className="text-base sm:text-lg font-light text-slate-200 leading-relaxed mb-10 max-w-2xl">
            Recibe una atención dental con calidez y tecnología. Solicita tu cita en segundos o escríbenos directamente a WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
            <Link
              to="/agendar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-brand text-white font-bold text-sm uppercase tracking-wider hover:bg-brand-dark transition-all duration-300 shadow-lg active:scale-95"
            >
              <Calendar className="w-5 h-5" />
              <span>Agendar Cita</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={enlaceWhatsApp('¡Hola! Quisiera solicitar una cita de evaluación odontológica. ¿Tienen horarios disponibles?')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-whatsapp hover:bg-whatsapp-dark text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Directo</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 w-full text-xs text-slate-300 font-medium">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>Atención Personalizada</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>Espacios para Urgencias</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>Profesionales Capacitados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTASection;
