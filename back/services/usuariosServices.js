const { Usuarios } = require("../db/models/index");
class usuariosServices {
  static async me(email) {
    return Usuarios.findOne({
      where: {
        email: email,
      },
    });
  }
  static async registro(body) {
    return Usuarios.create(body);
  }

  static async login(email) {
    return Usuarios.findOne({ where: { email } });
  }

  static async editarUsuario(body, id) {
    return Usuarios.update(body, { where: { id } });
  }

  static async adminGetAll() {
    return Usuarios.findAll();
  }

  static async adminEditarUsuario(body, id) {
    return Usuarios.update(body, { where: { id } });
  }

  static async adminDeleteOne(id) {
    return Usuarios.destroy({ where: { id } });
  }

  static async adminPromoverUsuarioRol(id) {
    return Usuarios.update({ rol: "admin" }, { where: { id } });
  }

  static async adminPromoverUsuario(id) {
    return Usuarios.findOne({ where: { id } });
  }

  static async adminRevocarUsuarioRol(id) {
    return Usuarios.update({ rol: "usuario" }, { where: { id } });
  }
  static async adminRevocarUsuario(id) {
    return Usuarios.findOne({ where: { id } });
  }
}

module.exports = usuariosServices;
