const express = require("express");
const { Carritos, Pedidos, Productos } = require("../db/models/index");
const router = express.Router();
const carritosController = require("../controllers/carritosController");

router.get(
  "/:usuarioId",
  carritosController.getCarrito

  // const usuarioId = req.params.usuarioId;
  // Carritos.findOne({
  //   where: { usuarioId, comprado: false },
  //   include: [{ model: Pedidos, include: [Productos] }],
  // })
  //   .then((carrito) => {
  //     carrito.calcularPrecioTotal(carrito);
  //     res.status(200).send(carrito);
  //   })
  //   .catch((err) => console.log(err));
);

router.get("/historial/:usuarioId", (req, res) => {
  const usuarioId = req.params.usuarioId;
  Carritos.findAll({
    where: { usuarioId, comprado: true },
    include: [{ model: Pedidos, include: [Productos] }],
  })
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

router.post("/agregar", (req, res) => {
  const { usuarioId, productoId, cantidad } = req.body;
  Productos.findByPk(productoId).then((producto) => {
    if (producto.stock > cantidad) {
      Carritos.findOne({ where: { usuarioId, comprado: false } }).then(
        (carrito) => {
          Pedidos.create({
            productoId,
            carritoId: carrito.id,
            cantidad: cantidad,
          }).then((result) => res.send(result));
        }
      );
    } else {
      res.status(200).send("NO HAY MAS STOCK");
    }
  });
});

router.delete("/borrarUno/:pedidoId", (req, res) => {
  const pedidoId = req.params.pedidoId;
  Pedidos.destroy({ where: { id: pedidoId } }).then(() => res.sendStatus(204));
});

router.delete("/borrarTodos/:carritoId", (req, res) => {
  const carritoId = req.params.carritoId;
  Pedidos.destroy({ where: { carritoId } }).then(() => res.sendStatus(204));
});

router.put("/comprar/:carritoId", (req, res) => {
  const carritoId = req.params.carritoId;
  Carritos.findOne({ where: { id: carritoId } }).then((carrito) => {
    carrito.comprar(carrito).then((result) => res.send(result));
  });
});

module.exports = router;
