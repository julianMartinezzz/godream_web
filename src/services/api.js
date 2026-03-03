const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/leads";

export const sendLead = async (leadData) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Convertimos el objeto de JavaScript a un String JSON
            body: JSON.stringify(leadData),
        });

        if (!response.ok) {
            // Si el servidor responde con un error (400, 500, etc.)
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al enviar los datos");
        }

        // Si todo sale bien, retornamos la respuesta del servidor
        return await response.json();
    } catch (error) {
        console.error("Error en la petición API:", error);
        throw error;
    }
};

export const getLeads = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error("Error al obtener los leads");
        return await response.json();
    } catch (error) {
        console.error("Error al obtener leads:", error);
        throw error;
    }
};