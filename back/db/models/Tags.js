const db = require("../index");
const S = require("sequelize");

class Tags extends S.Model {
  static crearTags(tagsLista) {
    const promises = tagsLista.map((valor) => {
      return Tags.findOrCreate({ where: { valor }, defaults: { valor } });
    });
    return Promise.all(promises);
  }

  static buscarPorValor(valor) {
    Tags.findOne({ where: { valor } });
  }
}

Tags.init(
  {
    valor: {
      type: S.STRING,
      defaultValue: 1,
      unique: true,
    },
  },
  {
    sequelize: db,
    modelName: "tags",
  }
);

module.exports = Tags;
