import mongoose from 'mongoose';

const dispenserConfigSchema = new mongoose.Schema({
    // El dispenserId es ahora solo para mostrar "Depósito 1", "Depósito 2", etc.
    dispenserId: {
        type: Number,
        required: true,
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

// Usamos el patrón seguro para serverless
export default mongoose.models.DispenserConfig || mongoose.model('DispenserConfig', dispenserConfigSchema);