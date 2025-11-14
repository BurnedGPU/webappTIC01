import DispenserConfig from '../models/DispenserConfig.js';

// --- GET /api/config ---
// Obtiene todos los depósitos. Si no hay, crea el primero.
export const getConfig = async (req, res) => {
    try {
        const configs = await DispenserConfig.find().sort({ dispenserId: 1 });
        if (configs.length === 0) {
            console.log("No se encontraron configuraciones, creando la inicial...");
            const initialConfig = { dispenserId: 1, intervalSeconds: 3600 };
            const newConfig = await DispenserConfig.create(initialConfig);
            return res.json([newConfig]); // Devuelve un array con el nuevo
        }
        res.json(configs);
    } catch (error) {
        console.error("Error al obtener configuración:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// --- POST /api/config ---
// AÑADE un nuevo depósito.
export const addDispenser = async (req, res) => {
    try {
        // 1. Encontrar el dispenserId más alto actual
        const lastDispenser = await DispenserConfig.findOne().sort({ dispenserId: -1 });
        const newId = lastDispenser ? lastDispenser.dispenserId + 1 : 1;

        // 2. Crear el nuevo depósito
        const newDispenser = new DispenserConfig({
            dispenserId: newId,
            intervalSeconds: 3600 // Valor por defecto
        });
        await newDispenser.save();

        // 3. Devolver el nuevo depósito al frontend
        res.status(201).json(newDispenser); // 201 = Creado
    } catch (error) {
        console.error("Error al añadir depósito:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// --- PUT /api/config/:id ---
// ACTUALIZA un depósito existente por su _id
export const updateDispenser = async (req, res) => {
    try {
        const { id } = req.params; // Este es el _id de MongoDB
        const { intervalSeconds } = req.body; // Solo actualizamos el intervalo

        if (intervalSeconds === undefined) {
            return res.status(400).json({ error: 'Falta intervalSeconds.' });
        }

        const updatedDispenser = await DispenserConfig.findByIdAndUpdate(
            id,
            { intervalSeconds },
            { new: true, runValidators: true } // Devuelve el doc actualizado y corre validadores
        );

        if (!updatedDispenser) {
            return res.status(404).json({ error: 'Depósito no encontrado.' });
        }
        res.json(updatedDispenser);
    } catch (error) {
        console.error("Error al actualizar depósito:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


// --- DELETE /api/config/:id ---
// ELIMINA un depósito por su _id
export const deleteDispenser = async (req, res) => {
    try {
        const { id } = req.params; // Este es el _id de MongoDB

        const deletedDispenser = await DispenserConfig.findByIdAndDelete(id);

        if (!deletedDispenser) {
            return res.status(404).json({ error: 'Depósito no encontrado.' });
        }
        res.json({ message: 'Depósito eliminado exitosamente.' });
    } catch (error) {
        console.error("Error al eliminar depósito:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};