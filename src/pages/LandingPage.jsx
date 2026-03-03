import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendLead } from '../services/api';

export default function LandingPage() {
    const navigate = useNavigate();

    // Estado para capturar los datos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        plan: '1 Gbps'
    });

    const [enviando, setEnviando] = useState(false);

    // Función para manejar cambios en los inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Función para enviar los datos al Backend de Java
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        try {
            await sendLead(formData);
            alert("¡Gracias! Un asesor de GoDream te contactará pronto.");
            setFormData({ nombre: '', email: '', telefono: '', plan: '1 Gbps' }); // Limpiar
        } catch (error) {
            alert("Error de conexión. Asegúrate de que el Backend esté corriendo en el puerto 8080.");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFAF5] font-sans">
            {/* HEADER */}
            <header className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="bg-orange-600 p-2 rounded-xl text-white shadow-lg shadow-orange-100">📶</div>
                    <span className="font-black text-slate-900 text-xl tracking-tighter">GoDream</span>
                </div>
                <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 hover:shadow-md transition-all"
                >
                    Acceso Staff
                </button>
            </header>

            {/* HERO & FORMULARIO */}
            <section className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                        ¿Por qué GoDream?
                    </span>
                    <h1 className="text-7xl font-black text-slate-900 leading-[1.1]">
                        La mejor <br /> experiencia en <br />
                        <span className="text-orange-600">conectividad</span>
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Feature icon="⚡" title="Velocidad" desc="Fibra óptica simétrica." />
                        <Feature icon="🛡️" title="Estabilidad" desc="99.9% de tiempo en línea." />
                    </div>
                </div>

                {/* TARJETA DEL FORMULARIO */}
                <div className="bg-white p-10 rounded-[48px] shadow-2xl shadow-orange-100 border border-orange-50">
                    <h3 className="text-2xl font-black text-slate-900 mb-2">¡Cámbiate ahora!</h3>
                    <p className="text-slate-400 font-medium mb-8">Déjanos tus datos y te llamamos en minutos.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            name="nombre" value={formData.nombre} onChange={handleChange} required
                            type="text" placeholder="Nombre completo"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                        />
                        <input
                            name="email" value={formData.email} onChange={handleChange} required
                            type="email" placeholder="Correo electrónico"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                        />
                        <input
                            name="telefono" value={formData.telefono} onChange={handleChange} required
                            type="tel" placeholder="Teléfono / WhatsApp"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                        />
                        <select
                            name="plan" value={formData.plan} onChange={handleChange}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-bold text-slate-600"
                        >
                            <option value="1 Gbps">Plan Pro - 1 Gbps</option>
                            <option value="500 Mbps">Plan Inicio - 500 Mbps</option>
                        </select>

                        <button
                            disabled={enviando}
                            className="w-full py-5 bg-orange-600 text-white font-black rounded-2xl shadow-lg shadow-orange-200 hover:bg-orange-700 active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {enviando ? 'Enviando...' : 'QUIERO MÁS INFORMACIÓN'}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

const Feature = ({ icon, title, desc }) => (
    <div className="flex items-center gap-4 p-4 bg-white rounded-3xl border border-orange-50 shadow-sm">
        <span className="text-2xl bg-orange-50 p-3 rounded-2xl">{icon}</span>
        <div>
            <p className="font-bold text-slate-900">{title}</p>
            <p className="text-xs text-slate-400 font-medium">{desc}</p>
        </div>
    </div>
);