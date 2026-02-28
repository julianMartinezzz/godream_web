import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[#FFFAF5] flex flex-col items-center justify-center p-6 font-sans">

            {/* Botón Volver al Inicio */}
            <div className="w-full max-w-md mb-6">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold text-sm transition-colors group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Volver al inicio
                </button>
            </div>

            {/* Tarjeta de Login */}
            <div className="bg-white p-10 rounded-[40px] shadow-xl shadow-orange-100/50 w-full max-w-md border border-slate-50">
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-orange-600 p-3 rounded-2xl text-white shadow-lg shadow-orange-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 leading-none">GoDream</h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Panel Administrativo</p>
                    </div>
                </div>

                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-black text-slate-700 mb-2 ml-1">Email</label>
                        <input
                            type="email"
                            placeholder="admin@godream.com"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all text-slate-600 font-medium"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-black text-slate-700 mb-2 ml-1">Contraseña</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all text-slate-600 font-medium"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-[46px] text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? "👁️‍🗨️" : "👁️"}
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-4 bg-orange-600 text-white font-black rounded-2xl shadow-lg shadow-orange-200 hover:bg-orange-700 active:scale-[0.98] transition-all mt-4"
                    >
                        Iniciar sesión
                    </button>
                </form>

                {/* Credenciales de prueba */}
                <div className="mt-8 p-6 bg-orange-50/50 rounded-[24px] border border-orange-100/50">
                    <p className="text-[10px] font-black text-orange-800 uppercase tracking-widest mb-3">Credenciales de prueba:</p>
                    <div className="space-y-2">
                        <p className="text-xs text-orange-700 font-medium">
                            <span className="font-bold">Admin:</span> admin@godream.com / admin123
                        </p>
                        <p className="text-xs text-orange-700 font-medium">
                            <span className="font-bold">Ventas:</span> ventas@godream.com / ventas123
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}