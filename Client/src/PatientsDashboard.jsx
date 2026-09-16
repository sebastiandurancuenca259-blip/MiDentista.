import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Users, LogOut, RefreshCw, Phone, Mail, Calendar } from 'lucide-react';

export const PatientsDashboard = ({ onLogout }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('citas') // <-- Cambiado de 'patients' a 'citas'
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error cargando citas/pacientes:', error);
    } else {
      setPatients(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#0f172a] flex items-center gap-3">
            <Users className="w-8 h-8 text-[#0ea5e9]" />
            Pacientes y Citas Registradas
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Total en la base de datos: <span className="font-bold text-[#0f172a]">{patients.length}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPatients}
            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-all cursor-pointer"
            title="Actualizar datos"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-rose-50 text-rose-600 border border-rose-200 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-medium">Cargando datos desde Supabase...</div>
        ) : patients.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-medium">No hay registros guardados en la tabla "citas".</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="p-5 pl-8">Paciente</th>
                  <th className="p-5">Contacto</th>
                  <th className="p-5">Servicio / Detalle</th>
                  <th className="p-5">Fecha / Hora</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-5 pl-8 font-bold text-[#0f172a]">
                      {patient.nombre || patient.full_name || patient.fullName || patient.name || 'Sin Nombre'}
                    </td>
                    <td className="p-5 space-y-1">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-[#0ea5e9]" />
                        <span>{patient.telefono || patient.phone || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{patient.email || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="inline-block bg-[#0ea5e9]/10 text-[#0ea5e9] text-xs font-bold px-3 py-1 rounded-full">
                        {patient.servicio || patient.interest || patient.service || 'Consulta General'}
                      </span>
                    </td>
                    <td className="p-5 text-slate-500 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {patient.fecha || (patient.created_at ? new Date(patient.created_at).toLocaleDateString() : 'N/A')}
                          {patient.hora ? ` - ${patient.hora}` : ''}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};