import express from 'express';
// Importamos las nuevas funciones
import {
    getConfig,
    addDispenser,
    updateDispenser,
    deleteDispenser
} from '../controladores/configController.js';

const router = express.Router();

// GET /api/config -> Obtiene todos
router.get('/', getConfig);

// POST /api/config -> Añade uno nuevo
router.post('/', addDispenser);

// PUT /api/config/:id -> Actualiza uno existente (por _id)
router.put('/:id', updateDispenser);

// DELETE /api/config/:id -> Elimina uno existente (por _id)
router.delete('/:id', deleteDispenser);

export default router;