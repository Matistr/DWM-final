import { useState } from "react";
import ClienteList from "../components/Clienteform";
import ClienteForm from "../components/Clienteform";

function App() {
  const [clienteSeleccionado] = useState(null);

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
