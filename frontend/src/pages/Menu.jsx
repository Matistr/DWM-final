import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/menu");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const agregarAlCarrito = async (producto) => {
    try {
      // Obtener carrito actual del localStorage
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      // Agregar el producto al carrito
      carrito.push(producto);

      // Guardar el carrito actualizado en el localStorage
      localStorage.setItem("carrito", JSON.stringify(carrito));

      alert(`${producto.titulo} añadido al carrito.`);
    } catch (error) {
      console.error("Error al añadir el producto al carrito:", error);
      alert("Hubo un error al añadir el producto al carrito.");
    }
  };

  const irAlCarrito = () => {
    navigate("/carrito");
  };

  return (
    <div className="menu-container">
      <h1>🍣 Menú 🍣</h1>
      <button className="btn-carrito" onClick={irAlCarrito}>
        Ir al carrito 🛒
      </button>
      <div className="productos">
        {productos.map((producto) => (
          <div key={producto._id} className="producto-item">
            <img
              src={producto.imagen}
              alt={producto.titulo}
              className="producto-imagen"
            />
            <h2>{producto.titulo}</h2>
            <p>Precio: ${producto.precio}</p>
            <p>Stock: {producto.stock}</p>
            <button
              className="btn-agregar"
              onClick={() => agregarAlCarrito(producto)}
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;