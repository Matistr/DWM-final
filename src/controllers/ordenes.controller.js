import Orden from '../models/orden.modelo.js';
import PDFDocument from 'pdfkit';

// Crea una nueva orden
export const crearOrden = async (req, res) => {
  const { productos, total } = req.body;

  if (!productos || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ mensaje: 'El campo "productos" es obligatorio y debe ser un arreglo.' });
  }

  try {
    const nuevaOrden = new Orden({ productos, total });
    await nuevaOrden.save();
    res.status(201).json({ mensaje: 'Orden creada con éxito', orden: nuevaOrden });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la orden', error: error.message });
  }
};

// Obtiene todas las órdenes almacenadas
export const obtenerOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.find();
    res.status(200).json(ordenes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las órdenes', error: error.message });
  }
};

// Obtiene una orden específica por ID
export const obtenerOrdenPorId = async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.id);
    if (!orden) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }
    res.status(200).json(orden);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la orden', error: error.message });
  }
};

// Actualiza una orden específica
export const actualizarOrden = async (req, res) => {
  const { productos } = req.body;

  if (!productos || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ mensaje: 'El campo "productos" es obligatorio y debe ser un arreglo.' });
  }

  try {
    const orden = await Orden.findById(req.params.id);
    if (!orden) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }

    const total = productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    orden.productos = productos;
    orden.total = total;
    await orden.save();

    res.status(200).json({ mensaje: 'Orden actualizada con éxito', orden });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la orden', error: error.message });
  }
};

// Elimina una orden por su ID
export const eliminarOrden = async (req, res) => {
  try {
    const orden = await Orden.findByIdAndDelete(req.params.id);
    if (!orden) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }
    res.status(200).json({ mensaje: 'Orden eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la orden', error: error.message });
  }
};

// Genera un reporte de todas las ventas realizadas
export const obtenerReporteVentas = async (req, res) => {
  try {
    const ordenes = await Orden.find();
    const totalVentas = ordenes.reduce((acc, orden) => acc + orden.total, 0);
    const productosVendidos = {};

    ordenes.forEach((orden) => {
      orden.productos.forEach((producto) => {
        productosVendidos[producto.nombre] = (productosVendidos[producto.nombre] || 0) + producto.cantidad;
      });
    });

    res.status(200).json({ totalVentas, productosVendidos });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el reporte de ventas', error: error.message });
  }
};

// Genera una orden de despacho en formato HTML
export const generarOrdenDespacho = async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.id);
    if (!orden) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }

    orden.estado = 'finalizada';
    await orden.save();

    const htmlContent = `
      <html>
        <head>
          <title>Orden de Despacho</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; }
            .order-details { margin-top: 20px; }
            .products ul { list-style-type: none; padding: 0; }
          </style>
        </head>
        <body>
          <h1>Orden de Despacho</h1>
          <div class="order-details">
            <p><strong>ID de Orden:</strong> ${orden._id}</p>
            <p><strong>Fecha de Venta:</strong> ${orden.fechaVenta.toLocaleDateString()}</p>
            <p><strong>Total:</strong> $${orden.total.toFixed(2)}</p>
            <p><strong>Estado:</strong> ${orden.estado}</p>
          </div>
          <div class="products">
            <h3>Productos:</h3>
            <ul>
              ${orden.productos.map(producto => 
                `<li>${producto.nombre}: ${producto.cantidad} x $${producto.precio.toFixed(2)}</li>`
              ).join('')}
            </ul>
          </div>
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(htmlContent);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al generar la orden de despacho', error: error.message });
  }
};

// Genera un reporte de ventas por rango de fechas en formato PDF
export const generarReporteVentasPorFecha = async (req, res) => {
  const { fechaInicio, fechaFin } = req.body;

  try {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    fin.setHours(23, 59, 59);

    const ordenes = await Orden.find({
      fechaVenta: { $gte: inicio, $lte: fin },
    });

    const pdfDoc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="reporte_ventas.pdf"');

    pdfDoc.pipe(res);

    pdfDoc.fontSize(18).text('Reporte de Ventas', { align: 'center' });
    pdfDoc.moveDown();

    ordenes.forEach((orden) => {
      pdfDoc
        .fontSize(14)
        .text(`ID de Orden: ${orden._id}`)
        .text(`Fecha: ${orden.fechaVenta.toLocaleDateString()}`)
        .text(`Total: $${orden.total.toFixed(2)}`)
        .text('Productos:')
        .moveDown(0.5);

      orden.productos.forEach((producto) => {
        pdfDoc
          .fontSize(12)
          .text(`- ${producto.nombre}: ${producto.cantidad} x $${producto.precio.toFixed(2)}`);
      });

      pdfDoc.moveDown(1);
    });

    pdfDoc.end();
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al generar el reporte', error });
  }
};

// Obtiene órdenes por rango de fechas
export const obtenerOrdenesPorFecha = async (req, res) => {
  const { fechaInicio, fechaFin } = req.body;

  try {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    fin.setHours(23, 59, 59);

    const ordenes = await Orden.find({
      fechaVenta: { $gte: inicio, $lte: fin },
    });

    res.status(200).json(ordenes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las órdenes', error });
  }
};
