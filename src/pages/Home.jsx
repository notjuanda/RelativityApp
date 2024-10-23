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
    <div className="container mx-auto px-0 py-0">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
        Lista de Experimentos
      </h1>

      {experimentos.length === 0 ? (
        <p className="text-center text-gray-500">No hay experimentos disponibles. Crea uno nuevo.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold tracking-wider">
                <th className="py-4 px-6 text-left">Nombre</th>
                <th className="py-4 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {experimentos.map((exp, index) => (
                <tr
                  key={exp.id_experimento}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } transition-colors`}
                >
                  <td className="py-4 px-6 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 font-bold">
                        {exp.nombre.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{exp.nombre}</p>
                        <p className="mt-2 text-gray-500" style={{fontSize:'10px'}}># {exp.id_experimento}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center w-20">
                    <div className="flex justify-center space-x-4 w-30">
                      <Link
                        to={`/experimento/${exp.id_experimento}`}
                        className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-200 transition"
                      >
                        Ver
                      </Link>
                      <button
                        onClick={() => handleDelete(exp.id_experimento)}
                        className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-200 transition"
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

      <div className="text-center mt-12">
        <Link
          to="/experimento/crear"
          className="bg-indigo-200 text-indigo-500 font-medium  py-4 px-6 rounded-full shadow-md hover:bg-indigo-300 transition"
        >
          Crear Nuevo Experimento
        </Link>
      </div>
    </div>


  );
};

export default Home;
