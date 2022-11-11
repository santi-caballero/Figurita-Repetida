const db = require("../index");
const S = require("sequelize");

class Tags extends S.Model {
  // Crear tags si no exiten ya el base de datos
  static crearTags(tagsLista) {
    const promises = tagsLista.map((valor) => {
      return Tags.findOrCreate({ where: { valor }, defaults: { valor } });
    });
    return Promise.all(promises);
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
    timestamps: false,
  }
);

module.exports = Tags;
