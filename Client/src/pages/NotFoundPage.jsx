import { Link } from 'react-router';
import useTituloPagina from '../hooks/useTituloPagina';

export default function NotFoundPage() {
  useTituloPagina('Página no encontrada');
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
      <meta name="robots" content="noindex" />
      <p className="text-6xl font-serif font-bold text-brand mb-4">404</p>
      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink mb-3">Esta página no existe</h1>
      <p className="text-slate-500 mb-8 max-w-md">Es posible que el enlace esté mal escrito o que la página se haya movido.</p>
      <Link to="/" className="px-8 py-3 rounded-full bg-ink text-white font-semibold hover:bg-brand transition-all shadow-md">
        Volver al inicio
      </Link>
    </main>
  );
}
