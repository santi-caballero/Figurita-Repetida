const express = require("express");
const db = require("./db");
const routes = require("./routes/index");
const port = 3001;
const { Usuarios, Productos, Pedidos, Carritos } = require("./db/models");

const app = express();
app.use(express.json());

// app.get("/", (req, res) => {
//   Pedidos.findAll({ include: Productos }).then((result) => res.send(result));
//   //res.send("Bienvenido a Figurita Repetida!");
// });

// app.post("/nusuario", (req, res) => {
//   Usuarios.create(req.body)
//     .then((result) => res.status(201).send(result))
//     .catch((err) => console.log(err));
// });
// app.post("/nproducto", (req, res) => {
//   Productos.create(req.body)
//     .then((result) => res.status(201).send(result))
//     .catch((err) => console.log(err));
// });

// app.post("/npedido", (req, res) => {
//   Pedidos.create(req.body)
//     .then((result) => result.addProducto(1))
//     .then((result) => res.status(201).send(result))
//     .catch((err) => console.log(err));
// });

// app.post("/ncarrito/:id", (req, res) => {
//   Carritos.create(req.body)
//     .then((result) => result.setUsuario(req.params.id))
//     .then((result) => res.status(201).send(result))
//     .catch((err) => console.log(err));
// });

app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
