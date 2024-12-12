import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menu from "./pages/Menu";
import CarritoPage from "./pages/CarritoPage";
import BarraDeNavegacion from "./components/BarraDeNavegacion";
import ReporteVentas from './pages/ReporteVentas.jsx'
import Footer from "./components/Footer";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <BarraDeNavegacion />
      <Routes>
        <Route path="/" element={<Navigate to="/menu" />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/ventas" element={<ReporteVentas/>} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/checkout" element={<h1>Checkout</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;