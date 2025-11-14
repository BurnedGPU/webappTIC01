import React, { useState, useEffect } from "react";

// Recibimos los datos (data) y las funciones del padre (onSave, onDelete)
function DispenserConfig({ data, onSave, onDelete }) {

    // El componente ahora maneja su propio estado basado en las props
    const [interval, setInterval] = useState(data.intervalSeconds);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);

    // Sincroniza el estado si la prop (data) cambia
    useEffect(() => {
        setInterval(data.intervalSeconds);
    }, [data.intervalSeconds]);

    const handleChange = (e) => {
        setInterval(parseInt(e.target.value, 10) || 0);
        setHasChanged(true); // Marca que hay cambios sin guardar
    };

    const handleSaveClick = () => {
        setIsSaving(true);
        // Llama a la función 'onSave' del padre
        onSave(data._id, interval, () => {
            setIsSaving(false); // Callback para cuando termine
            setHasChanged(false);
        });
    };

    const handleDeleteClick = () => {
        if (window.confirm(`¿Seguro que quieres eliminar el Depósito ${data.dispenserId}?`)) {
            onDelete(data._id); // Llama a la función 'onDelete' del padre
        }
    };

    return (
        <div style={styles.card}>
            {/* Botón de Eliminar (X) */}
            <button onClick={handleDeleteClick} style={styles.deleteButton}>×</button>

            <h3 style={styles.subtitle}>Depósito {data.dispenserId}</h3>

            <label style={styles.label}>
                Intervalo (segundos):
            </label>
            <input
                type="number"
                min="1"
                value={interval}
                onChange={handleChange}
                style={styles.input}
            />

            {/* Botón de Guardar (solo si hay cambios) */}
            {hasChanged && (
                <button onClick={handleSaveClick} style={styles.saveButton} disabled={isSaving}>
                    {isSaving ? 'Guardando...' : 'Guardar'}
                </button>
            )}
        </div>
    );
}

// Estilos actualizados
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
        position: 'relative', // Para posicionar el botón de eliminar
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
    saveButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#61dafb',
        color: '#242424',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '10px',
    },
    deleteButton: {
        position: 'absolute',
        top: '5px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        color: '#999',
        fontSize: '24px',
        fontWeight: 'bold',
        cursor: 'pointer',
    }
};

export default DispenserConfig;