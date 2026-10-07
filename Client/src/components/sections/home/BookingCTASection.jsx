import { lazy, Suspense, useState } from 'react';
import { Calendar } from 'lucide-react';
import Modal from '../../ui/Modal';

// El formulario (y el cliente de Supabase) solo se descargan al abrir el modal.
const BookingForm = lazy(() => import('../../booking/BookingForm'));

export const BookingCTASection = () => {
  const [abierto, setAbierto] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden" id="booking">
      <div className="absolute inset-0 bg-ink z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.2)_0%,transparent_70%)] z-0"></div>

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 xl:px-40 relative z-10 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight text-white mb-8 max-w-3xl">
          ¿Listo para lucir una sonrisa saludable?
        </h2>
        <p className="text-xl font-light text-white/80 mb-12 max-w-2xl">
          Agenda tu cita hoy mismo y da el primer paso para cuidar la salud bucal de toda tu familia.
        </p>
        <button
          type="button"
          onClick={() => setAbierto(true)}
          className="flex items-center justify-center rounded-full h-16 px-12 bg-white text-ink text-base font-medium tracking-widest uppercase hover:bg-slate-50 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          Solicitar Cita
        </button>
      </div>

      <Modal abierto={abierto} onCerrar={() => setAbierto(false)} titulo="Agendar Cita" icono={Calendar} className="max-w-2xl">
        <Suspense fallback={<p className="py-10 text-center text-sm text-slate-500">Cargando formulario…</p>}>
          <BookingForm />
        </Suspense>
      </Modal>
    </section>
  );
};

export default BookingCTASection;
