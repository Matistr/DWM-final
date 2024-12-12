import express from 'express';
import Orden from '../modelo/Orden.js'; // Ajusta la ruta según la estructura de tu proyecto

const router = express.Router();

// Ruta para obtener todas las órdenes o filtrar por fecha
router.get('/', async (req, res) => {
  try {
    const { fecha } = req.query; // Recibimos la fecha como query parameter
    let condiciones = {};

    if (fecha) {
      const inicioDia = new Date(fecha);
      const finDia = new Date(fecha);
      finDia.setDate(finDia.getDate() + 1);

      condiciones.fechaVenta = { $gte: inicioDia, $lt: finDia };
    }

    const ordenes = await Orden.find(condiciones);
    res.status(200).json(ordenes);
  } catch (error) {
    console.error('Error al obtener las órdenes del día:', error);
    res.status(500).json({ mensaje: 'Error al obtener las órdenes del día', error });
  }
});

export default router;