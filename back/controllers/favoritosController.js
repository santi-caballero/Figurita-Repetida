const favoritosServices = require("../services/favoritosServices");

class favoritosController {
  static agregarFavorito(req, res) {
    const { usuarioId, productoId } = req.body;
    favoritosServices
      .agregarFavoritos(usuarioId, productoId)
      .then((result) => res.status(201).send(result[0]))
      .catch((err) => res.status(400).send(err));
  }

  static getAll(req, res) {
    const usuarioId = req.params.id;
    favoritosServices
      .getAll(usuarioId)
      .then((favoritos) => {
        res.status(200).send(favoritos);
      })
      .catch((err) => res.status(400).send(err));
  }

  static deleteOne(req, res) {
    const { usuarioId, productoId } = req.params;
    favoritosServices
      .deleteOne(productoId, usuarioId)
      .then(() => {
        res.status(204).send({});
      })
      .catch((err) => res.status(400).send(err));
  }

  static deleteAll(req, res) {
    const usuarioId = req.params.usuarioId;
    favoritosServices
      .deleteAll(usuarioId)
      .then(() => {
        res.status(204).send([]);
      })
      .catch((err) => res.status(400).send(err));
  }
}

module.exports = favoritosController;
