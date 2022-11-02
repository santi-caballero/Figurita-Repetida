const { Productos } = require("../models");

const productosFalsos = [
  {
    tipo: "jugador",
    nombre: "Lionel",
    apellido: "Messi",
    posicion: "delantero",
    pais: "argentina",
    stock: 0,
    precio: 2000000000,
    urlImagen:
      "https://www.cronista.com/files/image/479/479650/632c94d41dc87.jpg",
  },
  {
    tipo: "jugador",
    nombre: "Franco",
    apellido: "Armani",
    posicion: "portero",
    pais: "argentina",
    stock: 200,
    precio: 100,
    urlImagen:
      "https://http2.mlstatic.com/D_NQ_NP_827829-MLA51882763339_102022-V.jpg",
  },
  {
    tipo: "jugador",
    nombre: "Cristian",
    apellido: "Romero",
    posicion: "defensor",
    pais: "argentina",
    stock: 10,
    precio: 200,
    urlImagen:
      "https://http2.mlstatic.com/D_NQ_NP_731723-MLA51863587656_102022-V.jpg",
  },
  {
    tipo: "pelota",
    nombre: "Al Rihla",
    stock: 1,
    precio: 2000,
    urlImagen:
      "https://http2.mlstatic.com/D_NQ_NP_720396-MLA51796279764_102022-V.jpg",
  },
  {
    tipo: "estadio",
    nombre: "Lusail Stadium",
    stock: 10,
    precio: 2000,
    urlImagen:
      "https://figuritasqatar.com.ar/wp-content/uploads/lusail-stadium-2.png",
  },
  {
    tipo: "jugador",
    nombre: "Darwin",
    apellido: "Núñez",
    posicion: "delantero",
    pais: "uruguay",
    stock: 999,
    precio: 1,
    urlImagen:
      "https://figuritasqatar.com.ar/wp-content/uploads/darwin-nunez-231x300.png",
  },
];

module.exports = function () {
  return Productos.bulkCreate(productosFalsos);
};
