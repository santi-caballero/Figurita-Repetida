const db = require("../index");
const S = require("sequelize");

class Carritos extends S.Model {}

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
      allownull: false,
    },
    fecha: {
      type: S.DATE,
      allownull: false,
    },
  },
  {
    sequelize: db,
    modelName: "carritos",
  }
);

module.exports = Carritos;
