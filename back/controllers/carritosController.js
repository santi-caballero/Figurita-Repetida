const { Carritos, Pedidos, Productos } = require("../db/models/index");
class carritosController {
  static async getCarrito(req, res) {
    const usuarioId = req.params.usuarioId;
    Carritos.findOne({
      where: { usuarioId, comprado: false },
      include: [{ model: Pedidos, include: [Productos] }],
    })
      .then((carrito) => {
        carrito.calcularPrecioTotal(carrito);
        res.status(200).send(carrito);
      })
      .catch((err) => console.log(err));
  }
}

module.exports = carritosController;
