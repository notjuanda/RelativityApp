import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obtenerTodosExperimentos,
  eliminarExperimento,
} from '../services/experimentService';

const Home = () => {
  const [experimentos, setExperimentos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperimentos = async () => {
      try {
        const data = await obtenerTodosExperimentos();
        setExperimentos(data);
      } catch (err) {
        setError('Error al obtener los experimentos.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperimentos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await eliminarExperimento(id);
      setExperimentos(experimentos.filter((exp) => exp.id_experimento !== id));
    } catch (err) {
      setError('Error al eliminar el experimento.', err);
    }
  };

  if (loading) return <p>Cargando experimentos...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Lista de Experimentos
      </h1>

      {experimentos.length === 0 ? (
        <p className="text-center">No hay experimentos disponibles. Crea uno nuevo.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {experimentos.map((exp) => (
                <tr
                  key={exp.id_experimento}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{exp.nombre}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center space-x-4">
                      {/* Enlace Ver Detalle */}
                      <Link
                        to={`/experimento/${exp.id_experimento}`}
                        className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200"
                      >
                        Ver Detalle
                      </Link>

                      {/* Botón Eliminar */}
                      <button
                        onClick={() => handleDelete(exp.id_experimento)}
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center mt-8">
        <Link
          to="/experimento/crear"
          className=" text-white font-bold py-2 px-6 rounded" style={{backgroundColor:'#0D92F4'}}
        >
          Crear Nuevo Experimento
        </Link>
      </div>
    </div>
  );
};

export default Home;
