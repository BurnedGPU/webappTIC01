import DispenserConfig from '../models/DispenserConfig.js';

// GET: Obtener configuración
export const getConfig = async (req, res) => {
    try {
        // Obtenemos todos los documentos de la colección 'modulo 1'
        const configs = await DispenserConfig.find().sort({ modulo: 1 });

        // Mapeamos los datos para que el frontend los entienda
        // (convertimos 'modulo' a 'dispenserId' para no romper tu UI actual)
        const frontendData = configs.map(doc => ({
            _id: doc._id,
            dispenserId: doc.modulo, // Adaptamos el nombre para el frontend
            intervalSeconds: doc.intervalSeconds,
            nombre: doc.nombre
        }));

        res.json(frontendData);
    } catch (error) {
        console.error("Error al obtener configuración:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// POST: Añadir nuevo depósito (Módulo)
export const addDispenser = async (req, res) => {
    try {
        // Buscamos el último módulo para asignar el siguiente ID
        const lastDispenser = await DispenserConfig.findOne().sort({ modulo: -1 });
        const newId = lastDispenser ? lastDispenser.modulo + 1 : 1;

        const newDispenser = new DispenserConfig({
            modulo: newId,
            intervalSeconds: 3600, // Default 1 hora
            nombre: `Módulo ${newId}`
        });
        await newDispenser.save();

        // Devolvemos formato compatible con frontend
        res.status(201).json({
            _id: newDispenser._id,
            dispenserId: newDispenser.modulo,
            intervalSeconds: newDispenser.intervalSeconds
        });
    } catch (error) {
        console.error("Error al añadir depósito:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// PUT: Actualizar configuración
export const updateDispenser = async (req, res) => {
    try {
        const { id } = req.params; // _id de MongoDB
        const { intervalSeconds } = req.body;

        // Actualizamos usando el modelo que apunta a 'modulo 1'
        const updatedDispenser = await DispenserConfig.findByIdAndUpdate(
            id,
            {
                intervalSeconds: intervalSeconds,
                timestamp: new Date() // Actualizamos la fecha de modificación
            },
            { new: true }
        );

        if (!updatedDispenser) {
            return res.status(404).json({ error: 'Depósito no encontrado.' });
        }

        res.json({
            _id: updatedDispenser._id,
            dispenserId: updatedDispenser.modulo,
            intervalSeconds: updatedDispenser.intervalSeconds
        });
    } catch (error) {
        console.error("Error al actualizar depósito:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// DELETE: Eliminar depósito
export const deleteDispenser = async (req, res) => {
    try {
        const { id } = req.params;
        await DispenserConfig.findByIdAndDelete(id);
        res.json({ message: 'Depósito eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};