import Compra from '../models/compra.modelo.js'; 

export const getCompras = async (req,res) => {
  try {
      const compras = await Compra.find();
      res.json(compras);
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener las compras', error });
  }
}

export const getCompra = async (req,res) => {
  try {
    const compra = await Compra.findById(req.params.id);
    if (!compra) {
        return res.status(404).json({ message: 'Compra no encontrada' });
    }
    res.json(compra);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la compra', error });
  }
}

export const createCompra = async (req, res) => {
  console.log('Datos recibidos:', req.body);
  const { nombreCliente, productos, total } = req.body;
  if (!nombreCliente || !productos || total === undefined) {
      return res.status(400).json({ message: 'Faltan datos obligatorios para crear la compra.' });
  }
  try {
      const newCompra = new Compra({ nombreCliente, productos, total });
      const compraGuardada = await newCompra.save();
      res.status(201).json({ message: 'Compra guardada exitosamente', compra: compraGuardada });
  } catch (error) {
      res.status(500).json({ message: 'Error al realizar la compra', error });
  }
};


export const deleteCompra = async (req,res) => {
  try {
      const compra = await Compra.findByIdAndDelete(req.params.id);
      if (!compra) {
          return res.status(404).json({ message: 'Compra no encontrada' });
      }
      res.status(200).json({ message: 'Compra eliminada exitosamente' });
  } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la compra', error });
  }
}

export const updateCompra = async (req,res) => {
  try {
      const { total } = req.body;
      if (total !== undefined && (isNaN(total) || total < 0)) {
          return res.status(400).json({ message: 'El total debe ser un número positivo' });
      }
      const compra = await Compra.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!compra) {
          return res.status(404).json({ message: 'Compra no encontrada' });
      }
      res.status(200).json({ message: 'Compra actualizada exitosamente', compra });
  } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la compra', error });
  }
}

export const getComprasDia = async (req, res) => {
  try {
      const inicioDia = new Date();
      inicioDia.setHours(0, 0, 0, 0);
      const finDia = new Date();
      finDia.setHours(23, 59, 59, 999);
      const compras = await Compra.find({
          fecha: {
              $gte: inicioDia,
              $lte: finDia
          }
      });
      if (compras.length === 0) {
          return res.status(404).json({ message: 'No se encontraron compras para el día de hoy.' });
      }
      res.json(compras);
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener las compras del día.', error });
  }
};
