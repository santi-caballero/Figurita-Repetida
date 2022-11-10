const db = require("../index");
const S = require("sequelize");

class Carritos extends S.Model {
  crearCarrito(carrito) {
    carrito.update({ comprado: true });
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
    },
  },
  {
    sequelize: db,
    modelName: "carritos",
  }
);

module.exports = Carritos;
