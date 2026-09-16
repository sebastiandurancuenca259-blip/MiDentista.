import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { AdminLogin } from './AdminLogin';
import { PatientsDashboard } from './PatientsDashboard';

export const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500 font-medium">Verificando sesión...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {user ? (
        <PatientsDashboard onLogout={() => setUser(null)} />
      ) : (
        <AdminLogin onLoginSuccess={(userData) => setUser(userData)} />
      )}
    </div>
  );
};

export default AdminPage;