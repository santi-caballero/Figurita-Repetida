const favoritosServices = require("../services/favoritosServices");
class favoritosController {
  static agregarFavorito(req, res) {
    const usuarioId = req.body.usuarioId;
    const productoId = req.body.productoId;
    favoritosServices
      .agregarFavoritos(usuarioId, productoId)
      .then((result) => res.status(201).send(result))
      .catch((err) => console.log(err));
  }

  static getAll(req, res) {
    const usuarioId = req.params.id;
    favoritosServices
      .getAll(usuarioId)
      .then((favorite) => {
        res.status(200).send(favorite);
      })
      .catch((error) => console.log(error));
  }

  static deleteOne(req, res) {
    const productoId = req.params.productoId;
    const usuarioId = req.params.usuarioId;
    favoritosServices.deleteOne(productoId, usuarioId).then(() => {
      res.sendStatus(204);
    });
  }

  static deleteAll(req, res) {
    const usuarioId = req.params.usuarioId;
    favoritosServices.deleteAll(usuarioId).then(() => {
      res.sendStatus(204);
    });
  }
}

module.exports = favoritosController;
