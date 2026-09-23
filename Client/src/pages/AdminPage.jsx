import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import AdminLogin from '../components/admin/AdminLogin';
import CitasDashboard from '../components/admin/CitasDashboard';
import { supabase, supabaseConfigurado } from '../lib/supabase';
import { verificarAdmin } from '../lib/citas';
import useTituloPagina from '../hooks/useTituloPagina';

// Estados posibles: 'verificando' | 'anonimo' | 'sin-permiso' | 'admin'
export default function AdminPage() {
  useTituloPagina('Panel de la clínica');
  const [acceso, setAcceso] = useState(supabaseConfigurado ? 'verificando' : 'anonimo');

  useEffect(() => {
    if (!supabase) return undefined;

    const evaluarSesion = async (sesion) => {
      if (!sesion) {
        setAcceso('anonimo');
        return;
      }
      // Tener cuenta no basta: debe estar en la tabla "administradores".
      setAcceso((await verificarAdmin()) ? 'admin' : 'sin-permiso');
    };

    supabase.auth.getSession().then(({ data }) => evaluarSesion(data.session));
    const { data: suscripcion } = supabase.auth.onAuthStateChange((_evento, sesion) => {
      // Se difiere para no llamar a Supabase dentro del propio callback de auth.
      setTimeout(() => evaluarSesion(sesion), 0);
    });

    return () => suscripcion.subscription.unsubscribe();
  }, []);

  const cerrarSesion = () => supabase?.auth.signOut();

  let contenido;
  if (!supabaseConfigurado) {
    contenido = (
      <Aviso titulo="Panel no disponible">
        Faltan las variables de entorno de Supabase. Revisa el archivo <code>.env.local</code> (ver <code>.env.example</code>).
      </Aviso>
    );
  } else if (acceso === 'verificando') {
    contenido = <p className="min-h-[60vh] flex items-center justify-center text-slate-500 font-medium">Verificando sesión…</p>;
  } else if (acceso === 'admin') {
    contenido = <CitasDashboard onCerrarSesion={cerrarSesion} />;
  } else if (acceso === 'sin-permiso') {
    contenido = (
      <Aviso titulo="Esta cuenta no tiene permiso">
        La cuenta con la que iniciaste sesión no está registrada como administradora de la clínica.
        <button type="button" onClick={cerrarSesion} className="block mx-auto mt-6 px-6 py-3 rounded-full bg-ink text-white font-semibold cursor-pointer">
          Usar otra cuenta
        </button>
      </Aviso>
    );
  } else {
    contenido = <AdminLogin />;
  }

  return (
    <main className="flex-1 min-h-screen bg-slate-50/50">
      <meta name="robots" content="noindex" />
      {contenido}
    </main>
  );
}

function Aviso({ titulo, children }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md text-center bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
        <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-2xl font-serif font-bold text-ink mb-3">{titulo}</h1>
        <div className="text-sm text-slate-600">{children}</div>
      </div>
    </div>
  );
}
