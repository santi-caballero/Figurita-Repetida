const express = require("express");

const router = express.Router();
const carritosController = require("../controllers/carritosController");

router.get("/:usuarioId", carritosController.getCarrito);

router.get("/historial/:usuarioId", carritosController.historial);

router.post("/agregar", carritosController.agregar);

router.put(
  "/aumentarCantidad/:pedidoId/:cantidad",
  carritosController.aumentarCantidad
);
router.put(
  "/disminuirCantidad/:pedidoId/:cantidad",
  carritosController.disminuirCantidad
);

router.delete("/borrarUno/:pedidoId", carritosController.borrarUno);

router.delete("/borrarTodos/:carritoId", carritosController.borrarTodos);

router.put("/comprar/:carritoId", carritosController.comprar);

module.exports = router;
