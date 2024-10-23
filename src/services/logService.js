import api from './api';

// Obtener todos los logs
export const getLogs = async () => {
  const response = await api.get('/logs');
  return response.data;
};

// Obtener logs por ID de experimento
export const getLogsByExperimento = async (id_experimento) => {
  const response = await api.get(`/logs/${id_experimento}`);
  return response.data;
};
