const db = require("../index");
const S = require("sequelize");

class TagsProductos extends S.Model {}

TagsProductos.init(
  {},
  {
    sequelize: db,
    modelName: "tagsproductos",
    timestamps: false,
  }
);

module.exports = TagsProductos;
