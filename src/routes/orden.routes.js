import express from 'express';
import {
  crearOrden,
  obtenerOrdenes,
  obtenerOrdenPorId,
  actualizarOrden,
  eliminarOrden,
  obtenerReporteVentas,
  generarOrdenDespacho,
  generarReporteVentasPorFecha,
  obtenerOrdenesPorFecha
} from '../controlador/ordenesController.js';

const router = express.Router();

// Rutas para reportes
router.get('/reporte', obtenerReporteVentas); // Obtener reporte general
router.post('/reporte', generarReporteVentasPorFecha); // Reporte filtrado por fecha

// Rutas para manejo de órdenes
router.post('/', crearOrden); // Crear una nueva orden
router.get('/', obtenerOrdenes); // Obtener todas las órdenes
router.get('/:id', obtenerOrdenPorId); // Obtener una orden por su ID
router.put('/:id', actualizarOrden); // Actualizar una orden por su ID
router.delete('/:id', eliminarOrden); // Eliminar una orden por su ID
router.post('/filtrar', obtenerOrdenesPorFecha); // Filtrar órdenes por fecha

// Ruta para generar la orden de despacho en formato HTML
router.get('/:id/despacho', generarOrdenDespacho);

export default router;