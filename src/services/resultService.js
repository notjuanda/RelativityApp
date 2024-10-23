// src/services/resultService.js
import api from './api';

// Obtener todos los resultados de un experimento
export const obtenerResultadosCompletos = async (id_experimento) => {
    try {
        const response = await api.get(`/resultados/${id_experimento}/todos`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener los resultados del experimento ${id_experimento}:`, error);
        throw error;
    }
};

// Obtener Sxx de un experimento
export const obtenerSxx = async (id_experimento) => {
    try {
        const response = await api.get(`/resultados/${id_experimento}/sxx`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener Sxx del experimento ${id_experimento}:`, error);
        throw error;
    }
};

// Obtener Syy de un experimento
export const obtenerSyy = async (id_experimento) => {
    try {
        const response = await api.get(`/resultados/${id_experimento}/syy`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener Syy del experimento ${id_experimento}:`, error);
        throw error;
    }
};

// Obtener Sxy de un experimento
export const obtenerSxy = async (id_experimento) => {
    try {
        const response = await api.get(`/resultados/${id_experimento}/sxy`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener Sxy del experimento ${id_experimento}:`, error);
        throw error;
    }
};

// Obtener coeficiente de correlación (r)
export const obtenerR = async (id_experimento) => {
    try {
        const response = await api.get(`/resultados/${id_experimento}/r`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener r del experimento ${id_experimento}:`, error);
        throw error;
    }
};

// Obtener coeficiente de determinación (R²)
export const obtenerR2 = async (id_experimento) => {
    try {
        const response = await api.get(`/resultados/${id_experimento}/r2`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener R² del experimento ${id_experimento}:`, error);
        throw error;
    }
};

// Obtener el valor de 1 - R²
export const obtenerUnoMenosR2 = async (id_experimento) => {
    try {
        const response = await api.get(`/resultados/${id_experimento}/uno-menos-r2`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener 1 - R² del experimento ${id_experimento}:`, error);
        throw error;
    }
};
