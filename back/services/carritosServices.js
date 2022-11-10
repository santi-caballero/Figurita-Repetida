const {
  Carritos,
  Pedidos,
  Productos,
  Usuarios,
} = require("../db/models/index");
const emailConfirmacion = require("../config/mailer");

class carritosServices {
  static getCarrito(id) {
    return Carritos.findOne({
      where: { id },
      include: [{ model: Pedidos, include: [Productos] }],
    });
  }

  static getCarritoDelUsuario(usuarioId) {
    return Carritos.findOne({
      where: { usuarioId, comprado: false },
      include: [{ model: Pedidos, include: [Productos] }],
    });
  }
  static getHistorial(usuarioId) {
    return Carritos.findAll({
      where: { usuarioId, comprado: true },
      include: [{ model: Pedidos, include: [Productos] }],
    });
  }

  static comprobarPedidoExiste(carritoId, productoId) {
    return Pedidos.findOne({
      where: { carritoId, productoId },
    });
  }

  static modificarPedido(pedido, carrito, cantidad) {
    return pedido
      .update({ cantidad: pedido.cantidad + cantidad })
      .then(() => {});
  }

  // crea un pedido de una cantidad de un producto para un carrito
  static crearPedido(productoId, carritoId, cantidad) {
    return Pedidos.create({
      productoId,
      carritoId,
      cantidad,
    });
  }

  static buscarProducto(productoId) {
    return Productos.findByPk(productoId);
  }

  static borrarUnPedido(pedidoId) {
    return Pedidos.findByPk(pedidoId).then((pedido) => {
      Carritos.findByPk(pedido.carritoId).then((carrito) => {
        Pedidos.destroy({ where: { id: pedidoId } });
      });
    });
  }

  static borrarTodosLosPedidos(carritoId) {
    return Pedidos.destroy({ where: { carritoId } }).then(() =>
      Carritos.findByPk(carritoId)
    );
  }

  static cambiarCantidad(pedidoId, cantidad, operacion) {
    return Pedidos.findByPk(pedidoId).then((pedido) => {
      operacion
        ? pedido.update({
            cantidad: pedido.cantidad + cantidad,
          })
        : pedido.cantidad - cantidad
        ? pedido.update({
            cantidad: pedido.cantidad - cantidad,
          })
        : null;
    });
  }

  static comprarCarrito(carrito) {
    carrito.pedidos.forEach((pedido) => {
      Productos.findByPk(pedido.productoId).then((producto) => {
        producto.update({ stock: producto.stock - pedido.cantidad });
      });
    });
    Usuarios.findByPk(carrito.usuarioId).then((usuario) => {
      emailConfirmacion(carrito, usuario);
    });
    return carrito.crearCarrito(carrito);
  }

  static async comprobarStock(carrito) {
    return carrito.pedidos.reduce((acc, pedido) => {
      if (!acc) {
        return false;
      }
      return pedido.producto.stock >= pedido.cantidad;
    }, true);
  }

  static getHistorialComprados() {
    return Carritos.findAll({ where: { comprado: true } });
  }
}

module.exports = carritosServices;
