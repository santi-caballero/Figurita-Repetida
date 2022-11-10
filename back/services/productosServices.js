const { Productos, Tags } = require("../db/models/index");
const { Op } = require("sequelize");

class productosServices {
  //obtener todos los productos
  static getAllProducts() {
    return Productos.findAll();
  }
  //obtener un producto por id
  static getProductById(id) {
    return Productos.findOne({ where: { id } });
  }

  //buscar un producto por tag
  static buscarPorTags(tags) {
    return Productos.findAll({
      where: { "$tags.valor$": { [Op.any]: tags } },
      include: Tags,
    });
  }
  //filtrar productos por categorias
  static filtrarPorCategorias(busqueda) {
    return Productos.findAll({
      where: { [Op.and]: busqueda },
    });
  }
  //admin crea un producto
  static crearProducto(productoCompleto) {
    return Productos.create(productoCompleto);
  }
  //admin actualiza un producto
  static actualizarProducto(valoresActualizados, id) {
    return Productos.update(valoresActualizados, {
      where: { id },
      returning: true,
      plain: true,
    });
  }
  //admin borra un producto
  static eliminarProducto(id) {
    return Productos.destroy({ where: { id } });
  }
}

module.exports = productosServices;
