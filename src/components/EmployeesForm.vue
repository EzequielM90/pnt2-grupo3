<script setup>

    import { onMounted, ref } from "vue"
    import { useRoute, useRouter } from "vue-router"
    import { createEmployee, getEmployeesById, updateEmployee } from '../servicios/personalServicios.js'

    const router = useRouter()
    const route = useRoute()

    const form = ref({
        nombre: '',
        apellido: '',
        dni: 0,
        puesto: '',
    })

    const isEdit = ref(false)

    onMounted(() => {
        if(route.params.id){
            isEdit.value = true
            obtenerEmpleado(route.params.id)
        }
    })

    const obtenerEmpleado = async (id) => {
        try{
            const response = await getEmployeesById(id)
            form.value = response.data
        }catch(error){
            console.error("Error obteniendo empleado: ", error)
        }
    }

    const submitForm = async() => {
        if (!form.value.nombre.trim() || !form.value.apellido.trim() || form.value.dni === 0 || !form.value.puesto.trim()){
            alert("Por favor, completar todos los campos antes de guardar.")
            return
        }

        try{
            if (isEdit.value){
                await updateEmployee(route.params.id, form.value)
                alert("Datos de Empleado Actualizado.")
            } else {
                await createEmployee(form.value)
                alert("Empleado creado.")
            }
            router.push('/employees')
        } catch(error){
            console.error("Error al guardar: ", error)
        }
    }

</script>

<template>
    <div class="container mt-4">
        <h1>Formulario de Empleados</h1>
        <form @submit.prevent="submitForm()">
            <div class="mb-3">
                <label class="form-label" for = "nombre">Nombre</label>
                <input id="nombre" v-model="form.nombre" type="text" class="form-control"/>
            </div>
            <div class="mb-3">
                <label class="form-label" for = "apellido">Apellido</label>
                <input id="apellido" v-model="form.apellido" type="text" class="form-control"/>
            </div>
            <div class="mb-3">
                <label class="form-label" for = "dni">DNI</label>
                <input id="dni" v-model="form.dni" type="number" class="form-control"/>
            </div>
            <div class="mb-3">
                <label class="form-label" for = "puesto">Puesto</label>
                <input id="puesto" v-model="form.puesto" type="text" class="form-control"/>
            </div>
            <button type="submit" class="btn btn-secondary">Guardar</button>
        </form>
    </div>
</template>