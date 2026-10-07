import { createClient } from '@supabase/supabase-js';

// Las credenciales se leen de variables de entorno (archivo .env.local en
// desarrollo, panel de Vercel en producción). Ver .env.example.
// La "anon key" es pública por diseño: la seguridad real está en las
// políticas RLS definidas en supabase/schema.sql.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigurado = Boolean(url && anonKey);

// Si faltan las variables, el sitio informativo sigue funcionando y solo
// las reservas y el panel muestran un aviso (en vez de romper toda la página).
export const supabase = supabaseConfigurado ? createClient(url, anonKey) : null;
