import { Link } from 'react-router';
import { MapPin, Phone, Mail } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';
import { CLINICA } from '../../config/clinica';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.22V8.2a6.34 6.34 0 0 0-3.32.93 6.33 6.33 0 1 0 10.32 4.95V8.69a8.21 8.21 0 0 0 4.79 1.53V6.77a4.85 4.85 0 0 1-1.68-.08z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const ICONOS = { TikTok: TikTokIcon, Facebook: FacebookIcon, Instagram: InstagramIcon };
const COLORES = { TikTok: 'hover:text-cyan-400', Facebook: 'hover:text-blue-500', Instagram: 'hover:text-pink-500' };

export default function Footer() {
  const { direccion } = CLINICA;

  return (
    <footer className="bg-ink text-slate-200 py-12 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
          <div className="flex items-center gap-3 text-white">
            <BrandLogo className="w-8 h-8 text-brand" />
            <span className="font-serif font-bold text-xl text-white uppercase">{CLINICA.nombre}</span>
          </div>
          <p className="text-xs text-slate-400 max-w-xs">
            {CLINICA.eslogan}. Atención odontológica integral para niños y adultos.
          </p>
        </div>

        <address className="not-italic flex flex-col items-center md:items-start gap-2 text-sm text-slate-300">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Contacto</span>
          <a href={CLINICA.mapa.enlace} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
            <MapPin className="w-4 h-4 text-brand shrink-0" />
            {direccion.zona}, {direccion.municipio} – {direccion.departamento}
          </a>
          <a href={`tel:${CLINICA.telefono}`} className="flex items-center gap-2 hover:text-white">
            <Phone className="w-4 h-4 text-brand shrink-0" />
            {CLINICA.telefonoVisible}
          </a>
          <a href={`mailto:${CLINICA.email}`} className="flex items-center gap-2 hover:text-white break-all">
            <Mail className="w-4 h-4 text-brand shrink-0" />
            {CLINICA.email}
          </a>
        </address>

        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Síguenos en nuestras redes</span>
          <div className="flex items-center gap-4 pt-1">
            {CLINICA.redes.map((red) => {
              const Icono = ICONOS[red.nombre];
              return (
                <a
                  key={red.nombre}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${red.nombre} de ${CLINICA.nombre}`}
                  className={`text-slate-400 ${COLORES[red.nombre] ?? 'hover:text-white'} transition-colors p-1.5 rounded-lg hover:bg-slate-800/60 flex items-center gap-1.5 text-xs font-medium`}
                >
                  {Icono && <Icono />}
                  <span className="hidden sm:inline">{red.nombre}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <span>
          © {new Date().getFullYear()} {CLINICA.nombreCompleto}. Todos los derechos reservados.
        </span>
        <Link to="/privacidad" className="hover:text-slate-300 underline-offset-4 hover:underline">
          Aviso de privacidad
        </Link>
      </div>
    </footer>
  );
}
