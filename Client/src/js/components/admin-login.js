import { supabase } from '../../lib/supabase';
import { iconSvg } from '../icons';

const claseCampo =
  'w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pl-11 text-sm font-normal text-ink focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 transition-all outline-none';

/**
 * Renderiza el formulario de inicio de sesión de personal de la clínica.
 * @param {HTMLElement} contenedor - Contenedor en el DOM
 * @param {object} opciones
 * @param {function} [opciones.alIniciarSesion] - Callback tras login exitoso
 */
export function renderAdminLogin(contenedor, { alIniciarSesion = null } = {}) {
  if (!contenedor) return;

  contenedor.innerHTML = `
    <div class="min-h-[80vh] flex items-center justify-center px-6 py-12 animate-fade-in">
      <div class="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div class="text-center mb-8">
          <div class="w-12 h-12 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mx-auto mb-4">
            ${iconSvg('lock', { className: 'w-6 h-6' })}
          </div>
          <h1 class="text-2xl font-serif font-bold text-ink">Acceso del personal</h1>
          <p class="text-sm text-slate-500 mt-1">Ingresa para gestionar las citas de la clínica</p>
        </div>

        <div id="login-error-alert" class="hidden bg-rose-50 border border-rose-200 text-rose-700 text-xs p-4 rounded-2xl mb-6 flex items-center gap-2" role="alert">
          ${iconSvg('alertCircle', { className: 'w-4 h-4 shrink-0' })}
          <span id="login-error-text">Correo o contraseña incorrectos.</span>
        </div>

        <form id="form-admin-login" class="space-y-5" novalidate>
          <div class="flex flex-col">
            <label for="admin-email" class="text-xs font-bold tracking-widest uppercase text-slate-700 mb-2">
              Correo electrónico
            </label>
            <div class="relative">
              <input
                id="admin-email"
                type="email"
                required
                autocomplete="username"
                placeholder="correo@ejemplo.com"
                class="${claseCampo}"
              />
              <span class="absolute left-4 top-4 text-slate-400">
                ${iconSvg('mail', { className: 'w-5 h-5' })}
              </span>
            </div>
          </div>

          <div class="flex flex-col">
            <label for="admin-password" class="text-xs font-bold tracking-widest uppercase text-slate-700 mb-2">
              Contraseña
            </label>
            <div class="relative">
              <input
                id="admin-password"
                type="password"
                required
                autocomplete="current-password"
                placeholder="••••••••"
                class="${claseCampo}"
              />
              <span class="absolute left-4 top-4 text-slate-400">
                ${iconSvg('lock', { className: 'w-5 h-5' })}
              </span>
            </div>
          </div>

          <button
            type="submit"
            id="btn-admin-submit"
            class="w-full bg-ink text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-brand transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 mt-2"
          >
            <span id="btn-submit-label">Entrar al panel</span>
            ${iconSvg('arrowRight', { className: 'w-4 h-4' })}
          </button>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById('form-admin-login');
  const inputEmail = document.getElementById('admin-email');
  const inputPassword = document.getElementById('admin-password');
  const btnSubmit = document.getElementById('btn-admin-submit');
  const lblSubmit = document.getElementById('btn-submit-label');
  const alertError = document.getElementById('login-error-alert');
  const txtError = document.getElementById('login-error-text');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = inputEmail.value.trim();
    const password = inputPassword.value;

    alertError.classList.add('hidden');
    btnSubmit.disabled = true;
    lblSubmit.textContent = 'Iniciando sesión…';

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      btnSubmit.disabled = false;
      lblSubmit.textContent = 'Entrar al panel';

      if (error) {
        txtError.textContent = 'Correo o contraseña incorrectos.';
        alertError.classList.remove('hidden');
        return;
      }

      if (typeof alIniciarSesion === 'function') {
        alIniciarSesion(data.session);
      }
    } catch (err) {
      btnSubmit.disabled = false;
      lblSubmit.textContent = 'Entrar al panel';
      txtError.textContent = err.message || 'Error de conexión con el servidor.';
      alertError.classList.remove('hidden');
    }
  });
}
