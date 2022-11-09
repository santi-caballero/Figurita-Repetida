const db = require("../index");
const S = require("sequelize");

class Productos extends S.Model {
  static generarTagsString(producto) {
    // Por fuerza bruta, genera un string con todas las propiedades disponibles, las que no tienen valor, no devulven nada.
    return `${producto.tipo.toLowerCase()} ${producto.nombre.toLowerCase()} ${
      producto.apellido ? producto.apellido.toLowerCase() : ""
    } ${producto.posicion ? producto.posicion.toLowerCase() : ""} ${
      producto.pais ? producto.pais.toLowerCase() : ""
    }`;
  }
  /*static generarTagsArray(producto) {
    let tags = [];
    tags.push(producto.tipo.toLowerCase());
    tags.push(producto.nombre.toLowerCase());
    if (producto.apellido) tags.push(producto.apellido.toLowerCase());
    if (producto.posicion) tags.push(producto.posicion.toLowerCase());
    if (producto.pais) tags.push(producto.pais.toLowerCase());
    return tags;
  }*/
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
    tags: {
      type: S.STRING,
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
