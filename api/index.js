import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import configRoutes from './routes/configRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// --- Middleware para asegurar la conexión a la BD ---
const connectDB = async (req, res, next) => {
    // Mongoose 7+ maneja el pooling de conexión,
    // pero verificamos el estado 1 (conectado)
    if (mongoose.connection.readyState === 1) {
        console.log("DB ya conectada.");
        return next(); // Ya está conectado, seguir a la ruta
    }

    // Si no está conectado, intentar conectar
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI no está definida en las variables de entorno.");
        }
        console.log("Intentando conectar a DB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Conectado a MongoDB");
        next(); // Conexión exitosa, seguir a la ruta
    } catch (err) {
        console.error('❌ Error al conectar a MongoDB:', err.message);
        // ¡IMPORTANTE! Enviar un error JSON que el frontend pueda leer
        res.status(500).json({ error: 'Error al conectar a la base de datos.' });
    }
};

// --- Rutas ---
app.get('/', (req, res) => {
    res.json({ message: 'API del Dispensador funcionando.' });
});

// Aplicamos el middleware connectDB ANTES de las rutas de 'configRoutes'
// Cualquier petición a /api/config primero pasará por connectDB
app.use('/api/config', connectDB, configRoutes);

// Exportar la App para Vercel
export default app;