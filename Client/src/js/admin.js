import { supabase, supabaseConfigurado } from '../lib/supabase';
import { verificarAdmin } from '../lib/citas';
import { renderAdminLogin } from './components/admin-login';
import { renderAdminDashboard } from './components/admin-dashboard';
import { iconSvg } from './icons';

export async function initAdminPage() {
  const container = document.getElementById('admin-container');
  if (!container) return;

  if (!supabaseConfigurado || !supabase) {
    container.innerHTML = `
      <div class="min-h-[70vh] flex items-center justify-center px-6">
        <div class="max-w-md text-center bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
          <div class="w-12 h-12 text-amber-500 mx-auto mb-4 flex items-center justify-center">
            ${iconSvg('alertCircle', { className: 'w-12 h-12 text-amber-500' })}
          </div>
          <h1 class="text-2xl font-serif font-bold text-ink mb-3">Panel no disponible</h1>
          <div class="text-sm text-slate-600">
            Faltan las variables de entorno de Supabase. Revisa el archivo <code>.env.local</code>.
          </div>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <p class="min-h-[60vh] flex items-center justify-center text-slate-500 font-medium animate-pulse">
      Verificando sesión…
    </p>
  `;

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    evaluarSesion(null);
  };

  const evaluarSesion = async (sesion) => {
    if (!sesion) {
      renderAdminLogin(container, {
        alIniciarSesion: (nuevaSesion) => evaluarSesion(nuevaSesion),
      });
      return;
    }

    const esAdmin = await verificarAdmin();
    if (esAdmin) {
      renderAdminDashboard(container, { onCerrarSesion: cerrarSesion });
    } else {
      container.innerHTML = `
        <div class="min-h-[70vh] flex items-center justify-center px-6">
          <div class="max-w-md text-center bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
            <div class="w-12 h-12 text-amber-500 mx-auto mb-4 flex items-center justify-center">
              ${iconSvg('alertCircle', { className: 'w-12 h-12 text-amber-500' })}
            </div>
            <h1 class="text-2xl font-serif font-bold text-ink mb-3">Esta cuenta no tiene permiso</h1>
            <div class="text-sm text-slate-600">
              La cuenta con la que iniciaste sesión no está registrada como administradora de la clínica.
              <button
                type="button"
                id="btn-usar-otra-cuenta"
                class="block mx-auto mt-6 px-6 py-3 rounded-full bg-ink text-white font-semibold cursor-pointer hover:bg-brand transition-colors"
              >
                Usar otra cuenta
              </button>
            </div>
          </div>
        </div>
      `;
      document.getElementById('btn-usar-otra-cuenta')?.addEventListener('click', cerrarSesion);
    }
  };

  const { data } = await supabase.auth.getSession();
  evaluarSesion(data.session);

  supabase.auth.onAuthStateChange((_evento, sesion) => {
    setTimeout(() => evaluarSesion(sesion), 0);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdminPage);
} else {
  initAdminPage();
}
