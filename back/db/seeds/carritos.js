const { Carritos } = require("../models");

module.exports = function () {
  return Carritos.findByPk(1)
    .then((carrito) => {
      carrito.comprar(carrito).then((carrito) => {
        carrito.comprar(carrito);
      });
    })
    .catch((err) => console.log(err));
};
