const express = require("express");
const { Carritos } = require("../db/models/index");
const router = express.Router();

router.get("/", (req, res) => {
  Carritos.findAll()
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Carritos.findOne({ where: { id } })
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

// router.post("/:id", (req, res) => {
//   Carritos.create(req.body)
//   .then((res)=> {
//     res.usuarioId = req.params.id
//   })
//     .then((result) => res.status(201).send(result))
//     .catch((err) => console.log(err));
// });

// router.put("/:id", (req, res) => {
//   const id = req.params.id;
//   Carritos.update(req.body, { where: { id } }).then((result) =>
//     res.status(202).send(result)
//   );
// });

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Carritos.destroy({ where: { id } }).then((result) =>
    res.status(204).send(result)
  );
});

module.exports = router;
