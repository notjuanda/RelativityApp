import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { obtenerExperimentoPorID } from '../services/experimentService';
import { obtenerDatosPorExperimento } from '../services/dataService';

ChartJS.register(...registerables);

const ExperimentDetail = () => {
  const { id } = useParams();

  const [experimento, setExperimento] = useState({});
  const [datos, setDatos] = useState([{ x: '', y: '' }]); // Una fila vacía al inicio
  const [resultados, setResultados] = useState({
    Sxx: 0,
    Syy: 0,
    Sxy: 0,
    r: 0,
    R2: 0,
    unoMenosR2: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expData = await obtenerExperimentoPorID(id);
        const data = await obtenerDatosPorExperimento(id);
        setExperimento(expData);
        setDatos([...data, { x: '', y: '' }]); // Agregar una fila vacía
        calcularResultados(data);
      } catch (err) {
        setError('Error al obtener los datos.');
      }
    };
    fetchData();
  }, [id]);

  const handleDataChange = (index, field, value) => {
    const updatedData = [...datos];
    updatedData[index][field] = value === '' ? '' : parseFloat(value);

    // Eliminar la fila si ambas celdas están vacías y no es la única fila
    if (
      updatedData[index].x === '' &&
      updatedData[index].y === '' &&
      updatedData.length > 1
    ) {
      updatedData.splice(index, 1);
    }

    // Si estamos editando la última fila y se llena, agregar una nueva fila vacía
    if (
      index === updatedData.length - 1 &&
      field === 'y' &&
      value !== '' &&
      updatedData[index].x !== ''
    ) {
      updatedData.push({ x: '', y: '' });
    }

    setDatos(updatedData);
    calcularResultados(updatedData);
  };

  const calcularResultados = (data) => {
    const filteredData = data.filter(({ x, y }) => x !== '' && y !== ''); // Ignorar filas vacías
    const Sxx = filteredData.reduce((acc, { x }) => acc + Math.pow(x, 2), 0);
    const Syy = filteredData.reduce((acc, { y }) => acc + Math.pow(y, 2), 0);
    const Sxy = filteredData.reduce((acc, { x, y }) => acc + x * y, 0);

    const r = Sxy / Math.sqrt(Sxx * Syy);
    const R2 = r * r;
    const unoMenosR2 = 1 - R2;

    setResultados({ Sxx, Syy, Sxy, r, R2, unoMenosR2 });
  };

  const scatterData = {
    datasets: [
      {
        label: 'Relación X vs Y',
        data: datos
          .filter((d) => d.x !== '' && d.y !== '')
          .map((dato) => ({ x: dato.x, y: dato.y })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Detalle del Experimento</h1>

      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">X</th>
            <th className="border px-4 py-2">Y</th>
            <th className="border px-4 py-2">Sxx</th>
            <th className="border px-4 py-2">Syy</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={dato.x || ''}
                  onChange={(e) =>
                    handleDataChange(index, 'x', e.target.value)
                  }
                  className="w-full text-center border-none"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={dato.y || ''}
                  onChange={(e) =>
                    handleDataChange(index, 'y', e.target.value)
                  }
                  className="w-full text-center border-none"
                />
              </td>
              <td className="border px-4 py-2 text-center">
                {dato.x !== '' ? Math.pow(dato.x, 2) : ''}
              </td>
              <td className="border px-4 py-2 text-center">
                {dato.y !== '' ? Math.pow(dato.y, 2) : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-white p-4 rounded-md shadow-md mt-6">
        <h3 className="text-lg font-bold mb-2">Resultados</h3>
        <p>Sxx Total: {resultados.Sxx}</p>
        <p>Syy Total: {resultados.Syy}</p>
        <p>Sxy: {resultados.Sxy}</p>
        <p>r: {resultados.r.toFixed(4)}</p>
        <p>R²: {resultados.R2.toFixed(4)}</p>
        <p>1 - R²: {resultados.unoMenosR2.toFixed(4)}</p>
      </div>

      <h2 className="text-2xl font-bold mt-6">Gráfico de Dispersión</h2>
      <div className="mt-4">
        <Scatter data={scatterData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default ExperimentDetail;
