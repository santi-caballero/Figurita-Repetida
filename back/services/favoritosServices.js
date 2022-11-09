const { Favoritos, Usuarios, Productos } = require("../db/models/index");

class favoritosServices {
  static async agregarFavoritos(usuarioId, productoId) {
    return Favoritos.create({ usuarioId, productoId });
  }

  static async getAll(usuarioId) {
    return Favoritos.findAll({
      where: { usuarioId },
      include: Productos,
    });
  }
}

module.exports = favoritosServices;
