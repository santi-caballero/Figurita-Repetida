const db = require("../index");
const S = require("sequelize");
const Tags = require("./Tags");
const { Op } = require("sequelize");

class Productos extends S.Model {
  // Generar un array de tags a partir de las propiedades que tenga el producto
  static generarTags(producto) {
    let valores = [];
    valores.push(producto.tipo.toLowerCase());
    valores.push(producto.nombre.toLowerCase());
    if (producto.apellido) valores.push(producto.apellido.toLowerCase());
    if (producto.posicion) valores.push(producto.posicion.toLowerCase());
    if (producto.pais) valores.push(producto.pais.toLowerCase());
    return valores;
  }

  agregarTags(producto, valores) {
    // vincular un producto con sus tags
    Tags.findAll({ where: { valor: { [Op.any]: valores } } })
      .then((tags) => {
        const tagsIds = tags.map((tag) => tag.id);
        producto.setTags(tagsIds);
      })
      .catch((err) => console.log(err));
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
      validate: {
        isIn: [["delantero", "central", "portero", "defensor"]],
      },
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
      validate: { isUrl: true },
    },
  },
  {
    sequelize: db,
    modelName: "producto",
    hooks: {
      afterCreate: (producto) => {
        const valores = Productos.generarTags(producto);
        Tags.crearTags(valores);
        producto.agregarTags(producto, valores);
      },
      afterBulkCreate: (productos) => {
        productos.forEach((producto) => {
          const valores = Productos.generarTags(producto);
          Tags.crearTags(valores);
          producto.agregarTags(producto, valores);
        });
        // Si hay problemas con tags repetidos desde el seed, volver a esta version:
        /*
        // Generar un array con todos los tags de todos los productos creados
        const tagsLista = productos.flatMap((producto) => {
          return Productos.generarTags(producto);
        });
        Tags.crearTags(tagsLista).then(() => {
          productos.forEach((producto) => {
            const valores = Productos.generarTags(producto);
            producto.agregarTags(producto, valores);
          });
        });*/
      },
    },
  }
);

module.exports = Productos;
