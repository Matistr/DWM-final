import express from 'express';
import { generarReporteVentasPorFecha } from '../controllers/ordenes.controller.js';

const router = express.Router();

router.post('/reporte', generarReporteVentasPorFecha);

export default router;
