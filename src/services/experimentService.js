// src/services/experimentService.js
import api from './api';

// Crear un nuevo experimento
export const crearExperimento = async (datos) => {
    try {
        const response = await api.post('/experimentos', datos);
        return response.data;
    } catch (error) {
        console.error('Error al crear el experimento:', error);
        throw error;
    }
};

// Obtener todos los experimentos
export const obtenerTodosExperimentos = async () => {
    try {
        const response = await api.get('/experimentos');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los experimentos:', error);
        throw error;
    }
};

// Obtener un experimento por ID
export const obtenerExperimentoPorID = async (id) => {
    try {
        const response = await api.get(`/experimentos/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el experimento con ID ${id}:`, error);
        throw error;
    }
};

// Editar un experimento (nombre y descripción)
export const editarExperimento = async (id, datos) => {
    try {
        const response = await api.put(`/experimentos/${id}`, datos);
        return response.data;
    } catch (error) {
        console.error(`Error al editar el experimento con ID ${id}:`, error);
        throw error;
    }
};

// Eliminar un experimento por ID
export const eliminarExperimento = async (id) => {
    try {
        const response = await api.delete(`/experimentos/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el experimento con ID ${id}:`, error);
        throw error;
    }
};
