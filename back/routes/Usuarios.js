const express = require("express");
const router = express.Router();
const { validarAuth, validarRol } = require("../middleware/auth");
const usuariosController = require("../controllers/usuariosController");

router.get("/me", validarAuth, usuariosController.me);

//registrar un usuario
router.post("/registro", usuariosController.registro);
//login de usuario
router.post("/login", usuariosController.login);
//logout de usuario
router.post("/logout", usuariosController.logout);
//modificar un usuario
router.put("/editar/:id", usuariosController.editarUsuario);

// Admin:
//obtener todos los usuarios
router.get("/", validarAuth, validarRol, usuariosController.adminGetAll);

//borrar un usuario
router.delete(
  "/eliminar/:id",
  validarAuth,
  validarRol,
  usuariosController.adminDeleteOne
);

//promover un usuario a admin
router.put(
  "/promover/:id",
  validarAuth,
  validarRol,
  usuariosController.adminPromoverUsuario
);

//degradar un usuario
router.put(
  "/revocar/:id",
  validarAuth,
  validarRol,
  usuariosController.adminRevocarUsuario
);

module.exports = router;
