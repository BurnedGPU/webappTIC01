import express from 'express';
import { getStats } from '../controladores/statsController.js';

const router = express.Router();

// GET /api/stats
router.get('/', getStats);

export default router;