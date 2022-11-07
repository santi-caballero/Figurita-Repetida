const db = require("../index");
const S = require("sequelize");

class Carritos extends S.Model {
  comprar(carrito) {
    carrito.update({ comprado: true });
    return Carritos.create({ usuarioId: carrito.usuarioId }).then((res) => res);
  }
}

Carritos.init(
  {
    comprado: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    preciototal: {
      type: S.INTEGER,
      defaultValue: 0,
    },
    metodopago: {
      type: S.STRING,
    },
    fecha: {
      type: S.DATE,
    },
  },
  {
    sequelize: db,
    modelName: "carritos",
  }
);

/*Carritos.prototype.comprar = function (carrito) {
  carrito.update({ comprado: true });
  return Carritos.create({ usuarioId: carrito.usuarioId }).then((res) => res);
};*/

module.exports = Carritos;
