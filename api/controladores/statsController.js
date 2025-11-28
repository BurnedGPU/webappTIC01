import DispenserConfig from '../models/DispenserConfig.js';

export const getStats = async (req, res) => {
    try {
        // 1. Contar total de documentos
        const totalDocs = await DispenserConfig.countDocuments();

        // 2. Obtener el último registro (para ver cuándo fue la última actividad)
        const lastEntry = await DispenserConfig.findOne().sort({ timestamp: -1 });

        // 3. Agregación para contar cuántos registros hay por cada módulo
        const countByModule = await DispenserConfig.aggregate([
            {
                $group: {
                    _id: "$modulo", // Agrupar por el campo 'modulo'
                    count: { $sum: 1 }, // Contar
                    avgInterval: { $avg: "$intervalSeconds" } // Promedio de intervalos
                }
            },
            { $sort: { _id: 1 } } // Ordenar por número de módulo (1, 2, 3...)
        ]);

        res.json({
            total: totalDocs,
            lastActivity: lastEntry ? lastEntry.timestamp : null,
            byModule: countByModule
        });

    } catch (error) {
        console.error("Error obteniendo estadísticas:", error);
        res.status(500).json({ error: 'Error calculando estadísticas' });
    }
};