import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import miLogo from '../assets/fibraa.png';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between py-4 px-4 md:px-0 bg-godream-bg">

            {/* LOGO */}
            <div className="flex items-center ml-4 md:ml-8">
                <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center overflow-hidden">
                    <img
                        src={miLogo}
                        alt="GoDream Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            {/* ENLACES Y ACCIONES: Añadimos mr-6 o mr-10 para empujarlos a la izquierda */}
            <div className="flex items-center gap-6 md:gap-10 mr-4 md:mr-12">
                {/* Enlaces centrales */}
                <div className="hidden md:flex items-center gap-8 font-bold text-slate-600">
                    <a href="#beneficios" className="hover:text-godream-orange transition-colors">Beneficios</a>
                    <a href="#planes" className="hover:text-godream-orange transition-colors">Planes</a>
                </div>

                {/* Botones de acción derecha */}
                <div className="flex items-center gap-4">
                    <a
                        href="#contacto"
                        className="bg-godream-orange text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-600 hover:scale-105 transition-all shadow-lg shadow-orange-200 text-sm md:text-base"
                    >
                        Contratar ahora
                    </a>

                    <Link
                        to="/admin"
                        className="flex items-center justify-center p-2.5 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 hover:text-godream-orange transition-all border border-transparent hover:border-slate-300"
                        title="Acceso Administrador"
                    >
                        <User className="w-6 h-6" strokeWidth={2.5} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;