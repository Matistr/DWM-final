import React, { useState } from "react";

function ClienteForm({ clienteSeleccionado, actualizarClientes }) {
  const [cliente, setCliente] = useState(
    clienteSeleccionado || {
      nombreCompleto: "",
      correoElectronico: "",
      direccion: "",
      comuna: "",
      region: "",
      telefono: "",
    }
  );

  // Manejar cambios en el formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  // Manejar el envío del formulario
  const manejarSubmit = (e) => {
    e.preventDefault();

    const metodo = clienteSeleccionado ? "PUT" : "POST";
    const url = clienteSeleccionado
      ? `http://localhost:5000/api/clientes/${clienteSeleccionado._id}`
      : "http://localhost:5000/api/clientes";

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    })
      .then((res) => res.json())
      .then((data) => {
        actualizarClientes(data);
        setCliente({
          nombreCompleto: "",
          correoElectronico: "",
          direccion: "",
          comuna: "",
          region: "",
          telefono: "",
        });
      })
      .catch((error) => console.error("Error al guardar cliente:", error));
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h2>{clienteSeleccionado ? "Actualizar Cliente" : "Crear Cliente"}</h2>
      <input
        type="text"
        name="nombreCompleto"
        placeholder="Nombre Completo"
        value={cliente.nombreCompleto}
        onChange={manejarCambio}
        required
      />
      <input
        type="email"
        name="correoElectronico"
        placeholder="Correo Electrónico"
        value={cliente.correoElectronico}
        onChange={manejarCambio}
        required
      />
      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={cliente.direccion}
        onChange={manejarCambio}
      />
      <input
        type="text"
        name="comuna"
        placeholder="Comuna"
        value={cliente.comuna}
        onChange={manejarCambio}
      />
      <input
        type="text"
        name="region"
        placeholder="Región"
        value={cliente.region}
        onChange={manejarCambio}
      />
      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={cliente.telefono}
        onChange={manejarCambio}
      />
      <button type="submit">{clienteSeleccionado ? "Actualizar" : "Crear"}</button>
    </form>
  );
}

export default ClienteForm;
