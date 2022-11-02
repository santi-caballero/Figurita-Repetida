const Usuarios = require("./Usuarios");
const Productos = require("./Productos");
const Pedidos = require("./Pedidos");
const Carritos = require("./Carritos");

Carritos.belongsTo(Usuarios, { as: "usuario" }); //Carrito solo puede tpertenecer a un usuario
Usuarios.hasMany(Carritos); //Usuario tiene varios carritos

Pedidos.belongsTo(Productos); //Pedido pertenece al producto
Productos.hasMany(Pedidos);
//Productos.belongsToMany(Pedidos, { through: "ProductoPedido" }); //Cada producto aparece en multiples pedidos

Pedidos.belongsTo(Carritos); // Un pedido solo puede estar en un carrito
Carritos.hasMany(Pedidos); //Carrito contiene muchos pedidos

module.exports = { Usuarios, Productos, Pedidos, Carritos };
