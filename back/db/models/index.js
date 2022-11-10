const Usuarios = require("./Usuarios");
const Productos = require("./Productos");
const Pedidos = require("./Pedidos");
const Carritos = require("./Carritos");
const Favoritos = require("./Favoritos");
const Tags = require("./Tags");
const TagsProductos = require("./TagsProductos");

Carritos.belongsTo(Usuarios); //Carrito solo puede pertenecer a un usuario
Usuarios.hasMany(Carritos); //Usuario tiene varios carritos

Pedidos.belongsTo(Productos); //Pedido pertenece al producto
Productos.hasMany(Pedidos); //Un producto puede tener varios pedidos

Pedidos.belongsTo(Carritos); // Un pedido solo puede estar en un carrito
Carritos.hasMany(Pedidos); //Carrito contiene muchos pedidos

Favoritos.belongsTo(Usuarios); //Un favorito solo puede pertenecer a un usuario
Usuarios.hasMany(Favoritos);

Favoritos.belongsTo(Productos);
Productos.hasMany(Favoritos);

// Las seis relaciones de abajo configuran lo que la documentacion de sequelize llama "Super Many-to-Many association"
Productos.belongsToMany(Tags, { through: TagsProductos });
Tags.belongsToMany(Productos, { through: TagsProductos });
Productos.hasMany(TagsProductos);
TagsProductos.belongsTo(Productos);
Tags.hasMany(TagsProductos);
TagsProductos.belongsTo(Tags);

module.exports = { Usuarios, Productos, Pedidos, Carritos, Favoritos, Tags };
