import mongoose from 'mongoose';
import '../lib/db.js'; // <-- ¡IMPORTANTE! Importa el archivo de conexión

// Schema (sin cambios)
const dispenserConfigSchema = new mongoose.Schema({
    dispenserId: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
        max: 4
    },
    intervalSeconds: {
        type: Number,
        required: true,
        min: 1,
        default: 3600
    }
}, {
    timestamps: true
});

// --- PATRÓN SEGURO PARA SERVERLESS ---
// Revisa si el modelo ya fue compilado antes de intentar compilarlo de nuevo
// Esto evita errores durante el "hot-reloading" en Vercel
export default mongoose.models.DispenserConfig || mongoose.model('DispenserConfig', dispenserConfigSchema);