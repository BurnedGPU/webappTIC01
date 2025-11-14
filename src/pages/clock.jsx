import React, { useState, useEffect } from "react";
import DispenserConfig from "../components/DispenserConfig";
import { Link } from "react-router-dom";

function ClockConfig() {
    // El estado ahora es una lista dinámica
    const [configs, setConfigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    // Cargar datos (no cambia)
    useEffect(() => {
        fetch('/api/config')
            .then(response => response.json())
            .then(data => {
                setConfigs(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al cargar la configuración:", error);
                setMessage({ text: "Error al cargar la configuración inicial.", type: 'error' });
                setLoading(false);
            });
    }, []);

    // --- NUEVA FUNCIÓN: Añadir un depósito ---
    const handleAddDispenser = () => {
        setMessage({ text: 'Añadiendo...', type: 'success' });
        fetch('/api/config', { method: 'POST' }) // Llama a la ruta POST (addDispenser)
            .then(res => res.json())
            .then(newDispenser => {
                setConfigs([...configs, newDispenser]); // Añade el nuevo depósito al estado
                setMessage({ text: `Depósito ${newDispenser.dispenserId} añadido.`, type: 'success' });
            })
            .catch(err => {
                console.error("Error al añadir:", err);
                setMessage({ text: 'Error al añadir el depósito.', type: 'error' });
            });
    };

    // --- NUEVA FUNCIÓN: Guardar un depósito (se pasa al hijo) ---
    const handleSaveDispenser = (_id, intervalSeconds, callback) => {
        setMessage(null); // Limpia mensajes
        fetch(`/api/config/${_id}`, { // Llama a la ruta PUT con el _id
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ intervalSeconds })
        })
            .then(res => res.json())
            .then(updatedDispenser => {
                // Actualiza el estado con el depósito modificado
                setConfigs(configs.map(c => c._id === _id ? updatedDispenser : c));
                setMessage({ text: `Depósito ${updatedDispenser.dispenserId} guardado.`, type: 'success' });
                if (callback) callback(); // Llama al callback (para el botón de 'Guardando...')
            })
            .catch(err => {
                console.error("Error al guardar:", err);
                setMessage({ text: 'Error al guardar.', type: 'error' });
                if (callback) callback();
            });
    };

    // --- NUEVA FUNCIÓN: Eliminar un depósito (se pasa al hijo) ---
    const handleDeleteDispenser = (_id) => {
        setMessage(null);
        fetch(`/api/config/${_id}`, { method: 'DELETE' }) // Llama a la ruta DELETE
            .then(res => res.json())
            .then(() => {
                // Filtra el depósito eliminado del estado
                setConfigs(configs.filter(c => c._id !== _id));
                setMessage({ text: 'Depósito eliminado.', type: 'success' });
            })
            .catch(err => {
                console.error("Error al eliminar:", err);
                setMessage({ text: 'Error al eliminar.', type: 'error' });
            });
    };


    if (loading) {
        return <div style={styles.container}><h1>Cargando configuración...</h1></div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>⚙️ Configuración de Depósitos</h1>

            <div style={styles.grid}>
                {configs.map((config) => (
                    <DispenserConfig
                        key={config._id} // Usamos el _id de MongoDB como key
                        data={config} // Pasamos toda la data del depósito
                        onSave={handleSaveDispenser} // Pasamos la función de guardar
                        onDelete={handleDeleteDispenser} // Pasamos la función de eliminar
                    />
                ))}
            </div>

            {/* Botón para añadir nuevo depósito */}
            <button onClick={handleAddDispenser} style={styles.addButton}>
                + Añadir Depósito
            </button>

            {message && <p style={message.type === 'success' ? styles.successMessage : styles.errorMessage}>{message.text}</p>}

            {/* Ya no hay botón de "Guardar Todo" */}

            <Link to="/" style={styles.backButton}>
                Volver al inicio
            </Link>
        </div>
    );
}

// --- Estilos actualizados ---
const messageBaseStyles = {
    marginTop: '20px', fontSize: '16px', fontWeight: 'bold',
    padding: '10px', borderRadius: '5px', maxWidth: '400px', margin: '20px auto'
};

const styles = {
    container: {
        textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif",
        minHeight: '100vh', backgroundColor: '#242424', color: '#e0e0e0',
    },
    title: {
        fontSize: "28px", marginBottom: "30px", color: '#646cff', fontWeight: 'bold',
    },
    grid: {
        display: "flex", flexWrap: "wrap", justifyContent: "center",
        gap: "20px", marginBottom: "30px",
    },
    // Botón para AÑADIR
    addButton: {
        padding: "12px 25px",
        backgroundColor: "#2ecc71", // Verde para "Añadir"
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: 'bold',
        margin: "20px auto",
        display: 'block',
    },
    errorMessage: {
        ...messageBaseStyles,
        backgroundColor: '#ffdddd', color: '#d8000c', border: '1px solid #d8000c',
    },
    successMessage: {
        ...messageBaseStyles,
        backgroundColor: '#ddffdd', color: '#4F8A10', border: '1px solid #4F8A10',
    },
    backButton: {
        display: 'inline-block', marginTop: '20px', marginLeft: '10px',
        padding: '10px 20px', backgroundColor: '#646cff', color: '#ffffff',
        textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold',
    }
};

export default ClockConfig;