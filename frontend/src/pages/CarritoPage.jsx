import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const eliminarDelCarrito = (producto) => {
    const carritoActualizado = carrito.filter(
      (item) => item._id !== producto._id
    );
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    setCarrito(carritoActualizado);
  };

  const actualizarCantidad = (producto, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    const carritoActualizado = carrito.map((item) =>
      item._id === producto._id ? { ...item, cantidad: nuevaCantidad } : item
    );
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    setCarrito(carritoActualizado);
  };

  const irAlMenu = () => {
    navigate("/menu");
  };

  const calcularPrecioTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * (producto.cantidad || 1),
      0
    );
  };

  const confirmarCompra = () => {
    const total = calcularPrecioTotal().toFixed(2);
    alert(`Compra confirmada. Total: $${total}`);
    localStorage.removeItem("carrito");
    setCarrito([]);
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
        <>
          <div className="productos-carrito">
            {carrito.map((producto) => (
              <div key={producto._id} className="producto-carrito-item">
                <img
                  src={producto.imagen}
                  alt={producto.titulo}
                  className="producto-imagen"
                />
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

          <div className="precio-total">
            <h2>Total: ${calcularPrecioTotal().toFixed(2)}</h2>
          </div>

          <div className="ir-a-pagar">
            <button className="btn-pagar" onClick={confirmarCompra}>
              Ir a Pagar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CarritoPage;