const express = require("express");

const usersRouter = require("./Usuarios");

const router = express.Router();

router.use("/usuario", usersRouter);

module.exports = router;