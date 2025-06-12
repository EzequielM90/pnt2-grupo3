<script setup>
    import {onMounted, ref} from "vue"
    import {useRouter} from "vue-router"
    import {getEmployees, deleteEmployee} from '../servicios/personalServicios.js'

    const employees = ref([])
    const router = useRouter()

    onMounted(() => {
        obtenerEmpleados()
    })

    const obtenerEmpleados = async () => {
      try{
        const response = await getEmployees()
        employees.value = response.data
      } catch(error){
        console.error("Error en listado de empleados", error)
      }
    } 

    const agregarEmpleado = () => {
        router.push('/createEmployee')
    }

    const editarEmpleado = (id) => {
        router.push(`/editEmployee/${id}`)
    }

    const eliminarEmpleado = async (id) => {
        try {
            await deleteEmployee(id)
            employees.value = employees.value.filter(employee => employee.id !== id)
            alert("Empleado eliminado de la base de datos.")
        } catch(error){
            console.error("Error eliminando empleado: ", error)
        }
    }

</script>

<template>
    <div class ="container mt-4">
      <h1 class="text-center flex-grow-1">Listado de Empleados</h1>
      <table class ="table">
        <thead>
            <tr>
                <th>Nombre y Apellido</th>
                <th>DNI</th>
                <th>Puesto</th>
                <th>Gestión</th>
                <th><button @click="agregarEmpleado()" class="btn btn-secondary">Nuevo Empleado</button></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="employee in employees" :key="employee.id">
                <td>{{ employee.nombre }} {{ " " }} {{ employee.apellido }}</td>
                <td>{{ employee.dni }} </td>
                <td>{{ employee.puesto }} </td>
                <td>
                    <button class="btn btn-secondary me-2" @click="editarEmpleado(employee.id)">Editar</button>
                    <button class="btn btn-dark" @click="eliminarEmpleado(employee.id)">Eliminar</button>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
</template>