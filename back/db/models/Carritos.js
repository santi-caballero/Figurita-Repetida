const db = require("../index");
const S = require("sequelize");
const Pedidos = require("./Pedidos");
const Productos = require("./Productos");

class Carritos extends S.Model {
  crearCarrito(carrito) {
    carrito.update({ comprado: true });
    return Carritos.create({ usuarioId: carrito.usuarioId });
  }

  calcularPrecioTotal(carrito) {
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
}

Carritos.init(
  {
    comprado: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    preciototal: {
      type: S.INTEGER,
      defaultValue: 0,
    },
    metodopago: {
      type: S.STRING,
    },
    fecha: {
      type: S.DATE,
    },
  },
  {
    sequelize: db,
    modelName: "carritos",
  }
);

/*Carritos.prototype.comprar = function (carrito) {
  carrito.update({ comprado: true });
  return Carritos.create({ usuarioId: carrito.usuarioId }).then((res) => res);
};*/

module.exports = Carritos;
