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

  static async deleteOne(productoId, usuarioId) {
    Usuarios.findOne({ where: { id: usuarioId } }).then(() => {
      Favoritos.destroy({ where: { productoId } });
    });
  }

  static async deleteAll(usuarioId) {
    Favoritos.destroy({ where: { usuarioId } });
  }
}

module.exports = favoritosServices;
