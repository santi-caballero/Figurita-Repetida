const { Favoritos, Productos } = require("../db/models/index");

class favoritosServices {
  // agregar una figurita a favoritos de un usuario
  static agregarFavoritos(usuarioId, productoId) {
    return Favoritos.create({ usuarioId, productoId });
  }

  // obtener todos los favoritos de un usuario
  static getAll(usuarioId) {
    return Favoritos.findAll({
      where: { usuarioId },
      include: Productos,
    });
  }

  // borrar un favorito de un usuario
  static deleteOne(productoId, usuarioId) {
    Favoritos.destroy({ where: { productoId, usuarioId } });
  }

  // borrar todos los favoritos de un usuario
  static deleteAll(usuarioId) {
    Favoritos.destroy({ where: { usuarioId } });
  }
}

module.exports = favoritosServices;
