const usuariosSeed = require("./usuarios");
const productosSeed = require("./productos");
const pedidosSeed = require("./pedidos");
const carritosSeed = require("./carritos");
const favoritosSeed = require("./favoritos");

module.exports = function () {
  return productosSeed().then(() =>
    usuariosSeed().then(() => {
      setTimeout(() => {
        pedidosSeed().then(() =>
          carritosSeed().then(() =>
            favoritosSeed().then(() => console.log("Database Seedeada"))
          )
        );
      }, 10);
    })
  );
};
