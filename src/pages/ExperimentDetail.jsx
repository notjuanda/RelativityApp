import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import {
  obtenerExperimentoPorID,
  editarExperimento,
  eliminarExperimento,
} from '../services/experimentService';
import {
  obtenerDatosPorExperimento,
  editarDato,
} from '../services/dataService';
import { obtenerResultadosCompletos } from '../services/resultService';

ChartJS.register(...registerables);

const ExperimentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [experimento, setExperimento] = useState({});
  const [datos, setDatos] = useState([]);
  const [resultados, setResultados] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expData = await obtenerExperimentoPorID(id);
        const data = await obtenerDatosPorExperimento(id);
        const resultData = await obtenerResultadosCompletos(id);
        setExperimento(expData);
        setDatos(data);
        setResultados(resultData);
      } catch (err) {
        setError('Error al obtener los datos.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExperimento({ ...experimento, [name]: value });
  };

  const handleDataChange = (index, field, value) => {
    const updatedData = [...datos];
    updatedData[index][field] = value;
    setDatos(updatedData);
  };

  const handleSaveExperiment = async () => {
    try {
      await editarExperimento(id, experimento);
      setIsEditing(false);
    } catch {
      setError('Error al guardar los cambios.');
    }
  };

  const scatterData = {
    datasets: [
      {
        label: 'Relación X vs Y',
        data: datos.map((dato) => ({ x: dato.x, y: dato.y })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const resultSummary = resultados && (
    <div className="bg-white p-4 rounded-md shadow-md mt-4">
      <h3 className="text-lg font-bold mb-2">Resumen de Resultados</h3>
      <p>Sxx: {resultados.Sxx}</p>
      <p>Syy: {resultados.Syy}</p>
      <p>Sxy: {resultados.Sxy}</p>
      <p>r: {resultados.r}</p>
      <p>R²: {resultados.R2}</p>
      <p>1 - R²: {resultados.unoMenosR2}</p>
    </div>
  );

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Detalle del Experimento</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
      </div>

      {isEditing ? (
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            value={experimento.nombre}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            placeholder="Nombre del Experimento"
          />
          <textarea
            name="descripcion"
            value={experimento.descripcion}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            placeholder="Descripción"
          />
          <button
            onClick={handleSaveExperiment}
            className="col-span-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Guardar Cambios
          </button>
        </div>
      ) : (
        <div>
          <p><strong>Nombre:</strong> {experimento.nombre}</p>
          <p><strong>Descripción:</strong> {experimento.descripcion}</p>
        </div>
      )}

      <h2 className="text-2xl font-bold mt-6">Datos del Experimento</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">X</th>
            <th className="border px-4 py-2">Y</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato, index) => (
            <tr key={dato.id_dato} className="hover:bg-gray-100">
              <td className="border px-4 py-2 text-center">{dato.id_dato}</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={dato.x}
                  onChange={(e) =>
                    handleDataChange(index, 'x', e.target.value)
                  }
                  className="w-full text-center"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={dato.y}
                  onChange={(e) =>
                    handleDataChange(index, 'y', e.target.value)
                  }
                  className="w-full text-center"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {resultSummary}

      <h2 className="text-2xl font-bold mt-6">Gráfico de Dispersión</h2>
      <div className="mt-4">
        <Scatter data={scatterData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default ExperimentDetail;
