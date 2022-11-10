const db = require("../index");
const S = require("sequelize");
const Carritos = require("./Carritos");
const Productos = require("./Productos");

class Pedidos extends S.Model {
  static calcularPrecioTotal(carrito) {
    Pedidos.findAll({
      where: { carritoId: carrito.id },
      include: Productos,
    }).then((pedidos) => {
      const precioTotal = pedidos.reduce((suma, pedido) => {
        return suma + pedido.producto.precio * pedido.cantidad;
      }, 0);
      carrito.update({ preciototal: precioTotal });
    });
  }
  static actualizarPrecio(pedido) {
    Carritos.findByPk(pedido.carritoId)
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
        Pedidos.actualizarPrecio(pedido);
      },
      afterUpdate(pedido) {
        Pedidos.actualizarPrecio(pedido);
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
