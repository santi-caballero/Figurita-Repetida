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
  // TRAIGO UNA QUERY Y LA GUARDO EN PALABRA
  const palabra = req.params.nombre;
  Productos.findAll({
    where: {
      [Op.or]: [
        { apellido: { [Op.substring]: palabra } },
        { nombre: { [Op.substring]: palabra } },
      ],
    },
  })
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

router.get("/filtro/parametros", (req, res) => {
  const { tipo, rareza, posicion, apellido, nombre } = req.body;
  const arr = [];
  if (tipo) arr.push({ tipo });
  if (rareza) arr.push({ rareza });
  if (posicion) arr.push({ posicion });
  if (apellido) arr.push({ apellido });
  if (nombre) arr.push({ nombre });
  Productos.findAll({
    where: { [Op.and]: arr },
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
