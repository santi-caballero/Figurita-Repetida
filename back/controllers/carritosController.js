const { Carritos, Pedidos, Productos } = require("../db/models/index");
const transporter = require("../config/mailer");
class carritosController {
  static async getCarrito(req, res) {
    const usuarioId = req.params.usuarioId;
    Carritos.findOne({
      where: { usuarioId, comprado: false },
      include: [{ model: Pedidos, include: [Productos] }],
    })
      .then((carrito) => {
        res.status(200).send(carrito);
      })
      .catch((err) => console.log(err));
  }

  static async historial(req, res) {
    const usuarioId = req.params.usuarioId;
    Carritos.findAll({
      where: { usuarioId, comprado: true },
      include: [{ model: Pedidos, include: [Productos] }],
    })
      .then((result) => res.status(200).send(result))
      .catch((err) => console.log(err));
  }

  static async agregar(req, res) {
    const { usuarioId, productoId, cantidad } = req.body;
    Productos.findByPk(productoId).then((producto) => {
      if (producto.stock > cantidad) {
        Carritos.findOne({ where: { usuarioId, comprado: false } }).then(
          (carrito) => {
            Pedidos.findOne({
              where: { carritoId: carrito.id, productoId },
            }).then((pedido) => {
              if (pedido) {
                pedido
                  .update({ cantidad: pedido.cantidad + cantidad })

                  .then((result) => {
                    carrito.calcularPrecioTotal(carrito);
                    res.send(result);
                  });
              } else {
                Pedidos.create({
                  productoId,
                  carritoId: carrito.id,
                  cantidad: cantidad,
                }).then((result) => {
                  carrito.calcularPrecioTotal(carrito);
                  res.send(result);
                });
              }
            });
          }
        );
      } else {
        res.status(200).send("NO HAY MAS STOCK");
      }
    });
  }

  static async borrarUno(req, res) {
    const pedidoId = req.params.pedidoId;
    Pedidos.findByPk(pedidoId).then((pedido) => {
      Carritos.findByPk(pedido.carritoId).then((carrito) => {
        Pedidos.destroy({ where: { id: pedidoId } }).then(() => {
          carrito.calcularPrecioTotal(carrito);
          res.sendStatus(204);
        });
      });
    });
  }

  static async borrarTodos(req, res) {
    const carritoId = req.params.carritoId;
    Pedidos.destroy({ where: { carritoId } }).then(() =>
      Carritos.findByPk(carritoId).then((carrito) => {
        carrito.calcularPrecioTotal(carrito);
        res.sendStatus(204);
      })
    );
  }

  static async aumentarCantidad(req, res) {
    const id = req.params.pedidoId;
    const cantidad = parseInt(req.params.cantidad);
    console.log(id, cantidad);
    Pedidos.findByPk(id).then((pedido) => {
      pedido
        .update({
          cantidad: pedido.cantidad + cantidad,
        })
        .then((result) => {
          res.send(result);
        });
    });
  }

  static async disminuirCantidad(req, res) {
    const id = req.params.pedidoId;
    const cantidad = parseInt(req.params.cantidad);
    console.log(id, cantidad);
    Pedidos.findByPk(id).then((pedido) => {
      pedido
        .update({
          cantidad: pedido.cantidad - cantidad,
        })
        .then((result) => {
          res.send(result);
        });
    });
  }

  static async comprar(req, res) {
    const carritoId = req.params.carritoId;
    Carritos.findOne({
      where: { id: carritoId },
      include: [{ model: Pedidos, include: [Productos] }],
    }).then((carrito) => {
      if (carrito.pedidos.length && !carrito.comprado) {
        carrito.comprar(carrito).then((result) => {
          const tabla =
            carrito.pedidos
              .map(
                (pedido) =>
                  `${pedido.producto.nombre} ${pedido.cantidad}  ${
                    pedido.producto.precio * pedido.cantidad
                  }<br>`
              )
              .join(" ") + `el precio total es${carrito.preciototal}`;

          transporter.sendMail({
            from: '"Figurita Repetida" <geronimo.zamora16@gmai.com>', // sender address
            to: "geronimo.zamora16@gmail.com", // list of receivers
            subject: "Compra realizada", // Subject line
            html: `<b> Ya te van a llegar tus figus ${tabla}</b>`, // html body
          });

          res.send(result);
        });
      } else {
        res.send("EL CARRITO ESTA VACIO O YA ESTA COMPRADO");
      }
    });
  }
}

module.exports = carritosController;
