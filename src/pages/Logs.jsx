import { useEffect, useState } from 'react';
import { getLogs, getLogsByExperimento } from '../services/logService';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [experimentId, setExperimentId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Obtener todos los logs al montar el componente
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getLogs();
        setLogs(data);
      } catch (err) {
        setError('Error al obtener los logs.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // Manejar búsqueda por ID de experimento
  const handleSearchByExperiment = async () => {
    if (!experimentId) {
      setError('Por favor, ingresa un ID de experimento.');
      return;
    }
    try {
      const data = await getLogsByExperimento(experimentId);
      setLogs(data);
      setError('');
    } catch (err) {
      setError(`Error al obtener los logs para el experimento ${experimentId}.`, err);
    }
  };

  if (loading) return <p>Cargando logs...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Logs</h1>

      <div className="flex mb-4">
        <input
          type="number"
          value={experimentId}
          onChange={(e) => setExperimentId(e.target.value)}
          placeholder="ID del experimento"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleSearchByExperiment}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Buscar
        </button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Acción</th>
            <th className="border border-gray-300 px-4 py-2">Descripción</th>
            <th className="border border-gray-300 px-4 py-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id_log}>
              <td className="border border-gray-300 px-4 py-2">{log.id_log}</td>
              <td className="border border-gray-300 px-4 py-2">{log.accion}</td>
              <td className="border border-gray-300 px-4 py-2">{log.descripcion}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(log.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
