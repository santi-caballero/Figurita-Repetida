const db = require("../index");
const S = require("sequelize");
const Carritos = require("./Carritos");

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
    },
    password: {
      type: S.STRING,
      allownull: false,
    },
    rol: {
      type: S.STRING,
    },
    favoritos: {
      type: S.ARRAY(S.STRING),
      defaultValue: [],
    },
  },
  {
    sequelize: db,
    modelName: "usuario",
    hooks: {
      afterCreate: (usuario) => {
        Carritos.create({ usuarioId: usuario.id });
      },
      afterBulkCreate: (res) => {
        res.forEach((usuario) => {
          Carritos.create({ usuarioId: usuario.id });
        });
      },
    },
  }
);

module.exports = Usuarios;
