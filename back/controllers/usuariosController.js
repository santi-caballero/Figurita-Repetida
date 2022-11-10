const usuariosServices = require("../services/usuariosServices");
const { generarToken } = require("../config/token");

class usuariosController {
  static me(req, res) {
    const email = req.usuario.email;
    usuariosServices
      .me(email)
      .then((result) => res.status(200).send(result))
      .catch((err) => console.log(err));
  }

  static registro(req, res) {
    const body = req.body;
    usuariosServices
      .registro(body)
      .then((result) => res.status(201).send(result))
      .catch((err) => console.log(err));
  }

  static login(req, res) {
    const { email, password } = req.body;
    usuariosServices.login(email).then((usuario) => {
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
  }

  static logout(req, res) {
    res.clearCookie("token").status(204).send({});
  }

  static editarUsuario(req, res) {
    const id = req.params.id;
    const body = req.body;
    if (req.body.password) {
      res.status(200).send("no podes cambiar la contraseña");
    } else {
      usuariosServices
        .editarUsuario(body, id)
        .then((result) => res.status(202).send(result));
    }
  }

  //ADMIN
  static adminGetAll(req, res) {
    usuariosServices
      .adminGetAll()
      .then((result) => res.status(200).send(result))
      .catch((err) => console.log(err));
  }

  static adminDeleteOne(req, res) {
    const id = req.params.id;
    if (id === req.usuario.id) {
      res.status(200).send("El usuario no puede eliminarse a si mismo");
    } else {
      usuariosServices.adminDeleteOne(id).then(() => res.sendStatus(204));
    }
  }
  static adminPromoverUsuario(req, res) {
    const id = req.params.id;
    usuariosServices
      .adminPromoverUsuarioRol(id)
      .then(() =>
        usuariosServices
          .adminPromoverUsuario(id)
          .then((usuario) => res.status(202).send(usuario))
      )
      .catch((err) => console.log(err));
  }

  static adminRevocarUsuario(req, res) {
    const id = req.params.id;
    // Comprobar si la id del usuario logueado que está en la cookie es la misma que la que llegó por parametro. Lleva solo dos iguales porque uno es string y el otro numero y no me fije cual es cual.
    if (id === req.usuario.id) {
      res.status(200).send("El usuario no puede revocarse a si mismo");
    } else {
      usuariosServices
        .adminRevocarUsuarioRol(id)
        .then(() =>
          usuariosServices
            .adminRevocarUsuario(id)
            .then((usuario) => res.status(202).send(usuario))
        )
        .catch((err) => console.log(err));
    }
  }
}

module.exports = usuariosController;
