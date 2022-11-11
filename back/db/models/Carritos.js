const db = require("../index");
const S = require("sequelize");

class Carritos extends S.Model {
  // Marcar un carrito como comprado, setear su fecha de compre y crear un nuevo carrito para el usuario.
  comprarCarrito(carrito) {
    return carrito
      .update({ comprado: true, fecha: new Date() })
      .then(() => Carritos.create({ usuarioId: carrito.usuarioId }))
      .catch((err) => console.log(err));
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
