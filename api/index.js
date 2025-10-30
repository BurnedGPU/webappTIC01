import 'dotenv/config'; // Asegurar que dotenv esté primero
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import configRoutes from './routes/configRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("¡ERROR CRÍTICO! MONGO_URI no está definida. Revisa las variables de entorno de Vercel.");
}

// --- Middleware de Conexión a BD (La forma correcta) ---
// Se ejecutará en cada petición a la API, pero Mongoose reutilizará la conexión existente.
const connectDB = async (req, res, next) => {
    // 1. Revisa si ya estamos conectados
    if (mongoose.connection.readyState === 1) {
        console.log("DB ya conectada.");
        return next(); // Ya está conectado, seguir a la ruta
    }

    // 2. Si no, conectar
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI no está definida.");
        }
        console.log("Conectando a MongoDB...");
        await mongoose.connect(MONGO_URI);
        console.log("✅ Conectado a MongoDB.");
        next(); // ¡Éxito! Continuar a la ruta (configController)
    } catch (err) {
        console.error('❌ Error al conectar a MongoDB:', err.message);
        // Devolver un JSON válido para que el frontend no se rompa
        res.status(500).json({ error: 'Fallo al conectar con la base de datos.' });
    }
};
// ------------------------------------------------

// --- Rutas ---
app.get('/', (req, res) => {
    res.json({ message: 'API del Dispensador funcionando.' });
});

// ¡Usamos el middleware!
// Todas las peticiones a /api/config primero deben pasar por connectDB
app.use('/api/config', connectDB, configRoutes);

// Exportar la App para Vercel
export default app;