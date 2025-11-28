import mongoose from 'mongoose';

// Definimos el esquema EXACTO que usa el ESP32 (basado en data_0.txt)
const dispenserConfigSchema = new mongoose.Schema({
    nombre: {
        type: String,
        default: 'Medicamento' // Valor por defecto si no se especifica
    },
    intervalSeconds: {
        type: Number,
        required: true
    },
    modulo: { // Antes 'dispenserId'
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    // Forzamos el nombre de la colección para que coincida con la del ESP32
    collection: 'modulo 1'
});

// Nota: Mongoose intentará pluralizar si no se fuerza la colección,
// pero con 'collection: ...' escribiremos donde el ESP32 lee.
export default mongoose.models.DispenserConfig || mongoose.model('DispenserConfig', dispenserConfigSchema);