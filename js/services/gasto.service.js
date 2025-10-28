import { GASTOS_DB } from "../data/gasto.data.js";
import { GastoCombustible } from "../models/gastoCombustible.model.js";
var gastoAnual = {
  2020 : 0,
  2019 : 0,
  2018 : 0,
  2017 : 0,
  2016 : 0,
  2015 : 0
};

function almacenarGastos() {

  GASTOS_DB.forEach(function (registro) {
    const valor = JSON.stringify(registro);
    localStorage.setItem(registro.id, valor);

    const anio = new Date(registro.date).getFullYear();
    gastoAnual[anio] += registro.precioViaje;

  });
  for (let year in gastoAnual) {
    sessionStorage.setItem(year, gastoAnual[year].toString());
  }

}


function procesarGasto(jsonNuevoGasto) {
  const datosGastos = JSON.parse(jsonNuevoGasto);
  const nuevoGasto = new GastoCombustible(
    datosGastos.id,
    datosGastos.vehicleType,
    datosGastos.date,
    datosGastos.kilometers,
    datosGastos.precioViaje
  );

  // Guardar en localStorage
  localStorage.setItem(nuevoGasto.id.toString(), JSON.stringify(nuevoGasto));

  // Actualizar sessionStorage con el nuevo gasto
  const anio = new Date(nuevoGasto.date).getFullYear();
  const gastoActual = parseFloat(sessionStorage.getItem(anio.toString()) || 0);
  const nuevoTotal = gastoActual + nuevoGasto.precioViaje;
  sessionStorage.setItem(anio.toString(), nuevoTotal.toString());
}





export const GastoService = {
    almacenarGastos: almacenarGastos,
    procesarGasto: procesarGasto
};