import React, { useState, useEffect } from 'react';
import { UserPlus, Award, Trash2, Loader2 } from 'lucide-react';
import Sidebar from './Sidebar'; // Asegúrate de que Sidebar.jsx esté en la misma carpeta

const Equipo = () => {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nuevoNombre, setNuevoNombre] = useState('');

    const API_URL = 'http://localhost:8080/api/asesores';

    const fetchAsesores = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Error en la respuesta del servidor");
            const data = await response.json();
            setEmpleados(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error cargando asesores:", error);
            setEmpleados([]); // Evita que falle si la API no responde bien
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAsesores();
    }, []);

    const agregarEmpleado = async () => {
        if (!nuevoNombre.trim()) return;
        const nuevoAsesor = { nombre: nuevoNombre, cargo: "Asesor Comercial", ventas: 0, meta: 20 };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoAsesor)
            });
            if (response.ok) {
                setNuevoNombre('');
                fetchAsesores();
            }
        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    };

    const eliminarEmpleado = async (id) => {
        if (!window.confirm("¿Eliminar a este asesor?")) return;
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            setEmpleados(empleados.filter(emp => emp.id !== id));
        } catch (error) {
            alert("No se pudo eliminar");
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar />
            <main className="flex-1 ml-64 p-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900">Mi Equipo</h1>
                            <p className="text-slate-500">Gestión de asesores comerciales</p>
                        </div>
                        <div className="flex gap-2 bg-white p-2 rounded-3xl shadow-sm border border-slate-100">
                            <input
                                type="text"
                                className="pl-4 outline-none text-slate-700 w-64"
                                placeholder="Nombre del asesor..."
                                value={nuevoNombre}
                                onChange={(e) => setNuevoNombre(e.target.value)}
                            />
                            <button onClick={agregarEmpleado} className="bg-orange-500 text-white p-3 rounded-2xl hover:bg-orange-600 transition-all">
                                <UserPlus />
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-slate-300 w-10 h-10" /></div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {empleados.map((emp) => (
                                <div key={emp.id} className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-50 relative group">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl font-black uppercase">
                                            {emp.nombre.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900">{emp.nombre}</h3>
                                            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg uppercase">{emp.cargo}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-slate-400 text-xs font-bold uppercase">Ventas: {emp.ventas} / {emp.meta}</p>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-orange-500" style={{ width: `${(emp.ventas / emp.meta) * 100}%` }}></div>
                                        </div>
                                        <button onClick={() => eliminarEmpleado(emp.id)} className="text-red-400 hover:text-red-600 transition-all"><Trash2 size={20}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Equipo;