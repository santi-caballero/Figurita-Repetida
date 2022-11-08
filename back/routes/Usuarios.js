const express = require("express");
const { Usuarios } = require("../db/models/index");
const router = express.Router();
const { generarToken } = require("../config/token");
const { validarAuth, validarRol } = require("../middleware/auth");

router.get("/me", validarAuth, (req, res) => {
  Usuarios.findOne({
    where: {
      email: req.usuario.email,
    },
  })
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

  Usuarios.findOne({ where: { email } }).then((usuario) => {
    if (!usuario) return res.status(401).send("Usuario Inexistente");
    usuario.validarPassword(password).then((isValid) => {
      if (!isValid) return res.status(401).send("Contraseña Incorrecta");
      const payload = {
        id: usuario.id,
        email: usuario.email,
        username: usuario.username,
        rol: usuario.rol,
      };
      const token = generarToken(payload);
      res.cookie("token", token).status(200).send(usuario);
    });
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").status(204).send({});
});

router.put("/editar/:id", (req, res) => {
  const id = req.params.id;
  Usuarios.update(req.body, { where: { id } }).then((result) =>
    res.status(202).send(result)
  );
});

// Admin

router.get("/", validarAuth, validarRol, (req, res) => {
  Usuarios.findAll()
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

// Esto busca un usuario por Id, por ahora no tiene uso.
/*router.get("/buscar/:id", validarAuth, validarRol, (req, res) => {
  const id = req.params.id;
  Usuarios.findOne({ where: { id } })
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});*/

router.delete("/eliminar/:id", validarAuth, validarRol, (req, res) => {
  const id = req.params.id;
  Usuarios.destroy({ where: { id } }).then(() => res.sendStatus(204));
});

router.put("/promover/:id", validarAuth, validarRol, (req, res) => {
  const id = req.params.id;
  Usuarios.update({ rol: "admin" }, { where: { id } })
    .then(() =>
      Usuarios.findOne({ where: { id } }).then((usuario) =>
        res.status(202).send(usuario)
      )
    )
    .catch((err) => console.log(err));
});

router.put("/revocar/:id", validarAuth, validarRol, (req, res) => {
  const id = req.params.id;
  Usuarios.update({ rol: "usuario" }, { where: { id } })
    .then(() =>
      Usuarios.findOne({ where: { id } }).then((usuario) =>
        res.status(202).send(usuario)
      )
    )
    .catch((err) => console.log(err));
});

module.exports = router;
