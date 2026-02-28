import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const navigate = useNavigate();

    // --- 1. DATOS PARA LEADS ---
    const DATA_LEADS = [
        { n: 'María López', t: '+1 555-0101', p: '1 Gbps', e: 'Nuevo', o: 'Web', f: '2026-02-28', c: 'text-blue-600 bg-blue-50' },
        { n: 'Juan Pérez', t: '+1 555-0102', p: '500 Mbps', e: 'Contactado', o: 'Referido', f: '2026-02-27', c: 'text-amber-600 bg-amber-50' },
        { n: 'Ana Martínez', t: '+1 555-0103', p: '1 Gbps', e: 'Interesado', o: 'Web', f: '2026-02-26', c: 'text-green-600 bg-green-50' },
        { n: 'Carlos García', t: '+1 555-0104', p: '500 Mbps', e: 'Perdido', o: 'Llamada', f: '2026-02-25', c: 'text-red-600 bg-red-50' },
    ];

    // --- 2. DATOS PARA VENTAS ---
    const DATA_VENTAS = [
        { cl: 'Fernando Díaz', pl: '1 Gbps', m: '$49/mes', st: 'Activa', v: 'Ana García', co: '$15', f: '2026-02-28' },
        { cl: 'Sofia Moreno', pl: '500 Mbps', m: '$29/mes', st: 'Activa', v: 'Ana García', co: '$8', f: '2026-02-27' },
        { cl: 'Diego Romero', pl: '1 Gbps', m: '$49/mes', st: 'Activa', v: 'Carlos Mendoza', co: '$15', f: '2026-02-25' },
    ];

    // --- 3. DATOS PARA COMISIONES ---
    const DATA_COMISIONES = [
        { ven: 'Ana García', per: 'Febrero 2026', vts: '5 ventas', tot: '$225', com: '$61', est: 'Pendiente', clr: 'text-amber-600 bg-amber-50' },
        { ven: 'Carlos Mendoza', per: 'Febrero 2026', vts: '3 ventas', tot: '$147', com: '$45', est: 'Pendiente', clr: 'text-amber-600 bg-amber-50' },
    ];

    // --- 4. DATOS GRÁFICAS ---
    const dataVentasGraph = [{ name: 'Sep', v: 12 }, { name: 'Oct', v: 18 }, { name: 'Nov', v: 15 }, { name: 'Dic', v: 22 }, { name: 'Ene', v: 28 }, { name: 'Feb', v: 14 }];
    const dataPlanes = [{ name: '500 Mbps', value: 35 }, { name: '1 Gbps', value: 65 }];

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pb-12 text-slate-900">
            {/* HEADER IDENTICO A FIGMA */}
            <header className="bg-white border-b border-slate-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="bg-orange-600 p-2 rounded-xl text-white shadow-lg shadow-orange-100">📶</div>
                    <span className="font-black text-lg">GoDream <span className="text-slate-400 font-medium text-sm ml-1">Admin</span></span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold leading-tight">Carlos Mendoza</p>
                            <p className="text-[11px] text-slate-400 font-medium">Admin</p>
                        </div>
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">C</div>
                    </div>
                    <button onClick={() => navigate('/login')} className="text-slate-400 hover:text-orange-600 p-2 hover:bg-orange-50 rounded-xl transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
                {/* NAVEGACIÓN */}
                <div className="flex gap-2 bg-slate-200/50 p-1.5 rounded-2xl w-fit">
                    {['Dashboard', 'Leads', 'Ventas', 'Comisiones'].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? 'bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* --- VISTA DASHBOARD --- */}
                {activeTab === 'Dashboard' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <StatCard label="Leads totales" val="47" icon="👥" color="text-green-500" trend="+12%" />
                            <StatCard label="Ventas del mes" val="14" icon="📈" color="text-green-500" trend="+8%" />
                            <StatCard label="Ingresos" val="$567" icon="💰" color="text-green-500" trend="+15%" />
                            <StatCard label="Comisiones" val="$106" icon="🔸" color="text-red-500" trend="-3%" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                                <h3 className="font-black mb-8 text-xl">Ventas mensuales</h3>
                                <div className="h-72">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={dataVentasGraph}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                            <YAxis axisLine={false} tickLine={false} />
                                            <Bar dataKey="v" fill="#EA580C" radius={[8, 8, 0, 0]} barSize={45} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                                <h3 className="font-black mb-8 text-xl">Distribución de planes</h3>
                                <div className="h-64"><ResponsiveContainer><PieChart><Pie data={dataPlanes} innerRadius={70} outerRadius={90} dataKey="value" stroke="none"><Cell fill="#FDBA74"/><Cell fill="#EA580C"/></Pie></PieChart></ResponsiveContainer></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- VISTA LEADS --- */}
                {activeTab === 'Leads' && (
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black border-b border-slate-50">
                            <tr><th className="px-8 py-5">Contacto</th><th className="px-8 py-5">Teléfono</th><th className="px-8 py-5">Estado</th><th className="px-8 py-5">Origen</th><th className="px-8 py-5 text-right">Acción</th></tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                            {DATA_LEADS.map((l, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-5 font-bold">{l.n}</td><td className="px-8 py-5 text-slate-500">{l.t}</td>
                                    <td className="px-8 py-5"><span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${l.c}`}>{l.e}</span></td>
                                    <td className="px-8 py-5 text-slate-400">{l.o}</td><td className="px-8 py-5 text-right">📞 ✉️</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* --- VISTA VENTAS --- */}
                {activeTab === 'Ventas' && (
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black border-b border-slate-50">
                            <tr><th className="px-8 py-5">Cliente</th><th className="px-8 py-5">Monto</th><th className="px-8 py-5">Estado</th><th className="px-8 py-5">Vendedor</th><th className="px-8 py-5 text-right">Comisión</th></tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                            {DATA_VENTAS.map((v, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-5 font-bold">{v.cl}</td><td className="px-8 py-5 font-black">{v.m}</td>
                                    <td className="px-8 py-5"><span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase">Activa</span></td>
                                    <td className="px-8 py-5 text-slate-500">{v.v}</td><td className="px-8 py-5 text-right font-black text-emerald-600">{v.co}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* --- VISTA COMISIONES --- */}
                {activeTab === 'Comisiones' && (
                    <div className="space-y-8 animate-in slide-in-from-right-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-orange-600 p-8 rounded-[32px] text-white shadow-xl shadow-orange-100">
                                <p className="font-bold opacity-80 mb-2 uppercase text-xs tracking-widest">Pendientes</p>
                                <p className="text-5xl font-black">$106</p>
                            </div>
                            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                                <p className="text-slate-400 font-bold mb-2 uppercase text-xs tracking-widest">Pagadas</p>
                                <p className="text-5xl font-black text-emerald-500">$261</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black border-b border-slate-50">
                                <tr><th className="px-8 py-5">Vendedor</th><th className="px-8 py-5">Periodo</th><th className="px-8 py-5">Comisión</th><th className="px-8 py-5 text-right">Estado</th></tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                {DATA_COMISIONES.map((c, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5 font-bold">{c.ven}</td><td className="px-8 py-5 text-slate-500">{c.per}</td>
                                        <td className="px-8 py-5 font-black text-orange-600">{c.com}</td>
                                        <td className="px-8 py-5 text-right"><span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${c.clr}`}>{c.est}</span></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

const StatCard = ({ label, val, icon, color, trend }) => (
    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:border-orange-100 transition-all">
        <div className="flex justify-between items-center mb-4"><span className="text-2xl p-2 bg-slate-50 rounded-xl">{icon}</span><span className={`text-[10px] font-black ${color}`}>{trend}</span></div>
        <p className="text-3xl font-black">{val}</p><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</p>
    </div>
);