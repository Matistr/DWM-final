import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-red-600 shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Texto fijo: Panel Admin */}
        <span className="text-xl font-bold text-black">
          Panel Admin
        </span>
        <ul className="flex space-x-4">
          <li>
            <Link to="/admin/orders-overview" className="text-black hover:text-white">
              Órdenes del Día
            </Link>
          </li>
          <li>
            <Link to="/admin/dispatch-manager" className="text-black hover:text-white">
              Encargado de Despacho
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;