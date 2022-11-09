const { Productos } = require("../db/models/index");
const { Op } = require("sequelize");
const { validarAuth, validarRol } = require("../middleware/auth");

class productosController {
  static async getProductos(req, res) {
    Productos.findAll()
      .then((result) => res.status(200).send(result))
      .catch((err) => console.log(err));
  }

  static async getId(req, res) {
    const id = req.params.id;
    Productos.findOne({ where: { id } })
      .then((result) => res.status(200).send(result))
      .catch((err) => console.log(err));
  }

  static async buscarPorTags(req, res) {
    const tags = req.params.tags;
    Productos.findAll({
      where: {
        tags: { [Op.substring]: tags },
      },
    })
      .then((result) => res.status(200).send(result))
      .catch((err) => console.log(err));
  }

  static async filtrarPorCategorias(req, res) {
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
  }

  static async adminPost(req, res) {
    Productos.create(req.body)
      .then((result) => res.status(201).send(result))
      .catch((err) => console.log(err));
  }

  static async adminUpdate(req, res) {
    const id = req.params.id;
    Productos.update(req.body, { where: { id } })
      .then((result) => res.status(202).send(result))
      .catch((err) => console.log(err));
  }
  static async adminDelete(req, res) {
    const id = req.params.id;
    Productos.destroy({ where: { id } })
      .then(res.sendStatus(202))
      .catch((err) => console.log(err));
  }
}

module.exports = productosController;
