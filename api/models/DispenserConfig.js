import mongoose from 'mongoose';

const dispenserConfigSchema = new mongoose.Schema({
    dispenserId: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
        max: 4
    },
    // --- CAMBIADO ---
    // Ya no usamos intervalHours ni startTime
    intervalSeconds: {
        type: Number,
        required: true,
        min: 1, // Un intervalo mínimo de 1 segundo
        default: 3600 // Por defecto 1 hora (3600 segundos)
    }
    // -------------
}, {
    timestamps: true
});

const DispenserConfig = mongoose.model('DispenserConfig', dispenserConfigSchema);

export default DispenserConfig;