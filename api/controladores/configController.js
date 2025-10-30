import DispenserConfig from './models/DispenserConfig.js';

// Controlador para GET /api/config
export const getConfig = async (req, res) => {
    try {
        const configs = await DispenserConfig.find().sort({ dispenserId: 1 });
        if (configs.length === 0) {
            console.log("No se encontraron configuraciones, creando iniciales...");
            // --- CAMBIADO (solo intervalSeconds) ---
            const initialConfigs = [
                { dispenserId: 1, intervalSeconds: 3600 },
                { dispenserId: 2, intervalSeconds: 3600 },
                { dispenserId: 3, intervalSeconds: 3600 },
                { dispenserId: 4, intervalSeconds: 3600 },
            ];
            // ------------------------------------
            await DispenserConfig.insertMany(initialConfigs);
            return res.json(initialConfigs);
        }
        res.json(configs);
    } catch (error) {
        console.error("Error al obtener configuración:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// Controlador para POST /api/config
export const updateConfig = async (req, res) => {
    const newConfigs = req.body;
    if (!Array.isArray(newConfigs) || newConfigs.length !== 4) {
        return res.status(400).json({ error: 'Se esperaba un array con 4 configuraciones.' });
    }
    try {
        const updatePromises = newConfigs.map(config => {
            const idToUpdate = config.dispenserId || config.id;
            if (!idToUpdate || typeof idToUpdate !== 'number' || idToUpdate < 1 || idToUpdate > 4) {
                throw new Error(`Configuración inválida recibida para el ID: ${idToUpdate}`);
            }
            // --- CAMBIADO (solo actualiza intervalSeconds) ---
            return DispenserConfig.findOneAndUpdate(
                { dispenserId: idToUpdate },
                { intervalSeconds: config.intervalSeconds }, // Solo actualizamos este campo
                { new: true, upsert: true, runValidators: true }
            );
            // ---------------------------------------------
        });
        const updatedDocs = await Promise.all(updatePromises);
        console.log("Configuración actualizada en BD:", updatedDocs);
        res.status(200).json({ message: 'Configuración guardada exitosamente.' });
    } catch (error) {
        console.error("Error al guardar configuración:", error);
        if (error.name === 'ValidationError' || error.message.startsWith('Configuración inválida')) {
            return res.status(400).json({ error: `Datos inválidos: ${error.message}` });
        }
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};