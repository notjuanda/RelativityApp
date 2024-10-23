import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obtenerTodosExperimentos,
  eliminarExperimento,
} from '../services/experimentService'

const Home = () => {
  const [experimentos, setExperimentos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Obtener experimentos al montar el componente
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

  // Eliminar un experimento
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
    <div>
      <h1 className="text-3xl font-bold mb-6">Lista de Experimentos</h1>
      {experimentos.length === 0 ? (
        <p>No hay experimentos disponibles. Crea uno nuevo.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {experimentos.map((exp) => (
              <tr key={exp.id_experimento}>
                <td className="border border-gray-300 px-4 py-2">
                  {exp.nombre}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-4">
                  <Link
                    to={`/experimento/${exp.id_experimento}`}
                    className="text-blue-500 hover:underline"
                  >
                    Ver Detalle
                  </Link>
                  <button
                    onClick={() => handleDelete(exp.id_experimento)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link
        to="/experimento/crear"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-6 inline-block"
      >
        Crear Nuevo Experimento
      </Link>
    </div>
  );
};

export default Home;
