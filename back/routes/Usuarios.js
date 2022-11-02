const express = require("express");
const { Usuarios } = require("../db/models/index");
const router = express.Router();

router.get("/", (req, res) => {
  Usuarios.findAll()
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Usuarios.findOne({ where: { id } })
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

router.post("/registro", (req, res) => {
  Usuarios.create(req.body)
    .then((result) => res.status(201).send(result))
    .catch((err) => console.log(err));
});
router.put("/:id", (req, res) => {
  //   const { rol, direccion, favoritos } = req.body;
  const id = req.params.id;

  Usuarios.update(req.body, { where: { id } }).then((result) =>
    res.status(202).send(result)
  );
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Usuarios.destroy({ where: { id } }).then((result) => res.sendStatus(204));
});

module.exports = router;
