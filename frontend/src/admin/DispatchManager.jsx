import { useEffect, useState } from 'react';
import axios from '../api/auth.js'; // Asegúrate de que la URL de Axios sea correcta

const OrdersOverview = () => {
  const [ordenes, setOrdenes] = useState([]);

  // Obtener todas las órdenes
  const obtenerOrdenes = async () => {
    try {
      const respuesta = await axios.get('/ordenes'); // Ruta para obtener todas las órdenes
      const ordenadas = respuesta.data.sort((a, b) => new Date(b.fechaVenta) - new Date(a.fechaVenta)); // Ordenar por fecha
      setOrdenes(ordenadas);
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
    }
  };

  // Imprimir una orden individual
  const imprimirOrden = (ordenId) => {
    console.log(`Intentando imprimir la orden con ID: ${ordenId}`);
    const orden = ordenes.find((o) => o._id === ordenId);
    if (orden) {
      const contenido = document.getElementById(`orden-${ordenId}`).innerHTML;
      const ventanaImpresion = window.open('', '', 'width=800,height=600');
      ventanaImpresion.document.write('<html><head><title>Orden</title></head><body>');
      ventanaImpresion.document.write('<h1>Orden:</h1>');
      ventanaImpresion.document.write(contenido);
      ventanaImpresion.document.write('</body></html>');
      ventanaImpresion.document.close();
      ventanaImpresion.print();
    } else {
      console.error('Orden no encontrada');
    }
  };

  // Obtener las órdenes al cargar el componente
  useEffect(() => {
    obtenerOrdenes();
  }, []);

  // Agrupar las órdenes por fecha
  const agruparPorDia = (ordenes) => {
    return ordenes.reduce((acc, orden) => {
      const fecha = new Date(orden.fechaVenta).toLocaleDateString(); // Obtener solo la fecha
      if (!acc[fecha]) {
        acc[fecha] = [];
      }
      acc[fecha].push(orden);
      return acc;
    }, {});
  };

  // Órdenes agrupadas por día
  const ordenesAgrupadas = agruparPorDia(ordenes);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Órdenes de Despacho</h1>

      {Object.keys(ordenesAgrupadas).map((fecha) => (
        <div key={fecha} className="mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <h2 className="text-2xl font-semibold text-center">{fecha}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ordenesAgrupadas[fecha].map((orden) => (
              <div key={orden._id} id={`orden-${orden._id}`} className="bg-gray-100 shadow-lg rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-800">Orden ID: {orden._id}</h3>
                <p><strong>Total: </strong>${orden.total}</p>
                <p><strong>Fecha: </strong>{new Date(orden.fechaVenta).toLocaleDateString()}</p>
                <p><strong>Productos:</strong></p>
                <ul>
                  {orden.productos.map((producto) => (
                    <li key={producto.nombre} className="text-gray-700">
                      {producto.nombre} - {producto.cantidad}
                    </li>
                  ))}
                </ul>

                {/* Botón de impresión */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => imprimirOrden(orden._id)}
                    className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-700"
                  >
                    Imprimir Orden
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersOverview;