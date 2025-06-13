import axios from "axios"

const API_URL_HORARIOS = "https://6846de747dbda7ee7ab0a9d7.mockapi.io/api/personal/HorariosTeoricos"

const getHorarios = () => axios.get(API_URL_HORARIOS)
const getHorariosId = (id) => axios.get(`${API_URL_HORARIOS}/${id}`);
const createHorarios = (data) => axios.post(API_URL_HORARIOS, data)
const updateHorarios = (id, data) => axios.put(`${API_URL_HORARIOS}/${id}`, data) 
const deleteHorarios = (id) => axios.delete(`${API_URL_HORARIOS}/${id}`)

export{
    getHorarios, getHorariosId, createHorarios, updateHorarios, deleteHorarios
}