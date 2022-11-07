const express = require("express");
const router = express.Router();
const { Favoritos, Usuarios, Productos } = require("../db/models/index");


//crear un favorito, deberia llegar como req.body usuarioId y productoId
router.post("/", (req, res) => {
  Favoritos.create(req.body)
    .then((result) => res.status(201).send(result))
    .catch((err) => console.log(err));
});

//todos los favoritos de un usuario
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  Favoritos.findAll({ where: { usuarioId: userId } })
    .then((favorite) => {
      res.status(200).send(favorite);
    })
    .catch((error) => console.log(error));
});

//borrar un favorito
router.delete("/borraruno/:usuarioId/:productoId", (req, res) => {
    const productoId = req.params.productoId;
    const usuarioId = req.params.usuarioId;
    Usuarios.findOne({ where: { id: usuarioId } }).then(() => {
      Favoritos.destroy({ where: { productoId } }).then(() => {
        res.sendStatus(204);
      });
    });
  });
  
//borrar todos los favoritos
router.delete("/borrarfavoritos/:usuarioId", (req, res) => {
  const usuarioId = req.params.usuarioId;
    Favoritos.destroy({ where : {usuarioId} }).then(() => {
      res.sendStatus(204);
    });
});

module.exports = router;
