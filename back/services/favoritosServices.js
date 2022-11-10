const { Favoritos, Usuarios, Productos } = require("../db/models/index");

class favoritosServices {
  static agregarFavoritos(usuarioId, productoId) {
    return Favoritos.create({ usuarioId, productoId });
  }

  static getAll(usuarioId) {
    return Favoritos.findAll({
      where: { usuarioId },
      include: Productos,
    });
  }

  static deleteOne(productoId, usuarioId) {
    Usuarios.findOne({ where: { id: usuarioId } }).then(() => {
      Favoritos.destroy({ where: { productoId } });
    });
  }

  static deleteAll(usuarioId) {
    Favoritos.destroy({ where: { usuarioId } });
  }
}

module.exports = favoritosServices;
