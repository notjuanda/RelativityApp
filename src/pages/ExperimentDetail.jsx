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
    const [datos, setDatos] = useState([]);
    const [resultados, setResultados] = useState(null);
    const [error, setError] = useState('');
    const [sinDatos, setSinDatos] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const expData = await obtenerExperimentoPorID(id);
            const data = await obtenerDatosPorExperimento(id);
            const resultData = await obtenerResultadosCompletos(id);

            setExperimento(expData);
            setDatos(data.length ? [...data, { x: 0, y: 0 }] : [{ x: 0, y: 0 }]);
            setSinDatos(data.length === 0);
            setResultados(resultData);
        } catch (err) {
            setError('Error al obtener los datos.', err);
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    }, [id]);

    const actualizarResultados = async () => {
        try {
        const resultData = await obtenerResultadosCompletos(id);
        setResultados(resultData);
        } catch {
        setError('Error al actualizar los resultados.');
        }
    };

    const handleDataChange = async (index, field, value) => {
        const updatedData = [...datos];
        updatedData[index][field] = value === '' ? 0 : parseFloat(value);

        try {
        const dato = updatedData[index];
        dato.x = dato.x ?? 0;
        dato.y = dato.y ?? 0;

        if (dato.x === 0 && dato.y === 0 && dato.id_dato && index !== datos.length - 1) {
            await eliminarDato(dato.id_dato);
            updatedData.splice(index, 1);
            setDatos(updatedData);
            setSinDatos(updatedData.length === 1);
            await actualizarResultados();
            return;
        }

        if (index === updatedData.length - 1 && (dato.x !== 0 || dato.y !== 0)) {
            updatedData.push({ x: 0, y: 0 });
            setSinDatos(false);
        }

        setDatos(updatedData);

        if (dato.id_dato) {
            await editarDato(dato.id_dato, { x: dato.x, y: dato.y });
        } else {
            const nuevoDato = await registrarDatos({
            id_experimento: id,
            x: dato.x,
            y: dato.y,
            });
            updatedData[index].id_dato = nuevoDato.id_dato;
            setDatos(updatedData);
        }

        await actualizarResultados();
        } catch {
        setError('Error al actualizar los datos.');
        }
    };

    const interpretarResultados = () => {
        if (!resultados) return '';

        const { r = 0, R2 = 0 } = resultados;
        let interpretacion = '';

        if (r >= 0.8) {
        interpretacion = 'Existe una fuerte correlación positiva entre las variables.';
        } else if (r <= -0.8) {
        interpretacion = 'Existe una fuerte correlación negativa entre las variables.';
        } else if (r >= 0.5) {
        interpretacion = 'Existe una correlación moderada positiva entre las variables.';
        } else if (r <= -0.5) {
        interpretacion = 'Existe una correlación moderada negativa entre las variables.';
        } else {
        interpretacion = 'No hay una correlación significativa entre las variables.';
        }

        interpretacion += ` Además, el coeficiente de determinación (R²) es ${(R2 || 0).toFixed(
        2
        )}, lo que indica que ${((R2 || 0) * 100).toFixed(2)}% de la variabilidad en Y se explica por los cambios en X.`;

        return interpretacion;
    };

    const scatterData = {
        datasets: [
        {
            label: 'Relación X vs Y',
            data: datos
            .filter((d, index) => index !== datos.length - 1 || (d.x !== 0 || d.y !== 0))
            .map((dato) => ({ x: dato.x, y: dato.y })),
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderColor: '#4F46E5',
        },
        ],
    };

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 p-10">
          <div className="max-w-5xl mx-auto shadow-lg rounded-lg bg-white p-8">
              <h1 className="text-4xl font-extrabold text-indigo-700 text-center mb-8">
                  {experimento.nombre || 'Nombre del Experimento'}
              </h1>
              <p className="text-center text-gray-500 italic mb-10">
                  {experimento.descripcion || 'Descripción del experimento'}
              </p>
  
              {sinDatos && (
                  <p className="text-center text-yellow-600 font-semibold mb-6">
                      Este experimento no tiene datos.
                  </p>
              )}
  
              {/* Primera Fila: Tabla de Datos */}
              <div className="mb-10 overflow-hidden rounded-lg shadow-lg border border-gray-300">
                <table className="w-full table-auto">
                    <thead className="bg-indigo-600 text-white rounded-t-lg">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">X</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Y</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold">Sxx</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold">Syy</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {datos.map((dato, index) => (
                            <tr
                                key={index}
                                className="even:bg-indigo-50 hover:bg-indigo-100 transition-all duration-200"
                            >
                                <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        value={dato.x || ''}
                                        onChange={(e) => handleDataChange(index, 'x', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        value={dato.y || ''}
                                        onChange={(e) => handleDataChange(index, 'y', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {dato.x !== null ? Math.pow(dato.x, 2) : ''}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {dato.y !== null ? Math.pow(dato.y, 2) : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>

  
              {/* Segunda Fila: Resultados y Gráfica */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Columna de Resultados */}
                  <div className="bg-indigo-50 p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-indigo-700 mb-6 text-center">Resultados</h3>
                    {resultados ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tarjetas para los resultados */}
                            {[
                                { label: 'Sxx Total', value: resultados.Sxx ?? 'N/A' },
                                { label: 'Syy Total', value: resultados.Syy ?? 'N/A' },
                                { label: 'Sxy', value: resultados.Sxy ?? 'N/A' },
                                { label: 'r', value: (resultados.r ?? 0).toFixed(4) },
                                { label: 'R²', value: (resultados.R2 ?? 0).toFixed(4) },
                                { label: '1 - R²', value: (resultados.unoMenosR2 ?? 0).toFixed(4) },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    <p className="text-sm font-extrabold text-indigo-600 uppercase tracking-wider">
                                        {item.label}
                                    </p>
                                    <p className="mt-2 font-semibold text-gray-800" style={{fontSize:'12px'}}>
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-yellow-600">No hay resultados disponibles.</p>
                    )}
                    <p className="text-indigo-700 mt-6 text-center">{interpretarResultados()}</p>
                  </div>


  
                  {/* Columna de Gráfica */}
                  <div className="flex items-center justify-center" >
                      <Scatter data={scatterData} options={{ responsive: true }}  />
                  </div>

              </div>
          </div>
      </div>
  );
  
};

export default ExperimentDetail;
