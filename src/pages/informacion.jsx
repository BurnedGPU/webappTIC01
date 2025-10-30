import React from "react";
import { Link } from "react-router-dom";

function Informacion() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>📊 Estadísticas de Medicación</h1>

            <div style={styles.grid}>
                {/* Widget 1: Nivel de Depósitos */}
                <div style={styles.widget}>
                    <h3 style={styles.widgetTitle}>Nivel de Depósitos</h3>
                    <p style={styles.placeholder}>[Gráfico de Dona]</p>
                    <p style={styles.dataSmall}>Dep. 1: 80% | Dep. 2: 60%</p>
                    <p style={styles.dataSmall}>Dep. 3: 100% | Dep. 4: 30%</p>
                </div>

                {/* Widget 2: Consumo Semanal */}
                <div style={styles.widget}>
                    <h3 style={styles.widgetTitle}>Consumo Semanal</h3>
                    <p style={styles.placeholder}>[Gráfico de Línea]</p>
                </div>

                {/* Widget 3: Próxima Dosis */}
                <div style={styles.widget}>
                    <h3 style={styles.widgetTitle}>Próximas Dosis</h3>
                    <p style={styles.dataLarge}>Depósito 4: 14:30</p>
                    <p style={styles.dataSmall}>Depósito 1: 16:00</p>
                </div>

                {/* Widget 4: Historial de Dosis */}
                <div style={styles.widget}>
                    <h3 style={styles.widgetTitle}>Historial de Dosis (24h)</h3>
                    <p style={styles.placeholder}>[Gráfico de Barras]</p>
                </div>
            </div>

            <Link to="/" style={styles.backButton}>
                Volver al inicio
            </Link>
        </div>
    );
}

// --- ESTILOS ACTUALIZADOS VITE/REACT ---
const styles = {
    container: {
        width: '100%',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
        backgroundColor: '#242424', // Fondo oscuro estándar Vite/React
        color: '#e0e0e0', // Texto claro general
        boxSizing: 'border-box'
    },
    title: {
        textAlign: 'center',
        color: '#646cff', // Vite Purple para el título principal
        marginBottom: '30px',
        fontSize: '28px',
        fontWeight: 'bold',
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '40px', // Espacio antes del botón
    },
    widget: {
        backgroundColor: '#2f2f2f', // Fondo un poco más claro para widgets
        border: '1px solid #4a4a4a', // Borde sutil
        borderRadius: '12px',
        padding: '20px',
        minWidth: '300px',
        minHeight: '220px',
        flex: '1',
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        boxSizing: 'border-box',
        display: 'flex', // Usar flexbox para alinear contenido
        flexDirection: 'column', // Alinear verticalmente
        justifyContent: 'space-between', // Distribuir espacio
    },
    widgetTitle: {
        marginTop: 0,
        marginBottom: '15px',
        color: '#61dafb', // React Blue para títulos de widgets
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    placeholder: {
        color: '#888', // Gris más claro para placeholders
        textAlign: 'center',
        fontSize: '16px',
        fontStyle: 'italic',
        flexGrow: 1, // Ocupa el espacio disponible
        display: 'flex',
        alignItems: 'center', // Centrar verticalmente
        justifyContent: 'center', // Centrar horizontalmente
        minHeight: '50px',
    },
    dataLarge: {
        fontSize: '2.2em',
        fontWeight: 'bold',
        color: '#61dafb', // React Blue
        textAlign: 'center',
        margin: '10px 0 5px 0',
    },
    dataSmall: {
        fontSize: '1em',
        color: '#a0a0a0', // Gris suave para datos pequeños
        textAlign: 'center',
        margin: '2px 0',
    },
    backButton: {
        display: 'block', // Hacerlo bloque para centrar con margen auto
        width: 'fit-content', // Ajustar ancho al contenido
        margin: '20px auto 0 auto', // Margen superior y centrado horizontal
        padding: '10px 20px',
        backgroundColor: '#646cff', // Vite Purple
        color: '#ffffff',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        transition: 'background-color 0.2s',
    }
};

// Hover opcional para el botón
styles.backButton[':hover'] = { backgroundColor: '#7a82ff' };


export default Informacion;