const express = require("express");
const { Productos } = require("../db/models/index");
const router = express.Router();
const { Op } = require("sequelize");
const { validarAuth, validarRol } = require("../middleware/auth");

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
  let palabra = req.params.nombre;
  palabra = palabra.charAt(0).toUpperCase() + palabra.slice(1);

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

// Admin:

router.post("/", validarAuth, validarRol, (req, res) => {
  Productos.create(req.body)
    .then((result) => res.status(201).send(result))
    .catch((err) => console.log(err));
});

router.put("/:id", validarAuth, validarRol, (req, res) => {
  const id = req.params.id;
  Productos.update(req.body, { where: { id } })
    .then((result) => res.status(202).send(result))
    .catch((err) => console.log(err));
});

router.delete("/:id", validarAuth, validarRol, (req, res) => {
  const id = req.params.id;
  Productos.destroy({ where: { id } })
    .then((result) => res.status(204).send(result))
    .catch((err) => console.log(err));
});

module.exports = router;
