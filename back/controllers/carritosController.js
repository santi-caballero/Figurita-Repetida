const carritosServices = require("../services/carritosServices");

class carritosController {
  static getCarrito(req, res) {
    const usuarioId = req.params.usuarioId;
    carritosServices
      .getCarritoDelUsuario(usuarioId)
      .then((carrito) => {
        res.status(200).send(carrito);
      })
      .catch((err) => console.log(err));
  }

  static historial(req, res) {
    const usuarioId = req.params.usuarioId;
    carritosServices
      .getHistorial(usuarioId)
      .then((result) => res.status(200).send(result))
      .catch((err) => console.log(err));
  }

  static agregar(req, res) {
    const { usuarioId, productoId, cantidad } = req.body;
    carritosServices.buscarProducto(productoId).then((producto) => {
      if (producto.stock > cantidad) {
        carritosServices.getCarritoDelUsuario(usuarioId).then((carrito) => {
          carritosServices
            .comprobarPedidoExiste(carrito.id, productoId)
            .then((pedido) => {
              if (pedido) {
                carritosServices
                  .modificarPedido(pedido, carrito, parseInt(cantidad))
                  .then((result) => {
                    res.send(result);
                  });
              } else {
                carritosServices
                  .crearPedido(productoId, carrito, cantidad)
                  .then((result) => {
                    res.send(result);
                  });
              }
            });
        });
      } else {
        res.status(200).send("NO HAY MAS STOCK");
      }
    });
  }

  static borrarUno(req, res) {
    const pedidoId = req.params.pedidoId;
    carritosServices.borrarUnPedido(pedidoId).then(() => res.sendStatus(204));
  }

  static borrarTodos(req, res) {
    const carritoId = req.params.carritoId;
    carritosServices
      .borrarTodosLosPedidos(carritoId)
      .then(() => res.sendStatus(204));
  }

  static aumentarCantidad(req, res) {
    const pedidoId = req.params.pedidoId;
    const cantidad = parseInt(req.params.cantidad);
    carritosServices
      .cambiarCantidad(pedidoId, cantidad, true)
      .then((result) => {
        res.send(result);
      });
  }

  static disminuirCantidad(req, res) {
    const pedidoId = req.params.pedidoId;
    const cantidad = parseInt(req.params.cantidad);
    carritosServices
      .cambiarCantidad(pedidoId, cantidad, false)
      .then((result) => {
        res.send(result);
      });
  }

  static comprar(req, res) {
    const carritoId = req.params.carritoId;
    carritosServices.getCarrito(carritoId).then((carrito) => {
      if (carrito.pedidos.length && !carrito.comprado) {
        carritosServices.comprobarStock(carrito).then((bool) => {
          if (bool) {
            carritosServices
              .comprarCarrito(carrito)
              .then((result) => res.send(result));
          } else {
            res.send("NO HAY STOCK SUFICIENTE");
          }
        });
      } else {
        res.send("EL CARRITO ESTA VACIO O YA ESTA COMPRADO");
      }
    });
  }
}

module.exports = carritosController;
