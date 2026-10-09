import { CLINICA } from '../../config/clinica';
import { brandLogoSvg } from './brand-logo';
import { iconSvg } from '../icons';

export const ENLACES_NAV = [
  { href: '/index.html', rutasAlternativas: ['/', '/index.html'], etiqueta: 'Inicio' },
  { href: '/servicios.html', rutasAlternativas: ['/servicios', '/servicios.html'], etiqueta: 'Servicios' },
  { href: '/contacto.html', rutasAlternativas: ['/contacto', '/contacto.html'], etiqueta: 'Contacto' },
];

/**
 * Determina si una ruta es la activa actualmente en el navegador.
 */
function esRutaActiva(rutas) {
  const rutaActual = window.location.pathname.toLowerCase();
  return rutas.some((r) => {
    if (r === '/' || r === '/index.html') {
      return rutaActual === '/' || rutaActual === '/index.html' || rutaActual.endsWith('/');
    }
    return rutaActual === r || rutaActual.endsWith(r);
  });
}

/**
 * Genera el markup HTML completo del Navbar.
 */
export function generarNavbarHtml() {
  const esAgendar = esRutaActiva(['/agendar', '/agendar.html']);
  const esAdmin = esRutaActiva(['/admin', '/admin.html']);

  const enlacesDesktop = ENLACES_NAV.map((enlace) => {
    const activo = esRutaActiva(enlace.rutasAlternativas);
    const clases = `text-sm font-medium tracking-wider uppercase transition-colors ${
      activo ? 'text-brand font-bold border-b-2 border-brand pb-1' : 'text-muted hover:text-ink'
    }`;
    return `<a href="${enlace.href}" class="${clases}">${enlace.etiqueta}</a>`;
  }).join('');

  const enlacesMovil = ENLACES_NAV.map((enlace) => {
    const activo = esRutaActiva(enlace.rutasAlternativas);
    const clases = `text-left font-medium text-base py-2 border-b border-slate-100 ${
      activo ? 'text-brand font-bold' : 'text-ink'
    }`;
    return `<a href="${enlace.href}" class="${clases} nav-link-mobile">${enlace.etiqueta}</a>`;
  }).join('');

  return `
    <header class="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-xs border-b border-slate-100" id="main-header">
      <div class="w-full px-6 md:px-12 lg:px-16 xl:px-20">
        <div class="flex items-center justify-between h-20">
          <a href="/index.html" class="flex items-center gap-3 text-ink group shrink-0">
            ${brandLogoSvg('w-9 h-9 text-brand group-hover:scale-105 transition-transform')}
            <span class="text-ink text-2xl font-serif font-bold tracking-tight uppercase">${CLINICA.nombre}</span>
          </a>

          <div class="hidden lg:flex items-center gap-6 ml-auto justify-end">
            <nav aria-label="Principal" class="flex items-center gap-8">
              ${enlacesDesktop}
            </nav>

            <a
              href="/agendar.html"
              class="flex items-center justify-center rounded-full h-11 px-7 text-xs font-semibold tracking-widest uppercase transition-all shadow-md active:scale-95 ${
                esAgendar ? 'bg-brand text-white ring-2 ring-brand/50' : 'bg-ink text-white hover:bg-brand'
              }"
            >
              Agendar Cita
            </a>

            <a
              href="/admin.html"
              title="Panel de la clínica"
              aria-label="Acceso para el personal de la clínica"
              class="p-2.5 rounded-full border transition-all ${
                esAdmin
                  ? 'bg-brand text-white border-brand'
                  : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-ink hover:border-slate-300'
              }"
            >
              ${iconSvg('lock', { className: 'w-4 h-4' })}
            </a>
          </div>

          <button
            type="button"
            id="mobile-menu-btn"
            class="lg:hidden p-2 rounded-lg text-ink hover:bg-slate-100 transition-colors"
            aria-label="Abrir menú"
            aria-expanded="false"
            aria-controls="menu-movil"
          >
            <span id="menu-icon-bars">${iconSvg('menu', { className: 'w-6 h-6' })}</span>
            <span id="menu-icon-close" class="hidden">${iconSvg('x', { className: 'w-6 h-6' })}</span>
          </button>
        </div>
      </div>

      <div id="menu-movil" class="hidden lg:hidden bg-white border-t border-slate-100 px-6 pt-4 pb-6 space-y-4 shadow-xl animate-fade-in">
        <nav aria-label="Principal móvil" class="flex flex-col space-y-3">
          ${enlacesMovil}
        </nav>

        <div class="flex items-center gap-3 pt-2">
          <a
            href="/agendar.html"
            class="flex items-center justify-center flex-1 rounded-full h-12 px-6 bg-ink text-white text-xs font-semibold tracking-widest uppercase hover:bg-brand transition-all shadow-md"
          >
            Agendar Cita
          </a>
          <a
            href="/admin.html"
            aria-label="Acceso para el personal de la clínica"
            class="p-3 rounded-full border bg-slate-50 text-slate-400 border-slate-200 hover:text-ink"
          >
            ${iconSvg('lock', { className: 'w-5 h-5' })}
          </a>
        </div>
      </div>
    </header>
  `;
}

/**
 * Inicializa la interactividad del Navbar en el elemento contenedor o en el DOM.
 */
export function initNavbar(container = document.getElementById('navbar-container')) {
  if (container) {
    container.innerHTML = generarNavbarHtml();
  }

  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('menu-movil');
  const iconBars = document.getElementById('menu-icon-bars');
  const iconClose = document.getElementById('menu-icon-close');

  if (!btn || !menu) return;

  let abierto = false;

  const alternar = (forzarEstado) => {
    abierto = typeof forzarEstado === 'boolean' ? forzarEstado : !abierto;
    btn.setAttribute('aria-expanded', String(abierto));
    btn.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');

    if (abierto) {
      menu.classList.remove('hidden');
      iconBars?.classList.add('hidden');
      iconClose?.classList.remove('hidden');
    } else {
      menu.classList.add('hidden');
      iconBars?.classList.remove('hidden');
      iconClose?.classList.add('hidden');
    }
  };

  btn.addEventListener('click', () => alternar());

  // Cierra el menú al hacer clic en un enlace
  menu.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', () => alternar(false));
  });

  // Cierra el menú al redimensionar la pantalla a desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && abierto) {
      alternar(false);
    }
  });
}
