const express = require("express");
const { Usuarios } = require("../db/models/index");
const router = express.Router();

router.get("/", (req, res) => {
  Usuarios.findAll()
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

router.get("/me", (req, res) => {
  Usuarios.findOne({ where: { /*logueado == true*/ } })
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

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Usuarios.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    // user.validarPassword(password).then((isValid) => {
    //   if (!isValid) return res.sendStatus(401);
    console.log("login");
    res.status(200).send(true);

    // const payload = {
    //   email: user.email,
    //   favs: user.favorites,
    // };

    // const token = generateToken(payload);

    // res.cookie("token", token);

    // res.send(payload);
    // });
  });
});
router.post("/logout", (req, res) => {
  // Borrar el token
  //Setear lo que sea a "deslogueado"
  //Setear usuario actual a "null"
  console.log("logout");
});

router.put("/:id", (req, res) => {
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
