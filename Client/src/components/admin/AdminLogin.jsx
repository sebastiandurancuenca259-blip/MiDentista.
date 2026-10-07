import { useId, useState } from 'react';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const claseCampo =
  'w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pl-11 text-sm font-normal text-ink focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 transition-all outline-none';

export default function AdminLogin() {
  const ids = useId();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async (evento) => {
    evento.preventDefault();
    setCargando(true);
    setError(null);

    // Si el inicio de sesión funciona, AdminPage detecta la sesión nueva
    // (onAuthStateChange) y verifica que la cuenta sea de administrador.
    const { error: errorAuth } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setCargando(false);
    if (errorAuth) setError('Correo o contraseña incorrectos.');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-ink">Acceso del personal</h1>
          <p className="text-sm text-slate-500 mt-1">Ingresa para gestionar las citas de la clínica</p>
        </div>

        {error && (
          <div role="alert" className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-4 rounded-2xl mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={iniciarSesion} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor={`${ids}-email`} className="text-xs font-bold tracking-widest uppercase text-slate-700 mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <input
                id={`${ids}-email`}
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className={claseCampo}
              />
              <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-4" aria-hidden="true" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor={`${ids}-password`} className="text-xs font-bold tracking-widest uppercase text-slate-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                id={`${ids}-password`}
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={claseCampo}
              />
              <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-4" aria-hidden="true" />
            </div>
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-ink text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-brand transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 mt-2"
          >
            <span>{cargando ? 'Iniciando sesión…' : 'Entrar al panel'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
