import axios from "axios";

const API_URL_EMPLEADOS = "https://6848e6ca45f4c0f5ee6f600e.mockapi.io/api/control/empleados"
const API_URL_FICHADAS = "https://6848e6ca45f4c0f5ee6f600e.mockapi.io/api/control/fichadas";

const getFichadas = () => axios.get(API_URL_FICHADAS);
const getFichadasById = (id) => axios.get(`${API_URL_FICHADAS}/${id}`);
const createFichada = (empleadoId, data) => axios.post(`${API_URL_EMPLEADOS}/${empleadoId}/fichadas`, data);
const updateFichada = (id, data) => axios.put(`${API_URL_FICHADAS}/${id}`, data);
const deleteFichada = (empleadoId, fichadaId) => axios.delete(`${API_URL_EMPLEADOS}/${empleadoId}/fichadas/${fichadaId}`);

export {
    getFichadas, getFichadasById, createFichada, updateFichada, deleteFichada
};
