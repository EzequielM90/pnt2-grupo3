import axios from "axios";

const API_URL_EMPLEADOS = "https://6848e6ca45f4c0f5ee6f600e.mockapi.io/api/control/empleados";
const API_URL_FICHADAS = "https://6848e6ca45f4c0f5ee6f600e.mockapi.io/api/control/fichadas";

// Función para convertir "dd/mm/yyyy" a "yyyy-mm-dd"
function convertirFechaADateISO(fechaStr) {
  const [dd, mm, yyyy] = fechaStr.split('/');
  return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
}

const getAusenciasPorFecha = async () => {
  const hoy = new Date();
  console.log(hoy)
  const hace7Dias = new Date();
  hace7Dias.setDate(hoy.getDate() - 6); // últimos 7 días incluyendo hoy

  // Traer datos
  const [empleadosResponse, fichadasResponse] = await Promise.all([
    axios.get(API_URL_EMPLEADOS),
    axios.get(API_URL_FICHADAS)
  ]);

  const empleados = empleadosResponse.data;
  const fichadas = fichadasResponse.data;

  // Crear array con fechas en formato ISO (yyyy-mm-dd)
  const fechas = [];
  for (let i = 0; i < 7; i++) {
    const fecha = new Date(hace7Dias);
    fecha.setDate(fecha.getDate() + i);
    fechas.push(fecha.toISOString().split("T")[0]);
  }

  // Contar ausentes por fecha
  const ausenciasPorFecha = fechas.map(fecha => {
    let ausentes = 0;
    empleados.forEach(empleado => {
      // Buscar fichada con fecha convertida a ISO
      const estuvo = fichadas.some(f => 
        f.empleadoId === empleado.id && convertirFechaADateISO(f.fecha) === fecha
      );
      if (!estuvo) ausentes++;
    });
    return ausentes;
  });

  return {
    labels: fechas,
    datasets: [
      {
        label: "Cantidad de ausentes",
        backgroundColor: "#f87979",
        data: ausenciasPorFecha
      }
    ]
  };
};

export { getAusenciasPorFecha };

