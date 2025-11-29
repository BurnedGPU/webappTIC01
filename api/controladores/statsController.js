import Estadistica from '../models/Estadistica.js';

export const getStats = async (req, res) => {
    try {
        const logs = await Estadistica.find().sort({ timestamp: -1 });

        let totalReactionTimeMs = 0;
        let reactionCount = 0;
        const dosesByModule = {};

        // Variables para rastrear Mínimo y Máximo
        // Iniciamos min en infinito para que el primer valor sea menor
        let minReactionMs = Infinity;
        let maxReactionMs = 0;

        logs.forEach(log => {
            // 1. Conteo por módulo
            if (!dosesByModule[log.modulo]) {
                dosesByModule[log.modulo] = 0;
            }
            dosesByModule[log.modulo]++;

            // 2. Cálculos de tiempo
            if (log.tiempoReaccionMs && log.tiempoReaccionMs > 0) {
                totalReactionTimeMs += log.tiempoReaccionMs;
                reactionCount++;

                // Actualizar Mínimo y Máximo
                if (log.tiempoReaccionMs < minReactionMs) minReactionMs = log.tiempoReaccionMs;
                if (log.tiempoReaccionMs > maxReactionMs) maxReactionMs = log.tiempoReaccionMs;
            }
        });

        // Cálculos finales (convertir a minutos con 1 decimal)
        const avgReactionTimeMinutes = reactionCount > 0
            ? Number(((totalReactionTimeMs / reactionCount) / 60000).toFixed(1))
            : 0;

        // Si no hubo reacciones, el mínimo debe ser 0 (no Infinity)
        const minReactionTimeMinutes = reactionCount > 0
            ? Number((minReactionMs / 60000).toFixed(1))
            : 0;

        const maxReactionTimeMinutes = reactionCount > 0
            ? Number((maxReactionMs / 60000).toFixed(1))
            : 0;

        res.json({
            totalDoses: logs.length,
            avgReactionTimeMinutes,
            minReactionTimeMinutes, // <--- Nuevo dato
            maxReactionTimeMinutes, // <--- Nuevo dato
            dosesByModule,
            lastEvents: logs.slice(0, 5)
        });

    } catch (error) {
        console.error("Error obteniendo estadísticas:", error);
        res.status(500).json({ error: 'Error calculando estadísticas' });
    }
};

// ... (la función seedStats se mantiene igual)
export const seedStats = async (req, res) => {
    // ...
};