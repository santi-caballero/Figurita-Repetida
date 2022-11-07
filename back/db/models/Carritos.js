const db = require("../index");
const S = require("sequelize");
const Pedidos = require("./Pedidos");
const Productos = require("./Productos");

class Carritos extends S.Model {
  comprar(carrito) {
    carrito.update({ comprado: true });
    return Carritos.create({ usuarioId: carrito.usuarioId }).then((res) => res);
  }
  calcularPrecioTotal(carrito) {
    Pedidos.findAll({
      where: { carritoId: carrito.id },
      include: Productos,
    }).then((pedidos) => {
      console.log("ENTRE A PEDIDOS");
      carrito.preciototal = pedidos.reduce((suma, pedido) => {
        return suma + pedido.producto.precio;
      }, 0);
    });
    return carrito;
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
