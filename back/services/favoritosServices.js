const { Favoritos, Productos } = require("../db/models/index");

class favoritosServices {
  // agregar una figurita a favoritos de un usuario
  static agregarFavoritos(usuarioId, productoId) {
    return Favoritos.findOrCreate({
      where: { usuarioId, productoId },
      defaults: { usuarioId, productoId },
    });
  }
  //{ where: { valor }, defaults: { valor } }

  // obtener todos los favoritos de un usuario
  static getAll(usuarioId) {
    return Favoritos.findAll({
      where: { usuarioId },
      include: Productos,
    });
  }

  // borrar un favorito de un usuario
  static deleteOne(productoId, usuarioId) {
    return Favoritos.destroy({ where: { productoId, usuarioId } });
  }

  // borrar todos los favoritos de un usuario
  static deleteAll(usuarioId) {
    return Favoritos.destroy({ where: { usuarioId } });
  }
}

module.exports = favoritosServices;
