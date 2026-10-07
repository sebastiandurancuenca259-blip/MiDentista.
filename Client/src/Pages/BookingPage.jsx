import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import gsap from 'gsap';
import BookingForm from '../components/booking/BookingForm';
import useTituloPagina from '../hooks/useTituloPagina';

export default function BookingPage() {
  useTituloPagina('Agendar Cita');
  const [parametros] = useSearchParams();
  const pageRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(pageRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
      gsap.fromTo(cardRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power2.out' });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-widest text-brand uppercase">Atención Odontológica</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink mt-1">Reserva tu Cita</h1>
        <p className="text-slate-500 text-sm mt-1">Elige el servicio, la fecha y un horario libre; luego ingresa tus datos.</p>
      </div>

      <div ref={cardRef} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl">
        <BookingForm servicioInicial={parametros.get('servicio')} />
      </div>
    </main>
  );
}
