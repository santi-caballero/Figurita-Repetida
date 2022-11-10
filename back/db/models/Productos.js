const db = require("../index");
const S = require("sequelize");
const Tags = require("./Tags");

class Productos extends S.Model {
  static generarTagsArray(producto) {
    let tags = [];
    tags.push(producto.tipo.toLowerCase());
    tags.push(producto.nombre.toLowerCase());
    if (producto.apellido) tags.push(producto.apellido.toLowerCase());
    if (producto.posicion) tags.push(producto.posicion.toLowerCase());
    if (producto.pais) tags.push(producto.pais.toLowerCase());
    return tags;
  }

  agregarTags(producto, valores) {
    const buscarTags = valores.map((valor) =>
      Tags.findOne({ where: { valor } })
    );
    Promise.all(buscarTags).then((tags) => {
      const tagsIds = tags.map((tag) => tag.id);
      producto.setTags(tagsIds);
    });
  }
}

Productos.init(
  {
    tipo: {
      type: S.STRING,
      allownull: false,
    },
    nombre: {
      type: S.STRING,
      allownull: false,
    },
    apellido: {
      type: S.STRING,
    },
    nombreCompleto: {
      type: S.VIRTUAL,
      get() {
        return `${this.getDataValue("nombre")} ${
          this.getDataValue("apellido") || ""
        }`;
      },
    },
    posicion: {
      type: S.STRING,
    },
    pais: {
      type: S.STRING,
    },
    stock: {
      type: S.INTEGER,
      defaultValue: 0,
    },
    precio: {
      type: S.INTEGER,
      defaultValue: 0,
    },
    rareza: {
      type: S.INTEGER,
    },
    urlImagen: {
      type: S.STRING,
    },
    /*tags: {
      type: S.STRING,
    },*/
  },
  {
    sequelize: db,
    modelName: "producto",
    hooks: {
      afterCreate: (producto) => {
        const tags = Productos.generarTagsArray(producto);
        Tags.crearTags(tags);
        producto.agregarTags(producto);
      },
      afterBulkCreate: (productos) => {
        const tagsLista = productos.flatMap((producto) => {
          return Productos.generarTagsArray(producto);
        });
        Tags.crearTags(tagsLista).then(() => {
          productos.forEach((producto) => {
            const valores = Productos.generarTagsArray(producto);
            producto.agregarTags(producto, valores);
          });
        });
      },
    },
  }
);

module.exports = Productos;
