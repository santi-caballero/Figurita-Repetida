const usuariosSeed = require("./usuarios");
const productosSeed = require("./productos");
const pedidosSeed = require("./pedidos");
const carritosSeed = require("./carritos");

module.exports = function () {
  return usuariosSeed()
    .then(() =>
      productosSeed().then(() => pedidosSeed().then(() => carritosSeed()))
    )
    .then(() => {
      console.log("Database Seedeada");
    });
};
