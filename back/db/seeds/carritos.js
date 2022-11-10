const { Carritos } = require("../models");

module.exports = function () {
  return Carritos.findByPk(1)
    .then((carrito) => {
      carrito.comprarCarrito(carrito).then((carrito) => {
        setTimeout(() => {
          carrito.comprarCarrito(carrito);
        }, 10);
      });
    })
    .catch((err) => console.log(err));
};
