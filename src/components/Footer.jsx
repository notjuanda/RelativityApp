export default function Footer() {
    return (
      <footer className="bg-indigo-900 text-indigo-100 py-10 border-t border-indigo-800">
        <div className="max-w-5xl mx-auto  px-0 flex items-center justify-between">
          {/* Navegación */}
          <nav className="flex space-x-6 text-indigo-300">
            <a href="/" className="hover:text-white transition">
              Home
            </a>
            <a href="https://github.com/notjuanda/RelativityApp" className="hover:text-white transition">
              Github
            </a>
            <a href="/experimento/crear" className="hover:text-white transition">
              Crear Experimento
            </a>
            <a href="/contact" className="hover:text-white transition">
              Contacto
            </a>
          </nav>
  
          {/* Nombre de la Página */}
          <div className="text-center">
            <h2 className=" font-extrabold tracking-wider" style={{fontSize:'20px'}}>
              RelativityApp
            </h2>
          </div>
  
          {/* Derechos Reservados */}
          <p className="text-indigo-300 text-sm">
            © 2024 RelativityApp. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    );
  }
  