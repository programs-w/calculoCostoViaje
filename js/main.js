import { GastoService } from "./services/gasto.service.js";
console.log("Fichero main.js cargado correctamente");




















// ----------------------------------------------- (! NO TOCAR ) ------------------------------------------------------
 let ultimoId = 18; // Último ID de tu lista inicial
 let segundos = 5;

 setInterval(() => {
   const vehiculos = ["moto", "furgoneta", "camion"];

   // función auxiliar para generar enteros aleatorios
   function randomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
   }

   // función para generar precio con decimales
   function randomPrecio(min, max) {
     return (Math.random() * (max - min) + min).toFixed(2);
   }

   // generar fecha aleatoria entre 2015 y 2020
   const year = randomInt(2015, 2020);
   const month = randomInt(0, 11);      // Enero=0 ... Diciembre=11
   const day = randomInt(1, 28);        // usamos 28 para evitar problemas con febrero
   const fecha = new Date(year, month, day);

   // generamos el gasto
   ultimoId++;
   const gasto = {
     id: ultimoId,
     vehicleType: vehiculos[randomInt(0, vehiculos.length - 1)],
     date: fecha.toISOString(),
     kilometers: randomInt(20, 350),
     precioViaje: parseFloat(randomPrecio(1, 60)) // precio aleatorio entre 1 y 60 €
   };

   // mostramos el gasto
   console.log("Nuevo gasto generado:", gasto);
   alert(`Nuevo gasto generado:\n${JSON.stringify(gasto, null, 2)}`);


   GastoService.procesarGasto(JSON.stringify(gasto));
 }, segundos * 1000);

