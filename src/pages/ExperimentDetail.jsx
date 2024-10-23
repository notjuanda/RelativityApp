import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { obtenerExperimentoPorID } from '../services/experimentService';
import { 
  obtenerDatosPorExperimento, 
  editarDato, 
  registrarDatos, 
  eliminarDato 
} from '../services/dataService';
import { obtenerResultadosCompletos } from '../services/resultService';

ChartJS.register(...registerables);

const ExperimentDetail = () => {
  const { id } = useParams();

  const [experimento, setExperimento] = useState({});
  const [datos, setDatos] = useState([{ x: '', y: '' }]);
  const [resultados, setResultados] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching experiment, data, and results...');
        const expData = await obtenerExperimentoPorID(id);
        const data = await obtenerDatosPorExperimento(id);
        const resultData = await obtenerResultadosCompletos(id);

        console.log('Experiment data:', expData);
        console.log('Experiment data points:', data);
        console.log('Results:', resultData);

        setExperimento(expData);
        setDatos([...data, { x: '', y: '' }]);
        setResultados(resultData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al obtener los datos.');
      }
    };
    fetchData();
  }, [id]);

  const actualizarResultados = async () => {
    try {
      console.log('Updating results...');
      const resultData = await obtenerResultadosCompletos(id);
      console.log('Updated results:', resultData);
      setResultados(resultData);
    } catch (err) {
      console.error('Error updating results:', err);
      setError('Error al actualizar los resultados.');
    }
  };

  const handleDataChange = async (index, field, value) => {
    console.log(`Handling data change at index ${index}, field ${field}, value ${value}`);
    const updatedData = [...datos];
    updatedData[index][field] = value === '' ? null : parseFloat(value);

    try {
      const dato = updatedData[index];

      if (dato.x === null && dato.y === null && dato.id_dato) {
        console.log('Deleting data with ID:', dato.id_dato);
        await eliminarDato(dato.id_dato);
        updatedData.splice(index, 1);
        setDatos(updatedData);
        await actualizarResultados();
        return;
      }

      if (index === updatedData.length - 1 && dato.x !== null && dato.y !== null) {
        console.log('Adding new empty row...');
        updatedData.push({ x: '', y: '' });
      }

      setDatos(updatedData);

      if (dato.id_dato && dato.x !== null && dato.y !== null) {
        console.log('Editing data with ID:', dato.id_dato, 'Data:', { x: dato.x, y: dato.y });
        await editarDato(dato.id_dato, { x: dato.x, y: dato.y });
      } else if (dato.x !== null && dato.y !== null) {
        console.log('Registering new data:', { id_experimento: id, x: dato.x, y: dato.y });
        const nuevoDato = await registrarDatos({ id_experimento: id, x: dato.x, y: dato.y });
        console.log('New data registered with ID:', nuevoDato.id_dato);
        updatedData[index].id_dato = nuevoDato.id_dato;
        setDatos(updatedData);
      }
      await actualizarResultados();
    } catch (err) {
      console.error('Error updating data:', err);
      setError('Error al actualizar los datos.');
    }
  };

  const scatterData = {
    datasets: [
      {
        label: 'Relación X vs Y',
        data: datos
          .filter((d) => d.x !== null && d.y !== null)
          .map((dato) => ({ x: dato.x, y: dato.y })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8 h-screen">
      <div className="overflow-auto max-h-full">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-600 drop-shadow-md">
          {experimento.nombre || 'Nombre del Experimento'}
        </h1>
        <p className="text-gray-600 italic text-center mb-8">
          {experimento.descripcion || 'Descripción del experimento'}
        </p>

        <table className="table-auto w-full border-collapse border border-gray-300 text-sm rounded-md shadow-md">
          <thead>
            <tr className="bg-indigo-100 text-indigo-900">
              <th className="border px-3 py-2 text-center">X</th>
              <th className="border px-3 py-2 text-center">Y</th>
              <th className="border px-3 py-2 text-center">Sxx</th>
              <th className="border px-3 py-2 text-center">Syy</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato, index) => (
              <tr key={index} className="hover:bg-indigo-50">
                <td className="border px-3 py-2">
                  <input
                    type="number"
                    value={dato.x || ''}
                    onChange={(e) => handleDataChange(index, 'x', e.target.value)}
                    className="w-full text-center border-none focus:outline-none"
                  />
                </td>
                <td className="border px-3 py-2">
                  <input
                    type="number"
                    value={dato.y || ''}
                    onChange={(e) => handleDataChange(index, 'y', e.target.value)}
                    className="w-full text-center border-none focus:outline-none"
                  />
                </td>
                <td className="border px-3 py-2 text-center">
                  {dato.x !== null ? Math.pow(dato.x, 2) : ''}
                </td>
                <td className="border px-3 py-2 text-center">
                  {dato.y !== null ? Math.pow(dato.y, 2) : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {resultados && (
          <div className="bg-indigo-100 p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-lg font-bold mb-4 text-indigo-700">Resultados</h3>
            <ul className="text-indigo-600">
              <li>Sxx Total: {resultados.Sxx}</li>
              <li>Syy Total: {resultados.Syy}</li>
              <li>Sxy: {resultados.Sxy}</li>
              <li>r: {resultados.r.toFixed(4)}</li>
              <li>R²: {resultados.R2.toFixed(4)}</li>
              <li>1 - R²: {resultados.unoMenosR2.toFixed(4)}</li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center">
        <Scatter data={scatterData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default ExperimentDetail;
