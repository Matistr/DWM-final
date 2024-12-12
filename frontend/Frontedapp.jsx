import React, { useState } from "react";
import ClienteList from "./components/ClienteList";
import ClienteForm from "./components/ClienteForm";

function App() {
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const actualizarClientes = (cliente) => {
    console.log("Cliente actualizado o creado:", cliente);
  };

  return (
    <div>
      <h1>Gestión de Clientes</h1>
      <ClienteForm
        clienteSeleccionado={clienteSeleccionado}
        actualizarClientes={actualizarClientes}
      />
      <ClienteList />
    </div>
  );
}

export default App;
