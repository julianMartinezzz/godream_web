/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Colores corporativos de GoDream
                'godream-orange': '#FF6600',
                'godream-orange-dark': '#E65C00',
                'godream-bg': '#FFFBF5',
                'godream-slate': '#0F172A',
            },
            // Añadimos sombras personalizadas para las tarjetas del admin
            boxShadow: {
                'godream': '0 20px 50px rgba(255, 102, 0, 0.05)',
            },
            // Animaciones para que el panel se sienta fluido
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}