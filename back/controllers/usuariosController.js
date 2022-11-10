const usuariosServices = require("../services/usuariosServices");
const { generarToken } = require("../config/token");

class usuariosController {
  static me(req, res) {
    const email = req.usuario.email;
    usuariosServices
      .buscarPorEmail(email)
      .then((result) => res.status(200).send(result))
      .catch(() => res.status(400).send(err));
  }

  static registro(req, res) {
    const usuario = req.body;
    usuariosServices
      .registro(usuario)
      .then((result) => res.status(201).send(result))
      .catch((err) => res.status(400).send(err));
  }

  static login(req, res) {
    const { email, password } = req.body;
    usuariosServices
      .buscarPorEmail(email)
      .then((usuario) => {
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
      })
      .catch((err) => res.status(400).send(err));
  }

  static logout(req, res) {
    res.clearCookie("token").status(204).send({});
  }

  static editarUsuario(req, res) {
    const id = req.params.id;
    const usuario = req.body;
    if (req.body.password) {
      res.status(200).send("No podes cambiar la contraseña.");
    } else {
      usuariosServices
        .editarUsuario(usuario, id)
        .then((result) => res.status(202).send(result))
        .catch((err) => res.status(400).send(err));
    }
  }

  //ADMIN
  static adminGetAll(req, res) {
    usuariosServices
      .adminGetAll()
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(400).send(err));
  }

  static adminDeleteOne(req, res) {
    const id = req.params.id;
    if (id === req.usuario.id) {
      res.status(200).send("El usuario no puede eliminarse a si mismo");
    } else {
      usuariosServices
        .adminDeleteOne(id)
        .then(() => res.sendStatus(204))
        .catch((err) => res.status(400).send(err));
    }
  }

  static adminPromoverUsuario(req, res) {
    const id = req.params.id;
    usuariosServices
      .adminAdministrarPermisos(id, "admin")
      .then((result) => res.status(202).send(result[1]))
      .catch((err) => res.status(400).send(err));
  }

  static adminRevocarUsuario(req, res) {
    const id = req.params.id;
    // Comprobar si la id del usuario logueado que está en la cookie es la misma que la que llegó por parametro.
    if (id == req.usuario.id) {
      res.status(200).send("El usuario no puede revocarse a si mismo");
    } else {
      usuariosServices
        .adminAdministrarPermisos(id, "usuario")
        .then((result) => res.status(202).send(result[1]))
        .catch((err) => res.status(400).send(err));
    }
  }
}

module.exports = usuariosController;
