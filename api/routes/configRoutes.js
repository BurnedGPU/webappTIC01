import express from 'express';
// Importamos las funciones del controlador
import { getConfig, updateConfig } from '../controladores/configController.js';

const router = express.Router();

// --- Ruta GET: /api/config ---
// Llama a la función getConfig del controlador
router.get('/', getConfig);

// --- Ruta POST: /api/config ---
// Llama a la función updateConfig del controlador
router.post('/', updateConfig);

// (Quitamos la lógica y la definición del modelo de aquí)

export default router;