import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Planes from './components/Planes';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

// 1. Importamos AOS y su CSS
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
    // Estado para compartir el plan entre Planes y Contacto
    const [planSeleccionado, setPlanSeleccionado] = useState("");

    // 2. Inicializamos las animaciones al cargar la aplicación
    useEffect(() => {
        AOS.init({
            duration: 1000, // Las animaciones durarán 1 segundo
            once: true,     // La animación ocurre solo una vez al bajar
            easing: 'ease-out-quad', // Efecto de movimiento suave
            offset: 100,    // La animación inicia 100px antes de llegar al elemento
        });
    }, []);

    return (
        <div className="min-h-screen bg-godream-bg font-sans selection:bg-orange-100 overflow-x-hidden">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Animación de entrada para el Hero */}
                <div data-aos="fade-down">
                    <Hero />
                </div>

                {/* Sección Planes con animación lateral */}
                <section
                    id="planes"
                    data-aos="fade-right"
                    className="py-20 bg-white/50 rounded-[50px] px-4 my-10 border border-orange-50/50"
                >
                    <div className="text-center mb-16">
                        <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold">
                          ⭐ Nuestros Planes
                        </span>
                        <h2 className="text-5xl font-black text-slate-900 mt-4">
                            Elige el plan perfecto para ti
                        </h2>
                    </div>
                    <Planes alSeleccionarPlan={setPlanSeleccionado} />
                </section>

                {/* Beneficios con efecto de zoom */}
                <section id="beneficios" className="py-12" data-aos="zoom-in">
                    <Features />
                </section>

                {/* Sección Contacto con animación hacia arriba y un pequeño retraso */}
                <section
                    id="contacto"
                    className="py-12"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <Contacto planPredefinido={planSeleccionado} />
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default App;