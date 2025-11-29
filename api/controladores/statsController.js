import Estadistica from '../models/Estadistica.js';

export const getStats = async (req, res) => {
    try {
        // 1. Obtener todos los registros de historial
        const logs = await Estadistica.find().sort({ timestamp: -1 });

        // 2. Calcular Tiempo Promedio de Reacción (en minutos)
        let totalReactionTime = 0;
        let reactionCount = 0;

        // 3. Contar dosis por módulo
        const dosesByModule = { 1: 0, 2: 0, 3: 0, 4: 0 };

        logs.forEach(log => {
            // Conteo por módulo
            if (dosesByModule[log.modulo] !== undefined) {
                dosesByModule[log.modulo]++;
            }

            // Cálculo de tiempo de reacción
            if (log.dispersionPastilla && log.recogidaPastilla) {
                const dispensada = new Date(log.dispersionPastilla);
                const recogida = new Date(log.recogidaPastilla);
                const diffMinutes = (recogida - dispensada) / 1000 / 60; // Diferencia en minutos

                // Filtramos valores absurdos (ej: negativos o > 24 horas)
                if (diffMinutes >= 0 && diffMinutes < 1440) {
                    totalReactionTime += diffMinutes;
                    reactionCount++;
                }
            }
        });

        const avgReactionTime = reactionCount > 0
            ? Math.round(totalReactionTime / reactionCount)
            : 0;

        res.json({
            totalDoses: logs.length,
            avgReactionTimeMinutes: avgReactionTime,
            dosesByModule,
            lastEvents: logs.slice(0, 5) // Devolvemos los últimos 5 eventos para una lista
        });

    } catch (error) {
        console.error("Error obteniendo estadísticas:", error);
        res.status(500).json({ error: 'Error calculando estadísticas' });
    }
};