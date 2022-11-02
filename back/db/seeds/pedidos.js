const { Pedidos } = require("../models");

const pedidosFalsos = [
  { productoId: 1, cantidad: 2, carritoId: 1 },
  { productoId: 2, cantidad: 4, carritoId: 1 },
  { productoId: 4, cantidad: 1, carritoId: 1 },
  { productoId: 1, cantidad: 1, carritoId: 2 },
  { productoId: 5, cantidad: 1, carritoId: 2 },
  { productoId: 1, cantidad: 1, carritoId: 5 },
];
module.exports = function () {
  return Pedidos.bulkCreate(pedidosFalsos);
};
