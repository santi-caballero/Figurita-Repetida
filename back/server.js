const express = require("express");
const db = require("./db");
const routes = require("./routes/index");
const port = 3001;
const {
  Carritos,
  Usuarios,
  Productos,
  Pedidos,
  Favoritos,
  Tags,
} = require("./db/models");
const seed = require("./db/seeds");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

db.sync({ force: true })
  .then(() => {
    return seed();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
