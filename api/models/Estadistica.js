import mongoose from 'mongoose';

const estadisticaSchema = new mongoose.Schema({
    modulo: Number,
    dispersionPastilla: Date,
    recogidaPastilla: Date,
    timestamp: { type: Date, default: Date.now }
}, {
    // Aseguramos que lea de la colección correcta
    // Nota: Mongoose suele buscar el plural minúscula ('estadisticas') por defecto,
    // pero para asegurar compatibilidad con tu sistema existente:
    collection: 'estadisticas'
});

export default mongoose.models.Estadistica || mongoose.model('Estadistica', estadisticaSchema);