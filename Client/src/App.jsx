import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollManager from './components/layout/ScrollManager';
import ClinicSchema from './components/seo/ClinicSchema';
import HomePage from './pages/HomePage';
import { iniciarScrollSuave } from './lib/smoothScroll';

// Las páginas que no son el inicio se cargan en diferido: el visitante que
// entra al inicio no descarga el panel de administración ni el cliente de Supabase.
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function CargandoPagina() {
  return (
    <div className="flex-1 min-h-[60vh] flex items-center justify-center" role="status">
      <span className="w-8 h-8 border-4 border-brand/20 border-t-brand rounded-full animate-spin" />
      <span className="sr-only">Cargando…</span>
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const enAdmin = pathname.startsWith('/admin');

  useEffect(() => iniciarScrollSuave(), []);

  return (
    <div className="min-h-screen bg-white text-ink font-sans antialiased flex flex-col selection:bg-brand selection:text-white">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Saltar al contenido
      </a>
      <ScrollManager />
      <ClinicSchema />
      <Navbar />

      <div id="contenido" tabIndex={-1} className="flex-1 flex flex-col outline-none">
        <Suspense fallback={<CargandoPagina />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/agendar" element={<BookingPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/privacidad" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>

      {!enAdmin && <Footer />}
    </div>
  );
}
