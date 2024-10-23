// src/services/dataService.js
import api from './api';

// Registrar datos de un experimento
export const registrarDatos = async (datos) => {
    try {
        const response = await api.post('/datos', datos);
        return response.data;
    } catch (error) {
        console.error('Error al registrar los datos:', error);
        throw error;
    }
};

// Obtener todos los datos de un experimento
export const obtenerDatosPorExperimento = async (id_experimento) => {
    try {
        const response = await api.get(`/datos/${id_experimento}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener los datos del experimento ${id_experimento}:`, error);
        throw error;
    }
};

// Editar datos de un experimento
export const editarDato = async (id_dato, datos) => {
    try {
        const response = await api.put(`/datos/${id_dato}`, datos);
        return response.data;
    } catch (error) {
        console.error(`Error al editar el dato con ID ${id_dato}:`, error);
        throw error;
    }
};
