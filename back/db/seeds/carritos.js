const { Carritos } = require("../models");

module.exports = function () {
  return Carritos.findByPk(1)
    .then((carrito) => {
      carrito.crearCarrito(carrito).then((carrito) => {
        setTimeout(() => {
          carrito.crearCarrito(carrito);
        }, 10);
      });
    })
    .catch((err) => console.log(err));
};
