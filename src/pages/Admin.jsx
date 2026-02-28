import React, { useEffect, useState } from 'react';
import { Users, RefreshCw, MessageCircle, Search, CheckCircle2, LogOut, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/leads');
            const data = await response.json();
            const sortedData = [...data].reverse();
            setLeads(sortedData);
            setFilteredLeads(sortedData);
        } catch (error) {
            console.error("Error cargando leads:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLeads(); }, []);

    useEffect(() => {
        const results = leads.filter(lead =>
            lead.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.telefono.includes(searchTerm)
        );
        setFilteredLeads(results);
    }, [searchTerm, leads]);

    const toggleEstado = async (id, estadoActual) => {
        const nuevoEstado = estadoActual === 'CONTESTADO' ? 'NUEVO' : 'CONTESTADO';
        try {
            const response = await fetch(`http://localhost:8080/api/leads/${id}/estado`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ estado: nuevoEstado })
            });

            if (response.ok) {
                setLeads(leads.map(lead => lead.id === id ? { ...lead, estado: nuevoEstado } : lead));
            } else {
                alert("El servidor no procesó el cambio. Revisa el Controller de Java.");
            }
        } catch (error) {
            alert("No se pudo conectar con el servidor. Verifica que IntelliJ esté corriendo.");
        }
    };

    const contactarWhatsApp = (lead) => {
        const telefono = lead.telefono.replace(/\s+/g, '');
        const mensaje = `Hola ${lead.nombre}, te contactamos de GoDream. Vimos tu interés en el ${lead.plan}.`;
        window.open(`https://wa.me/57${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header Estilizado */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-godream-orange rounded-3xl shadow-lg shadow-orange-200">
                            <Users className="text-white w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Panel de Gestión</h1>
                            <p className="text-slate-500 font-medium">Tienes {leads.filter(l => l.estado !== 'CONTESTADO').length} leads pendientes</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-godream-orange transition-colors w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar cliente..."
                                className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-orange-100 transition-all text-slate-700"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <button onClick={fetchLeads} className="p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 text-slate-600">
                            <RefreshCw className={loading ? 'animate-spin' : ''} />
                        </button>

                        {/* Botón para Salir al Inicio */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="hidden md:inline">Salir</span>
                        </Link>
                    </div>
                </div>

                {/* Tabla Premium */}
                <div className="bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-50">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-[#0F172A] text-slate-400 text-[11px] uppercase tracking-[0.2em] font-black">
                                <th className="p-8">Estado</th>
                                <th className="p-8">Información del Cliente</th>
                                <th className="p-8">Plan Seleccionado</th>
                                <th className="p-8 text-center">Acción Directa</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                            {filteredLeads.map((lead) => (
                                <tr key={lead.id} className={`group transition-all ${lead.estado === 'CONTESTADO' ? 'bg-slate-50/40 opacity-60' : 'hover:bg-orange-50/30'}`}>
                                    <td className="p-8">
                                        <button
                                            onClick={() => toggleEstado(lead.id, lead.estado)}
                                            className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all border ${
                                                lead.estado === 'CONTESTADO'
                                                    ? 'bg-green-50 border-green-100 text-green-600'
                                                    : 'bg-slate-100 border-slate-200 text-slate-500 hover:border-orange-200'
                                            }`}
                                        >
                                            {lead.estado === 'CONTESTADO' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                            <span className="text-[11px] font-black">{lead.estado === 'CONTESTADO' ? 'FINALIZADO' : 'PENDIENTE'}</span>
                                        </button>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex flex-col">
                                            <span className="text-slate-900 font-black text-lg group-hover:text-godream-orange transition-colors">{lead.nombre}</span>
                                            <span className="text-slate-400 font-medium text-sm tracking-wide">{lead.telefono}</span>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-slate-700 font-bold text-sm">{lead.plan}</span>
                                            <div className="flex gap-2">
                                                <span className="text-[10px] bg-orange-100 text-godream-orange px-2 py-0.5 rounded-md font-black uppercase">E-{lead.estrato}</span>
                                                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-black uppercase">WEB</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => contactarWhatsApp(lead)}
                                                className="p-4 bg-[#22C55E] text-white rounded-2xl shadow-lg shadow-green-100 hover:shadow-green-200 hover:scale-110 active:scale-95 transition-all"
                                            >
                                                <MessageCircle className="w-6 h-6" fill="white" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;