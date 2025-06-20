import { getFichadas } from './fichadasServicios.js'
import { getEmployees } from './personalServicios.js'

function getUltimos7DiasHabiles() {
  const fechas = []
  let fecha = new Date()
  while (fechas.length < 7) {
    const dia = fecha.getDay()
    if (dia !== 0 && dia !== 6) {
      fechas.push(fecha.toISOString().split('T')[0])
    }
    fecha.setDate(fecha.getDate() - 1)
  }
  return fechas
}

export async function getRankingAusencias() {
  const [empleadosResp, fichadasResp] = await Promise.all([
    getEmployees(),
    getFichadas()
  ])

  const empleados = empleadosResp.data
  const fichadas = fichadasResp.data
  const diasHabiles = getUltimos7DiasHabiles()

  const fichadasPorEmpleado = {}
  fichadas.forEach(f => {
    const fecha = f.fecha.split('/').reverse().join('-')
    if (!fichadasPorEmpleado[f.empleadoId]) {
      fichadasPorEmpleado[f.empleadoId] = new Set()
    }
    fichadasPorEmpleado[f.empleadoId].add(fecha)
  })

  const ranking = empleados.map(e => {
    const fechasFichadas = fichadasPorEmpleado[e.id] || new Set()
    const ausencias = diasHabiles.filter(dia => !fechasFichadas.has(dia))
    return {
      nombre: `${e.nombre} ${e.apellido}`,
      ausencias: ausencias.length
    }
  })

  return ranking.sort((a, b) => b.ausencias - a.ausencias)
}
