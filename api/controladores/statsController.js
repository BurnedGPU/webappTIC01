import Estadistica from '../models/Estadistica.js';

export const getStats = async (req, res) => {
    try {
        const logs = await Estadistica.find().sort({ timestamp: -1 });

        let totalReactionTimeMs = 0;
        let reactionCount = 0;
        const dosesByModule = {}; // Objeto dinámico para contar cualquier módulo

        logs.forEach(log => {
            // 1. Conteo por módulo
            if (!dosesByModule[log.modulo]) {
                dosesByModule[log.modulo] = 0;
            }
            dosesByModule[log.modulo]++;

            // 2. Cálculo de tiempo de reacción (usando el campo directo)
            // Solo sumamos si el tiempo es válido (mayor a 0)
            if (log.tiempoReaccionMs && log.tiempoReaccionMs > 0) {
                totalReactionTimeMs += log.tiempoReaccionMs;
                reactionCount++;
            }
        });

        // Convertimos ms a minutos para el promedio
        const avgReactionTimeMinutes = reactionCount > 0
            ? Math.round((totalReactionTimeMs / reactionCount) / 60000) // ms -> min
            : 0;

        res.json({
            totalDoses: logs.length,
            avgReactionTimeMinutes, // Ahora enviamos el cálculo correcto
            dosesByModule,
            lastEvents: logs.slice(0, 5)
        });

    } catch (error) {
        console.error("Error obteniendo estadísticas:", error);
        res.status(500).json({ error: 'Error calculando estadísticas' });
    }
};