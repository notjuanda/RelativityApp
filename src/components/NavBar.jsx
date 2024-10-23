// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="text-gray-300" style={{ height: '130px' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
        <div className="flex items-center">
            <Link to="/" className=" font-sans text-white text-3xl font-bold hover:text-indigo-300" style={{color:'#0D92F4'}}>
                RelativityApp
            </Link>
        </div>
        <div className="hidden md:flex space-x-8">
            <Link
            to="/"
            className="hover:text-blue-400 text-sm font-medium"
            >
            Home / Dashboard
            </Link>
            <Link
            to="/experimento/crear"
            className="hover:text-blue-300 text-sm font-medium"
            >
            Crear Experimento
            </Link>
            <Link
            to="/cargar-datos"
            className="hover:text-blue-300 text-sm font-medium"
            >
            Cargar Datos
            </Link>
            <Link
            to="/logs"
            className="hover:text-blue-300 text-sm font-medium"
            >
            Ver Logs
            </Link>
        </div>
        <div className="-mr-2 flex md:hidden">
            <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            >
            <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>
            </button>
        </div>
        </div>
    </div>
    </nav>

  );
}