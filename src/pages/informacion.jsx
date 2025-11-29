import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Informacion() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error cargando stats:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div style={styles.container}><h2 style={{textAlign:'center'}}>Cargando datos...</h2></div>;
    }

    // Formatear fecha
    const lastDate = stats?.lastActivity ? new Date(stats.lastActivity).toLocaleString() : 'Sin actividad';

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>📊 Rendimiento del Paciente</h1>

            <div style={styles.grid}>
                {/* Widget 1: Tiempo de Reacción */}
                <div style={styles.widget}>
                    <h3 style={styles.widgetTitle}>Tiempo de Reacción</h3>
                    <p style={styles.dataLarge}>{stats?.avgReactionTimeMinutes || 0} min</p>
                    <p style={styles.dataSmall}>Promedio para tomar la dosis</p>
                </div>

                {/* Widget 2: Dosis Totales Dispendas */}
                <div style={styles.widget}>
                    <h3 style={styles.widgetTitle}>Dosis Totales</h3>
                    <p style={styles.dataLarge}>{stats?.totalDoses || 0}</p>
                    <p style={styles.dataSmall}>Registros históricos</p>
                </div>

                {/* Widget 3: Últimos Eventos (Lista real) */}
                <div style={styles.widget}>
                    <h3 style={styles.widgetTitle}>Última Actividad</h3>
                    {stats?.lastEvents?.length > 0 ? (
                        <div style={{width: '100%', fontSize: '0.9em'}}>
                            {stats.lastEvents.map((ev, i) => (
                                <div key={i} style={styles.row}>
                                    <span style={{color: '#61dafb'}}>Mód {ev.modulo}</span>
                                    <span>
                    {/* Usamos siempre timestamp porque es el único seguro */}
                                        {new Date(ev.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={styles.placeholder}>Sin registros recientes</p>
                    )}
                </div>
            </div>

            {/* ... botón de volver ... */}
        </div>
    );
}

// Estilos (Reutilizamos los tuyos, agregando 'row' para la lista)
const styles = {
    container: {
        width: '100%', minHeight: '100vh', padding: '20px',
        fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
        backgroundColor: '#242424', color: '#e0e0e0', boxSizing: 'border-box'
    },
    title: {
        textAlign: 'center', color: '#646cff', marginBottom: '30px',
        fontSize: '28px', fontWeight: 'bold',
    },
    grid: {
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: '20px', marginBottom: '40px',
    },
    widget: {
        backgroundColor: '#2f2f2f', border: '1px solid #4a4a4a',
        borderRadius: '12px', padding: '20px',
        minWidth: '280px', minHeight: '180px', flex: '1', maxWidth: '350px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    },
    widgetTitle: {
        marginTop: 0, marginBottom: '15px', color: '#61dafb',
        textAlign: 'center', fontSize: '18px', fontWeight: 'bold',
    },
    dataLarge: {
        fontSize: '3em', fontWeight: 'bold', color: '#61dafb',
        textAlign: 'center', margin: '10px 0',
    },
    dataSmall: {
        fontSize: '1em', color: '#a0a0a0', textAlign: 'center', margin: '5px 0',
    },
    row: {
        display: 'flex', justifyContent: 'space-between', width: '80%',
        margin: '5px auto', borderBottom: '1px solid #444', paddingBottom: '5px'
    },
    backButton: {
        display: 'block', width: 'fit-content', margin: '20px auto',
        padding: '10px 20px', backgroundColor: '#646cff', color: '#ffffff',
        textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold',
    },
    placeholder: { fontStyle: 'italic', color: '#666' }
};

export default Informacion;