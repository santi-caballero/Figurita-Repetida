const { Favoritos } = require("../models");

const favoritosFalsos = [
  { productoId: 1, usuarioId: 7 },
  { productoId: 2, usuarioId: 7 },
  { productoId: 3, usuarioId: 7 },
  { productoId: 4, usuarioId: 7 },
];

module.exports = function () {
  return Favoritos.bulkCreate(favoritosFalsos);
};
