export async function getResumenHoy() {
  const fechaHoy = formatearFechaActual() // ahora en "dd/mm/yyyy"

  const resFichadas = await fetch('https://6848e6ca45f4c0f5ee6f600e.mockapi.io/api/control/fichadas')
  const todasFichadas = await resFichadas.json()
  const fichadasHoy = todasFichadas.filter(f => f.fecha === fechaHoy)

  const resEmpleados = await fetch('https://6848e6ca45f4c0f5ee6f600e.mockapi.io/api/control/empleados')
  const empleados = await resEmpleados.json()

  const idsFichados = new Set(fichadasHoy.map(f => f.empleadoId))
  const totalEmpleados = empleados.length

  return {
    ausentes: totalEmpleados - idsFichados.size,
    presentes: idsFichados.size
  }
}

function formatearFechaActual() {
  const hoy = new Date()
  const dia = String(hoy.getDate()).padStart(2, '0')
  const mes = String(hoy.getMonth() + 1).padStart(2, '0')
  const anio = hoy.getFullYear()
  return `${dia}/${mes}/${anio}`
}
