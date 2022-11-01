const db = require("../index");
const S = require("sequelize");

class Usuarios extends S.Model {}

Usuarios.init(
  {
    username: {
      type: S.STRING,
      allownull: false,
    },
    nombre: {
      type: S.STRING,
      allownull: false,
    },
    apellido: {
      type: S.STRING,
      allownull: false,
    },
    email: {
      type: S.STRING,
      allownull: false,
      validate: { isEmail: true },
    },
    direccion: {
      type: S.STRING,
      allownull: false,
    },
    password: {
      type: S.STRING,
      allownull: false,
    },
    rol: {
      type: S.STRING,
      allownull: false,
    },
    favoritos: {
      type: S.ARRAY(S.STRING),
      defaultValue: [],
    },
  },
  {
    sequelize: db,
    modelName: "usuario",
  }
);

module.exports = Usuarios;
