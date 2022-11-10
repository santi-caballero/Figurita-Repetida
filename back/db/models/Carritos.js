const db = require("../index");
const S = require("sequelize");

class Carritos extends S.Model {
  comprarCarrito(carrito) {
    carrito.update({ comprado: true, fecha: new Date() });
    return Carritos.create({ usuarioId: carrito.usuarioId });
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
      validate: { isDate: true },
    },
  },
  {
    sequelize: db,
    modelName: "carritos",
  }
);

module.exports = Carritos;
