import { useEffect, useState } from "react";

function ClienteList() {
  const [clientes, setClientes] = useState([]);

  // Obtener clientes desde el backend
  useEffect(() => {
    fetch("http://localhost:5000/api/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error("Error al obtener clientes:", error));
  }, []);

  // Eliminar un cliente
  const eliminarCliente = (id) => {
    fetch(`http://localhost:5000/api/clientes/${id}`, {
      method: "DELETE",
    })
      .then(() => setClientes(clientes.filter((cliente) => cliente._id !== id)))
      .catch((error) => console.error("Error al eliminar cliente:", error));
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente._id}>
            {cliente.nombreCompleto} - {cliente.correoElectronico}
            <button onClick={() => eliminarCliente(cliente._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClienteList;
