const express = require("express");

const usersRouter = require("./Usuarios");
const productosRouter = require("./Productos");
const carritosRouter = require("./Carritos");

const router = express.Router();

router.use("/usuario", usersRouter);
router.use("/carritos", carritosRouter);
router.use("/productos", productosRouter);

module.exports = router;
