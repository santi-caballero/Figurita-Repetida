const express = require("express");
const { Productos } = require("../db/models/index");
const router = express.Router();
const { Op } = require("sequelize");

router.get("/", (req, res) => {
  Productos.findAll()
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Productos.findOne({ where: { id } })
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

router.get("/buscar/:nombre", (req, res) => {
  Productos.findAll({
    where: {
      [Op.or]: [
        { apellido: { [Op.substring]: req.params.nombre } },
        { nombre: { [Op.substring]: req.params.nombre } },
      ],
    },
  })
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

router.get("/filtrar/categorias", (req, res) => {
  const { tipo, rareza, posicion, pais } = req.body;
  const busqueda = [];
  if (tipo) busqueda.push({ tipo });
  if (rareza) busqueda.push({ rareza });
  if (posicion) busqueda.push({ posicion });
  if (pais) busqueda.push({ pais });
  Productos.findAll({
    where: { [Op.and]: busqueda },
  })
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  Productos.create(req.body)
    .then((result) => res.status(201).send(result))
    .catch((err) => console.log(err));
});
router.put("/:id", (req, res) => {
  const id = req.params.id;
  Productos.update(req.body, { where: { id } }).then((result) =>
    res.status(202).send(result)
  );
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Productos.destroy({ where: { id } }).then((result) =>
    res.status(204).send(result)
  );
});

module.exports = router;
