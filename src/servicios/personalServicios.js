import axios from "axios"

const API_URL_EMPLEADOS = "https://6848e6ca45f4c0f5ee6f600e.mockapi.io/api/control/empleados"

const getEmployees = () => axios.get(API_URL_EMPLEADOS)
const getEmployeesById = (id) => axios.get(`${API_URL_EMPLEADOS}/${id}`);
const createEmployee = (data) => axios.post(API_URL_EMPLEADOS, data)
const updateEmployee = (id, data) => axios.put(`${API_URL_EMPLEADOS}/${id}`, data) 
const deleteEmployee = (id) => axios.delete(`${API_URL_EMPLEADOS}/${id}`)

export{
    getEmployees, getEmployeesById, createEmployee, updateEmployee, deleteEmployee
}