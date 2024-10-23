export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-400 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Carga de Datos */}
            <div>
              <h3 className="text-md font-semibold" style={{ color: '#0D92F4' }}>
                Carga de Datos
              </h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <a
                    href="/cargar-datos"
                    className="hover:underline"
                    style={{ color: '#0D92F4' }}
                  >
                    Subir Archivos CSV / Excel
                  </a>
                </li>
                <li>Formatos Soportados: CSV, XLSX, XLS</li>
              </ul>
            </div>
  
            {/* Información de Contacto */}
            <div>
              <h3 className="text-md font-semibold" style={{ color: '#0D92F4' }}>
                Contacto
              </h3>
              <ul className="mt-2 space-y-1">
                <li>
                  Correo:{" "}
                  <a
                    href="mailto:contacto@relativityapp.com"
                    className="hover:underline"
                    style={{ color: '#0D92F4' }}
                  >
                    contacto@relativityapp.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/usuario/repositorio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: '#0D92F4' }}
                  >
                    Repositorio en GitHub
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Links Útiles */}
            <div>
              <h3 className="text-md font-semibold" style={{ color: '#0D92F4' }}>
                Links Útiles
              </h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <a
                    href="/licencia"
                    className="hover:underline"
                    style={{ color: '#0D92F4' }}
                  >
                    Licencia MIT
                  </a>
                </li>
                <li>
                  <a
                    href="/terminos"
                    className="hover:underline"
                    style={{ color: '#0D92F4' }}
                  >
                    Términos y Condiciones
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          {/* Créditos */}
          <div className="mt-6 border-t border-gray-700 pt-2 text-center">
            <p>© 2024 RelativityApp. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    );
  }
  