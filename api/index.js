import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import configRoutes from './routes/configRoutes.js';

// 1. Conectar a la BD (Mongoose maneja el pooling de conexión)
// Vercel ejecutará esto cuando "despierte" la función
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// 2. Definir la App de Express
const app = express();
app.use(cors());
app.use(express.json());

// 3. Definir Rutas
app.get('/', (req, res) => {
    res.json({ message: 'API del Dispensador funcionando.' });
});
app.use('/api/config', configRoutes);

// 4. Exportar la App
// Vercel usará esto para crear la función serverless
export default app;