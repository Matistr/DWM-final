import React from "react";
import { Link } from "react-router-dom";

const BarraDeNavegacion = () => {
  return (
    <nav className="barra-navegacion">
      <div className="logo">
        <Link to="/">Sushi Fukusuke</Link>
      </div>
      <ul className="menu">
        <li>
          <Link to="/" className="menu-btn">
            Carta
          </Link>
        </li>
        <li>
          <Link to="/contacto" className="menu-btn">
            Contacto
          </Link>
        </li>
        <li>
          <Link to="/login" className="menu-btn">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BarraDeNavegacion;