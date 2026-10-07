import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X, Lock } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';
import { CLINICA } from '../../config/clinica';

const ENLACES = [
  { to: '/', etiqueta: 'Inicio', end: true },
  { to: '/servicios', etiqueta: 'Servicios' },
  { to: '/contacto', etiqueta: 'Contacto' },
];

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = () => setMenuAbierto(false);

  const claseEnlace = ({ isActive }) =>
    `text-sm font-medium tracking-wider uppercase transition-colors ${
      isActive ? 'text-brand font-bold border-b-2 border-brand pb-1' : 'text-muted hover:text-ink'
    }`;

  const claseEnlaceMovil = ({ isActive }) =>
    `text-left font-medium text-base py-2 border-b border-slate-100 ${
      isActive ? 'text-brand font-bold' : 'text-ink'
    }`;

  return (
    <header className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-xs border-b border-slate-100">
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="flex items-center justify-between h-20">
          <Link to="/" onClick={cerrarMenu} className="flex items-center gap-3 text-ink group shrink-0">
            <BrandLogo className="w-9 h-9 text-brand group-hover:scale-105 transition-transform" />
            <span className="text-ink text-2xl font-serif font-bold tracking-tight uppercase">{CLINICA.nombre}</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 ml-auto justify-end">
            <nav aria-label="Principal" className="flex items-center gap-8">
              {ENLACES.map((enlace) => (
                <NavLink key={enlace.to} to={enlace.to} end={enlace.end} className={claseEnlace}>
                  {enlace.etiqueta}
                </NavLink>
              ))}
            </nav>

            <NavLink
              to="/agendar"
              className={({ isActive }) =>
                `flex items-center justify-center rounded-full h-11 px-7 text-xs font-semibold tracking-widest uppercase transition-all shadow-md active:scale-95 ${
                  isActive ? 'bg-brand text-white ring-2 ring-brand/50' : 'bg-ink text-white hover:bg-brand'
                }`
              }
            >
              Agendar Cita
            </NavLink>

            <NavLink
              to="/admin"
              title="Panel de la clínica"
              aria-label="Acceso para el personal de la clínica"
              className={({ isActive }) =>
                `p-2.5 rounded-full border transition-all ${
                  isActive
                    ? 'bg-brand text-white border-brand'
                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-ink hover:border-slate-300'
                }`
              }
            >
              <Lock className="w-4 h-4" />
            </NavLink>
          </div>

          <button
            type="button"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            className="lg:hidden p-2 rounded-lg text-ink hover:bg-slate-100 transition-colors"
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
          >
            {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuAbierto && (
        <div id="menu-movil" className="lg:hidden bg-white border-t border-slate-100 px-6 pt-4 pb-6 space-y-4 shadow-xl">
          <nav aria-label="Principal" className="flex flex-col space-y-3">
            {ENLACES.map((enlace) => (
              <NavLink key={enlace.to} to={enlace.to} end={enlace.end} onClick={cerrarMenu} className={claseEnlaceMovil}>
                {enlace.etiqueta}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/agendar"
              onClick={cerrarMenu}
              className="flex items-center justify-center flex-1 rounded-full h-12 px-6 bg-ink text-white text-xs font-semibold tracking-widest uppercase hover:bg-brand transition-all shadow-md"
            >
              Agendar Cita
            </Link>
            <Link
              to="/admin"
              onClick={cerrarMenu}
              aria-label="Acceso para el personal de la clínica"
              className="p-3 rounded-full border bg-slate-50 text-slate-400 border-slate-200"
            >
              <Lock className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
