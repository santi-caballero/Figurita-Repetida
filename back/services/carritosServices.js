const {
  Carritos,
  Pedidos,
  Productos,
  Usuarios,
} = require("../db/models/index");
const emailConfirmacion = require("../config/mailer");

class carritosServices {
  // buscar un carrito por id
  static getCarrito(id) {
    return Carritos.findOne({
      where: { id },
      include: [{ model: Pedidos, include: [Productos] }],
    });
  }
  // buscar carritos por usuario.
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

  // buscar todos los carritos comprados.
  static getHistorialComprados() {
    return Carritos.findAll({ where: { comprado: true } });
  }

  // comprobar si un pedido ya existe en un carrito
  static comprobarPedidoExiste(carritoId, productoId) {
    return Pedidos.findOne({
      where: { carritoId, productoId },
    });
  }

  // sumar a un pedido ya existente la nueva cantidad
  static modificarPedido(pedido, cantidad) {
    return pedido
      .update({ cantidad: pedido.cantidad + cantidad })
      .then((pedido) => Pedidos.findByPk(pedido.id, { include: Productos }));
  }

  // crear un pedido de una cantidad de un producto para un carrito
  static crearPedido(productoId, carritoId, cantidad) {
    return Pedidos.create({
      productoId,
      carritoId,
      cantidad,
    }).then((pedido) => Pedidos.findByPk(pedido.id, { include: Productos }));
  }

  // borrar un pedido
  static borrarUnPedido(id) {
    return Pedidos.destroy({ where: { id } });
  }

  // borrar todos los pedidos de un carrito.
  static borrarTodosLosPedidos(carritoId) {
    return Pedidos.destroy({ where: { carritoId } }).then(() =>
      Carritos.findByPk(carritoId)
    );
  }

  // cambiar la cantidad de productos de un pedido. Operacion en true suma y en false resta.
  static cambiarCantidad(pedidoId, cantidad, operacion) {
    return Pedidos.findByPk(pedidoId).then((pedido) => {
      operacion
        ? pedido.update({
            cantidad: pedido.cantidad + parseInt(cantidad),
          })
        : pedido.cantidad - cantidad > 1 //comprobación de que la cantidad resultante de la resta no sea 0.
        ? pedido.update({
            cantidad: pedido.cantidad - parseInt(cantidad),
          })
        : null;
    });
  }

  // comprar un carrito
  static comprarCarrito(carrito) {
    // disminuir el stock de todos los productos por sus pedidos.
    carrito.pedidos.forEach((pedido) => {
      Productos.findByPk(pedido.productoId).then((producto) => {
        producto.update({ stock: producto.stock - pedido.cantidad });
      });
    });
    // mandar el email de confirmación al usuario.
    Usuarios.findByPk(carrito.usuarioId).then((usuario) => {
      emailConfirmacion(carrito, usuario);
    });
    // llamar al metodo para cambiar el estado del carrito y crear uno nuevo para el usuario.
    return carrito.comprarCarrito(carrito);
  }

  // comprobar si hay stock de todos los pedidos de un carrito.
  static async comprobarStock(carrito) {
    return carrito.pedidos.reduce((acc, pedido) => {
      if (!acc) {
        return false;
      }
      return pedido.producto.stock >= pedido.cantidad;
    }, true);
  }
}

module.exports = carritosServices;
