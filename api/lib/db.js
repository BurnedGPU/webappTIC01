// Este archivo se encarga de iniciar y mantener la conexión a MongoDB.
import 'dotenv/config'; // Asegura que las variables de entorno se carguen
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('MONGO_URI no está definida en las variables de entorno.');
}

// Mongoose 7+ maneja el pooling de conexión automáticamente.
// Solo necesitamos ejecutar connect() una vez al inicio.
console.log("Iniciando conexión a MongoDB...");

// Simplemente iniciamos la conexión aquí.
// Cualquier archivo que importe este, iniciará la conexión.
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Conexión a MongoDB establecida."))
    .catch(err => console.error("❌ Error inicial de conexión a MongoDB:", err));

// Exportamos la instancia de mongoose por si se necesita (aunque no es estrictamente necesario)
export default mongoose;