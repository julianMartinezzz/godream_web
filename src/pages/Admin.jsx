import React, { useEffect, useState } from 'react';
import { Users, RefreshCw, Trash2, ExternalLink } from 'lucide-react';

const Admin = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/leads');
            const data = await response.json();
            setLeads(data.reverse()); // Los más nuevos primero
        } catch (error) {
            console.error("Error cargando leads:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                            <Users className="text-godream-orange" /> Panel de Leads
                        </h1>
                        <p className="text-slate-500">Gestiona los interesados de GoDream</p>
                    </div>
                    <button
                        onClick={fetchLeads}
                        className="p-3 bg-white border rounded-xl hover:bg-slate-100 transition-all shadow-sm"
                    >
                        <RefreshCw className={`${loading ? 'animate-spin' : ''} text-slate-600`} />
                    </button>
                </div>

                {/* Tabla */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-slate-900 text-white">
                            <th className="p-4 font-bold">Fecha</th>
                            <th className="p-4 font-bold">Cliente</th>
                            <th className="p-4 font-bold">Contacto</th>
                            <th className="p-4 font-bold">Plan / Estrato</th>
                            <th className="p-4 font-bold">Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {leads.map((lead) => (
                            <tr key={lead.id} className="border-b hover:bg-orange-50/30 transition-colors">
                                <td className="p-4 text-sm text-slate-500">
                                    {new Date(lead.fechaCreacion).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    <p className="font-bold text-slate-900">{lead.nombre}</p>
                                    <p className="text-xs text-slate-400">{lead.email}</p>
                                </td>
                                <td className="p-4 text-slate-600 font-medium">{lead.telefono}</td>
                                <td className="p-4">
                                    <span className="block text-sm font-bold text-slate-700">{lead.plan}</span>
                                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500 italic">
                                            Estrato {lead.estrato}
                                        </span>
                                </td>
                                <td className="p-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-black bg-green-100 text-green-700 uppercase">
                                            {lead.estado}
                                        </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {leads.length === 0 && !loading && (
                        <div className="p-20 text-center text-slate-400">
                            No hay leads registrados aún.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;