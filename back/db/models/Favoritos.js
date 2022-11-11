const db = require("../index");
const S = require("sequelize");

class Favoritos extends S.Model {}

Favoritos.init(
  {},
  {
    sequelize: db,
    modelName: "favoritos",
    timestamps: false,
  }
);

module.exports = Favoritos;
