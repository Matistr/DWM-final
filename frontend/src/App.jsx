import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menu from "./pages/Menu";
import CarritoPage from "./pages/CarritoPage";
import BarraDeNavegacion from "./components/BarraDeNavegacion";
import ReporteVentas from './pages/ReporteVentas.jsx'
import HomePage from './pages/HomePage.jsx'
import AdminNavbar from './admin/AdminNavbar.jsx'
import OrdersOverview from './admin/OrderOverview.jsx'
import DispatchManager from './admin/DispatchManager.jsx'
import Footer from "./components/Footer";

import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <BarraDeNavegacion />
      <Routes>
        {/* Ruta de la landing page */}
        <Route path="/" element={<HomePage />} />

        {/* Rutas del panel de administración */}
        <Route
          path="/admin/orders-overview"
          element={
            <>
              <AdminNavbar />
              <OrdersOverview />
            </>
          }
        />
        <Route
          path="/admin/dispatch-manager"
          element={
            <>
              <AdminNavbar />
              <DispatchManager />
            </>
          }
        />
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