const db = require("../index");
const S = require("sequelize");
const Carritos = require("./Carritos");
const Productos = require("./Productos");

class Pedidos extends S.Model {
  // Calcular el precio todal de un carrito
  static calcularPrecioTotal(carrito) {
    const precioTotal = carrito.pedidos.reduce((suma, pedido) => {
      return suma + pedido.producto.precio * pedido.cantidad;
    }, 0);
    carrito.update({ preciototal: precioTotal });
  }

  // Tomar un pedido y mandar a calcular el precio total del carrito al que pertenece.
  static actualizarPrecio(pedido) {
    Carritos.findByPk(pedido.carritoId, {
      include: [{ model: Pedidos, include: [Productos] }],
    })
      .then((carrito) => Pedidos.calcularPrecioTotal(carrito))
      .catch((err) => console.log(err));
  }
}

Pedidos.init(
  {
    cantidad: {
      type: S.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize: db,
    modelName: "pedidos",
    hooks: {
      afterCreate(pedido) {
        return Pedidos.actualizarPrecio(pedido);
      },
      afterUpdate(pedido) {
        return Pedidos.actualizarPrecio(pedido);
      },
      afterDestroy(pedido) {
        return Pedidos.actualizarPrecio(pedido);
      },
      afterBulkCreate(pedidos) {
        pedidos.forEach((pedido) => {
          Pedidos.actualizarPrecio(pedido);
        });
      },
    },
  }
);

module.exports = Pedidos;
