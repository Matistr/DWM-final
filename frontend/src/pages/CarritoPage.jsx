import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar el carrito del localStorage
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const eliminarDelCarrito = (producto) => {
    // Filtrar el carrito para eliminar el producto
    const carritoActualizado = carrito.filter(
      (item) => item._id !== producto._id
    );

    // Actualizar el carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));

    // Actualizar el estado del carrito
    setCarrito(carritoActualizado);
  };

  const actualizarCantidad = (producto, nuevaCantidad) => {
    // Validar que la cantidad sea mayor a 0
    if (nuevaCantidad < 1) return;

    const carritoActualizado = carrito.map((item) =>
      item._id === producto._id ? { ...item, cantidad: nuevaCantidad } : item
    );

    // Actualizar el carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));

    // Actualizar el estado del carrito
    setCarrito(carritoActualizado);
  };

  const irAlMenu = () => {
    navigate("/menu");
  };

  return (
    <div className="carrito-container">
      <h1>Carrito 🛒</h1>
      <button className="btn-volver-menu" onClick={irAlMenu}>
        Volver al Menú
      </button>

      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="productos-carrito">
          {carrito.map((producto) => (
            <div key={producto._id} className="producto-carrito-item">
              <h2>{producto.titulo}</h2>
              <p>Precio: ${producto.precio}</p>
              <div className="cantidad-control">
                <label htmlFor={`cantidad-${producto._id}`}>Cantidad:</label>
                <input
                  id={`cantidad-${producto._id}`}
                  type="number"
                  min="1"
                  value={producto.cantidad || 1}
                  onChange={(e) =>
                    actualizarCantidad(producto, parseInt(e.target.value, 10))
                  }
                />
              </div>
              <button
                className="btn-eliminar"
                onClick={() => eliminarDelCarrito(producto)}
              >
                Eliminar del carrito
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarritoPage;