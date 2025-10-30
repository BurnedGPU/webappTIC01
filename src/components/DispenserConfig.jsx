import React from "react";

// --- CAMBIADO (props) ---
// Quitamos startTime, cambiamos 'interval' por 'intervalSeconds' para claridad
function DispenserConfig({ title, intervalSeconds, onConfigChange }) {

    const handleChange = (e) => {
        // Obtenemos el valor numérico
        const numericValue = parseInt(e.target.value, 10) || 0;

        // Llamamos a la función del padre con la nueva estructura
        onConfigChange({
            intervalSeconds: numericValue
        });
    };

    return (
        <div style={styles.card}>
            <h3 style={styles.subtitle}>{title}</h3>

            {/* --- CAMBIADO (Label e Input) --- */}
            <label style={styles.label}>
                Intervalo (segundos):
            </label>
            <input
                type="number"
                min="1" // Mínimo 1 segundo
                value={intervalSeconds} // Usamos el nuevo prop
                onChange={handleChange} // Usamos el manejador simple
                style={styles.input}
            />
            {/* ------------------------------- */}

            {/* El input de startTime se ha eliminado */}
        </div>
    );
}

// Estilos (se mantienen los de la paleta Vite/React)
const styles = {
    card: {
        textAlign: "left",
        padding: "20px",
        margin: "10px",
        background: "#2f2f2f",
        borderRadius: "12px",
        border: "1px solid #4a4a4a",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        flex: "1 1 300px",
        maxWidth: "400px",
        color: "#e0e0e0",
        boxSizing: 'border-box',
    },
    subtitle: {
        marginTop: 0,
        marginBottom: '15px',
        textAlign: "center",
        color: '#61dafb',
        fontWeight: 'bold',
    },
    label: {
        display: "block",
        marginBottom: "5px",
        marginTop: "12px",
        fontWeight: "bold",
        fontSize: '0.9em',
        color: '#a0a0a0',
    },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #555",
        fontSize: "16px",
        boxSizing: "border-box",
        marginBottom: '10px',
        backgroundColor: '#3b3b3b',
        color: '#ffffff',
    },
};

export default DispenserConfig;