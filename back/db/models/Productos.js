const db = require("../index");
const S = require("sequelize");

class Productos extends S.Model {
  comprobarStock(producto, cantidad) {
    return producto.stock >= cantidad;
  }
  static generarTagsString(producto) {
    return `${producto.tipo.toLowerCase()} ${producto.nombre.toLowerCase()} ${
      producto.apellido ? producto.apellido.toLowerCase() : ""
    } ${producto.posicion ? producto.posicion.toLowerCase() : ""} ${
      producto.pais ? producto.pais.toLowerCase() : ""
    }`;
  }
  static generarTagsArray(producto) {
    let tags = [];
    tags.push(producto.tipo.toLowerCase());
    tags.push(producto.nombre.toLowerCase());
    if (producto.apellido) tags.push(producto.apellido.toLowerCase());
    if (producto.posicion) tags.push(producto.posicion.toLowerCase());
    if (producto.pais) tags.push(producto.pais.toLowerCase());
    return tags;
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
        return `${this.getDataValue("nombre")} ${this.getDataValue(
          "apellido"
        )}`;
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
      type: S.ARRAY(S.INTEGER),
      defaultValue: [],
    },*/
    tags: {
      type: S.STRING,
      get() {
        return this.getDataValue("tags").split(" ");
      },
    },
  },
  {
    sequelize: db,
    modelName: "producto",
    hooks: {
      beforeCreate: (producto) => {
        return (producto.tags = Productos.generarTagsString(producto));
      },
      beforeBulkCreate: (productos) => {
        productos.forEach(
          (producto) => (producto.tags = Productos.generarTagsString(producto))
        );
      },
    },
  }
);

module.exports = Productos;
