import express from 'express';
import cors from 'cors';
// No necesitamos importar 'mongoose' o 'dotenv' aquí
// Se manejan en lib/db.js y models/DispenserConfig.js

// Al importar 'configRoutes', se importará el controlador,
// que importará el modelo, que importará 'lib/db.js',
// iniciando así la conexión a la base de datos.
import configRoutes from './routes/configRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// --- Rutas ---
app.get('/', (req, res) => {
    res.json({ message: 'API del Dispensador funcionando.' });
});

// Usamos las rutas directamente
app.use('/api/config', configRoutes);

// Exportar la App para Vercel
export default app;