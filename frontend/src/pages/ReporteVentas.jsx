import React, { useState } from 'react';
import axios from 'axios';

const ReporteVentas = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const handleGenerarReporte = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:4000/api/ordenes/reporte', // Endpoint del backend
        { fechaInicio, fechaFin },
        { responseType: 'blob' } // Para recibir un archivo PDF
      );

      // Crear una URL para mostrar el PDF
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      alert('Ocurrió un error al generar el reporte.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reporte de Ventas</h1>
      <form onSubmit={handleGenerarReporte} className="mb-4">
        <div className="mb-2">
          <label htmlFor="fechaInicio" className="block font-semibold">
            Fecha de Inicio:
          </label>
          <input
            type="date"
            id="fechaInicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="fechaFin" className="block font-semibold">
            Fecha de Fin:
          </label>
          <input
            type="date"
            id="fechaFin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generar Reporte
        </button>
      </form>

      {pdfUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Reporte Generado:</h2>
          <iframe
            src={pdfUrl}
            width="100%"
            height="500px"
            className="border"
            title="Reporte de Ventas"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ReporteVentas;