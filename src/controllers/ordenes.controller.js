import Orden from '../models/orden.modelo.js'
import PDFDocument from 'pdfkit';

export const generarReporteVentasPorFecha = async (req, res) => {
  const { fechaInicio, fechaFin } = req.body;

  try {
    // Convertir fechas a formato válido
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    fin.setHours(23, 59, 59); // Incluir todo el día

    // Buscar órdenes en el rango de fechas
    const ordenes = await Orden.find({
      fechaVenta: { $gte: inicio, $lte: fin },
    });

    // Crear el PDF
    const pdfDoc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="reporte_ventas.pdf"'
    );

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
          .text(
            `- ${producto.nombre}: ${producto.cantidad} x $${producto.precio.toFixed(
              2
            )}`
          );
      });

      pdfDoc.moveDown(1);
    });

    pdfDoc.end();
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al generar el reporte', error });
  }
};
