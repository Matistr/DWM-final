// ordenesDespacho.js
import express from 'express';
import Orden from '../modelo/Orden.js';

const router = express.Router();

// Ruta para cambiar el estado de la orden a 'finalizada'
router.patch('/:id/cambiar-estado', async (req, res) => {
  const { id } = req.params;

  try {
    const orden = await Orden.findById(id);
    if (!orden) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    if (orden.estado === 'pendiente') {
      // Cambiar el estado de la orden a 'finalizada'
      orden.estado = 'finalizada';
      await orden.save();

      // Devolver la orden actualizada con el estado cambiado
      res.status(200).json(orden);
    } else {
      return res.status(400).json({ message: 'La orden no estÃ¡ pendiente' });
    }
  } catch (error) {
    console.error('Error al procesar la orden:', error);
    res.status(500).json({ message: 'Error al procesar la orden', error: error.message });
  }
});

export default router;