import React, { useState, useEffect } from "react";
import DispenserConfig from "../components/DispenserConfig";
import { Link } from "react-router-dom";

function ClockConfig() {
    // --- CAMBIADO (Estado inicial) ---
    const [configs, setConfigs] = useState([
        { id: 1, intervalSeconds: 3600 },
        { id: 2, intervalSeconds: 3600 },
        { id: 3, intervalSeconds: 3600 },
        { id: 4, intervalSeconds: 3600 },
    ]);
    // --------------------------------

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null); // Usamos null para el estado inicial

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

    // --- CAMBIADO (Manejo de cambios) ---
    const handleConfigChange = (index, newConfigData) => {
        const updatedConfigs = configs.map((config, i) => {
            if (i === index) {
                return { ...config, ...newConfigData };
            }
            return config;
        });
        setConfigs(updatedConfigs);
        setMessage(null); // Limpiamos mensajes al editar
    };
    // ---------------------------------

    const handleGlobalSave = () => {
        setMessage({ text: 'Guardando...', type: 'success' });
        fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(configs),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.error || `Error HTTP: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log("Respuesta del servidor:", data);
                setMessage({ text: data.message || 'Configuración guardada.', type: 'success' });
            })
            .catch(error => {
                console.error("Error al guardar la configuración:", error);
                setMessage({ text: `Error al guardar: ${error.message}`, type: 'error' });
            });
    };

    if (loading) {
        return <div style={styles.container}><h1>Cargando configuración...</h1></div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>⚙️ Configuración de Intervalos (Segundos)</h1>

            <div style={styles.grid}>
                {configs.map((config, index) => (
                    <DispenserConfig
                        key={config.id}
                        title={`Depósito ${config.dispenserId || config.id}`}
                        intervalSeconds={config.intervalSeconds}
                        onConfigChange={(newConfigData) => handleConfigChange(index, newConfigData)}
                    />
                ))}
            </div>

            {message && <p style={message.type === 'success' ? styles.successMessage : styles.errorMessage}>{message.text}</p>}

            <button onClick={handleGlobalSave} style={styles.saveButton}>
                Guardar Todas las Configuraciones
            </button>

            <Link to="/" style={styles.backButton}>
                Volver al inicio
            </Link>
        </div>
    );
}

// --- ESTILOS CORREGIDOS ---

// 1. Definimos el estilo base para los mensajes PRIMERO
const messageBaseStyles = {
    marginTop: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '10px',
    borderRadius: '5px',
    maxWidth: '400px',
    margin: '20px auto'
};

// 2. Definimos el objeto principal de estilos
const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        minHeight: '100vh',
        backgroundColor: '#242424',
        color: '#e0e0e0',
    },
    title: {
        fontSize: "28px",
        marginBottom: "30px",
        color: '#646cff',
        fontWeight: 'bold',
    },
    grid: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        marginBottom: "30px",
    },
    saveButton: {
        padding: "12px 25px",
        backgroundColor: "#61dafb",
        color: "#242424",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: 'bold',
        margin: "20px auto",
        display: 'block',
    },
    // 3. Usamos el objeto base para crear los estilos de error y éxito
    errorMessage: {
        ...messageBaseStyles, // Usamos el objeto base
        backgroundColor: '#ffdddd',
        color: '#d8000c',
        border: '1px solid #d8000c',
    },
    successMessage: {
        ...messageBaseStyles, // Usamos el objeto base
        backgroundColor: '#ddffdd',
        color: '#4F8A10',
        border: '1px solid #4F8A10',
    },
    backButton: {
        display: 'inline-block',
        marginTop: '20px',
        marginLeft: '10px',
        padding: '10px 20px',
        backgroundColor: '#646cff',
        color: '#ffffff',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
    }
};

export default ClockConfig;