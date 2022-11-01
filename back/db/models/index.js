const Usuarios = require("./Usuarios");
const Productos = require("./Productos");
const Pedidos = require("./Pedidos");
const Carritos = require("./Carritos");

Carritos.belongsTo(Usuarios, { as: "usuario" });
Usuarios.hasMany(Carritos);

Pedidos.hasMany(Productos);
Productos.belongsToMany(Pedidos, { through: "ProductoPedido" });

Carritos.hasMany(Productos);
Pedidos.belongsTo(Carritos);

//Usuario tiene un carrito
//Carrito solo puede tpertenecer a un usuario

//Pedidos tiene un productos
//Cada figurita aparece en multiples pedidos

//Carrito contiene muchos pedidos
// Un pedido solo puede estar en un carrito

module.exports = { Usuarios, Productos, Pedidos, Carritos };
