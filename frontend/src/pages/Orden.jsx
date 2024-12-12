import { useState, useEffect, useCallback } from "react";

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Definir fetchOrdenes con useCallback
  const fetchOrdenes = useCallback(async () => {
    try {
      const response = await fetch('/api/ordenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fechaInicio, fechaFin }),
      });

      if (!response.ok) throw new Error('Error al obtener las órdenes');
      const data = await response.json();
      setOrdenes(data);
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al cargar las órdenes.');
    }
  }, [fechaInicio, fechaFin]);

  // useEffect para cargar las órdenes al montar el componente o al cambiar las fechas
  useEffect(() => {
    fetchOrdenes();
  }, [fetchOrdenes]);

  return (
    <div className="ordenes-container">
      <h1>Órdenes Generadas</h1>
      <div className="filtros-fechas">
        <label>
          Fecha Inicio:
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </label>
        <label>
          Fecha Fin:
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </label>
        <button onClick={fetchOrdenes}>Filtrar</button>
      </div>

      <div className="lista-ordenes">
        {ordenes.length === 0 ? (
          <p>No hay órdenes en el rango seleccionado.</p>
        ) : (
          ordenes.map((orden) => (
            <div key={orden._id} className="orden-item">
              <h2>ID de Orden: {orden._id}</h2>
              <p>Fecha: {new Date(orden.fechaVenta).toLocaleDateString()}</p>
              <p>Total: ${orden.total.toFixed(2)}</p>
              <div>
                <h3>Productos:</h3>
                <ul>
                  {orden.productos.map((producto, idx) => (
                    <li key={idx}>
                      {producto.nombre} - {producto.cantidad} x $
                      {producto.precio.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ordenes;