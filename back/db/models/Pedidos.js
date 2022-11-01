const db = require("../index");
const S = require("sequelize");

class Pedidos extends S.Model {}

Pedidos.init(
  {
    cantidad: {
      type: S.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize: db,
    modelName: "pedidos",
  }
);

module.exports = Pedidos;
