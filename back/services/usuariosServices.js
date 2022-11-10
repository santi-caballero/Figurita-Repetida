const { Usuarios } = require("../db/models/index");

class usuariosServices {
  // buscar un usuario por email.
  static buscarPorEmail(email) {
    return Usuarios.findOne({ where: { email } });
  }

  // buscar todos los usuarios
  static adminGetAll() {
    return Usuarios.findAll();
  }

  // crear un usuario
  static registro(body) {
    return Usuarios.create(body);
  }

  // editar un usuario
  static editarUsuario(body, id) {
    return Usuarios.update(body, { where: { id } });
  }

  // destruir un usuario
  static adminDeleteOne(id) {
    return Usuarios.destroy({ where: { id } });
  }

  // Dar o revocar permisos de admin a un usuario
  static adminAdministrarPermisos(id, rol) {
    return Usuarios.update(
      { rol },
      { where: { id }, returning: true, plain: true }
    );
  }
}

module.exports = usuariosServices;
