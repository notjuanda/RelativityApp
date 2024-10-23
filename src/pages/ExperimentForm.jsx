
import  { useState } from 'react';
import {  useNavigate } from "react-router-dom";
import axios from 'axios';


const ExperimentForm = () => {

    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');


    const manejarEnvio = async (e) => {
        e.preventDefault();
    
        try {
          axios.post('http://localhost:3000/api/experimentos', {
            nombre,
            descripcion,
          });
          navigate('/')
        } catch (error) {
          
          console.error('Error:', error);
        }
      };

    return ( 
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className=" text-indigo-700 text-2xl font-extrabold mb-6" >
        Crear Experimento
      </h2>
      <form onSubmit={manejarEnvio}>
        {/* Campo Nombre */}
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
            Nombre del Experimento
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        {/* Campo Descripción */}
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-gray-700 font-medium mb-2">
            Descripción
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Botón Enviar */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-300 transition-colors"
        >
          Crear Experimento
        </button>
      </form>

    </div>

     );
}
 
export default ExperimentForm;