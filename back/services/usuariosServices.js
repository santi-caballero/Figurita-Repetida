const { Usuarios } = require("../db/models/index");
class usuariosServices {
  static me(email) {
    return Usuarios.findOne({
      where: {
        email: email,
      },
    });
  }
  static registro(body) {
    return Usuarios.create(body);
  }

  static login(email) {
    return Usuarios.findOne({ where: { email } });
  }

  static editarUsuario(body, id) {
    return Usuarios.update(body, { where: { id } });
  }

  static adminGetAll() {
    return Usuarios.findAll();
  }

  static adminEditarUsuario(body, id) {
    return Usuarios.update(body, { where: { id } });
  }

  static adminDeleteOne(id) {
    return Usuarios.destroy({ where: { id } });
  }

  static adminPromoverUsuarioRol(id) {
    return Usuarios.update({ rol: "admin" }, { where: { id } });
  }

  static adminPromoverUsuario(id) {
    return Usuarios.findOne({ where: { id } });
  }

  static adminRevocarUsuarioRol(id) {
    return Usuarios.update({ rol: "usuario" }, { where: { id } });
  }
  static adminRevocarUsuario(id) {
    return Usuarios.findOne({ where: { id } });
  }
}

module.exports = usuariosServices;
