import mongoose from 'mongoose';

const estadisticaSchema = new mongoose.Schema({
    modulo: Number,
    tiempoReaccionMs: Number, // <-- CAMBIO CLAVE: El campo real de la BD
    timestamp: { type: Date, default: Date.now }
}, {
    collection: 'estadisticas'
});

export default mongoose.models.Estadistica || mongoose.model('Estadistica', estadisticaSchema);