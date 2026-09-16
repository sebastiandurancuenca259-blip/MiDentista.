import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Credenciales incorrectas o usuario no autorizado.');
      setLoading(false);
    } else {
      setLoading(false);
      onLoginSuccess(data.user);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#0ea5e9]/10 text-[#0ea5e9] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#0f172a]">Acceso Administrador</h2>
          <p className="text-sm text-slate-500 mt-1">Ingresa para ver la lista de pacientes</p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-4 rounded-2xl mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-xs font-bold tracking-widest uppercase text-slate-700 mb-2">Correo Electrónico</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="midentista114@gmail.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pl-11 text-sm font-normal text-[#0f172a] focus:border-[#0ea5e9] focus:bg-white focus:ring-2 focus:ring-[#0ea5e9]/20 transition-all outline-none"
              />
              <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold tracking-widest uppercase text-slate-700 mb-2">Contraseña</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pl-11 text-sm font-normal text-[#0f172a] focus:border-[#0ea5e9] focus:bg-white focus:ring-2 focus:ring-[#0ea5e9]/20 transition-all outline-none"
              />
              <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f172a] text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#0ea5e9] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 mt-2"
          >
            <span>{loading ? 'Iniciando sesión...' : 'Entrar al Panel'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};