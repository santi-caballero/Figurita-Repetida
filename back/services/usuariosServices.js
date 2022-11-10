const { Usuarios } = require("../db/models/index");
class usuariosServices {
  static getMe(email) {
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

  static adminDeleteOne(id) {
    return Usuarios.destroy({ where: { id } });
  }

  static adminAdministrarPermisos(id, rol) {
    return Usuarios.update(
      { rol },
      { where: { id }, returning: true, plain: true }
    );
  }
}

module.exports = usuariosServices;
