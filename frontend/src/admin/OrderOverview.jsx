import { useEffect, useState } from 'react';
import axios from '../api/auth.js'; // Asegúrate de que la URL de Axios sea la correcta

const OrdersOverview = () => {
  const [ordenes, setOrdenes] = useState([]);

  // Obtener todas las órdenes (sin filtro) por defecto
  const obtenerOrdenes = async () => {
    try {
      const respuesta = await axios.get('/ordenes'); // Obtener todas las órdenes
      // Ordenar las órdenes por fecha (más recientes primero)
      const ordenadas = respuesta.data.sort((a, b) => new Date(b.fechaVenta) - new Date(a.fechaVenta));
      console.log('Órdenes obtenidas:', ordenadas);
      setOrdenes(ordenadas);
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
    }
  };

  // Obtener órdenes al cargar el componente
  useEffect(() => {
    obtenerOrdenes(); // Obtener todas las órdenes por defecto
  }, []);

  // Agrupar las órdenes por fecha (día)
  const agruparPorDia = (ordenes) => {
    return ordenes.reduce((acc, orden) => {
      const fecha = new Date(orden.fechaVenta).toLocaleDateString(); // Obtener solo la fecha (sin hora)
      if (!acc[fecha]) {
        acc[fecha] = { ordenes: [], totalDia: 0 };
      }
      acc[fecha].ordenes.push(orden);
      acc[fecha].totalDia += orden.total;
      return acc;
    }, {});
  };

  // Obtener las órdenes agrupadas por día
  const ordenesAgrupadas = agruparPorDia(ordenes);

  // Función para imprimir las órdenes
  const imprimirOrdenes = (fecha) => {
    const contenido = document.getElementById(`ordenes-dia-${fecha}`).innerHTML;
    const ventanaImpresion = window.open('', '', 'width=800,height=600');
    ventanaImpresion.document.write('<html><head><title>Órdenes del Día</title></head><body>');
    ventanaImpresion.document.write('<h1>Órdenes del Día: ' + fecha + '</h1>');
    ventanaImpresion.document.write(contenido);
    ventanaImpresion.document.write('</body></html>');
    ventanaImpresion.document.close();
    ventanaImpresion.print();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Órdenes del Día</h1>

      {/* Mostrar órdenes agrupadas por día */}
      {Object.keys(ordenesAgrupadas).map((fecha) => (
        <div key={fecha} className="mb-6">
          <h2 className="text-xl font-bold mb-2">{fecha}</h2>
          <p className="text-lg mb-4">Total ganado: ${ordenesAgrupadas[fecha].totalDia}</p>

          {/* Botón de impresión */}
          <button
            onClick={() => imprimirOrdenes(fecha)}
            className="bg-green-600 text-white px-4 py-1 rounded-md mb-4"
          >
            Imprimir Órdenes
          </button>

          {/* Tabla de órdenes por día */}
          <div id={`ordenes-dia-${fecha}`}>
            <table className="table-auto border-collapse border border-gray-300 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Productos</th>
                  <th className="border border-gray-300 px-4 py-2">Total</th>
                  <th className="border border-gray-300 px-4 py-2">Estado</th>
                  <th className="border border-gray-300 px-4 py-2">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {ordenesAgrupadas[fecha].ordenes.map((orden) => (
                  <tr key={orden._id}>
                    <td className="border border-gray-300 px-4 py-2">{orden._id}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {orden.productos.map((p) => (
                        <div key={p.nombre}>
                          {p.nombre} - {p.cantidad}
                        </div>
                      ))}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">${orden.total}</td>
                    <td className="border border-gray-300 px-4 py-2">{orden.estado}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(orden.fechaVenta).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersOverview;