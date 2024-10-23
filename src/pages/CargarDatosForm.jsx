import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CargarDatosForm = () => {
    const navigate = useNavigate();
    const [archivo, setArchivo] = useState(null);
    const [mensaje, setMensaje] = useState('');

    const manejarArchivo = (e) => {
        setArchivo(e.target.files[0]);
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        if (!archivo) {
            setMensaje('Por favor selecciona un archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('archivo', archivo);

        try {
            const response = await axios.post(
                'http://localhost:3000/api/datos/upload',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            navigate('/');
            setMensaje('Archivo subido correctamente.');
            console.log(response.data);
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            setMensaje('Error al subir el archivo.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0D92F4' }}>
                Subir Archivo CSV o Excel
            </h2>
            <form onSubmit={manejarEnvio}>
                <div className="mb-4">
                    <input
                        type="file"
                        onChange={manejarArchivo}
                        accept=".csv, .xlsx"
                        className="w-full px-4 py-2 border rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Subir Archivo
                </button>
            </form>
            {mensaje && <p className="mt-4 text-center text-sm text-gray-700">{mensaje}</p>}
        </div>
    );
};

export default CargarDatosForm;
