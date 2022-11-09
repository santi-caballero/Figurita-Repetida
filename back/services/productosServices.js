const { Productos } = require("../db/models/index");
const { Op } = require("sequelize");


class productosServices {
  //obtener todos los productos
  static async getAllProducts() {
    return Productos.findAll();
  }
  //obtener un producto por id
  static async getProductById(id) {
    return Productos.findOne({ where: { id } });
  }
  //buscar un producto por tag
  static async buscarPorTags(tags) {
    return Productos.findAll({
      where: {
        tags: { [Op.substring]: tags },
      },
    });
  }
  //filtrar productos por categorias
  static async filtrarPorCategorias(busqueda) {
    return Productos.findAll({
      where: { [Op.and]: busqueda },
    });
  }
  //admin crea un producto
  static async crearProducto(productoCompleto) {
    return Productos.create(productoCompleto);
  }
  //admin actualiza un producto
  static async actualizarProducto(valoresActualizados, id) {
    return Productos.update(valoresActualizados, { where: { id } });
  }
  //admin borra un producto
  static async eliminarProducto(id){
    return Productos.destroy({ where: { id } })
  }
}

module.exports = productosServices;
