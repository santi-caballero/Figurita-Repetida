const { Productos, Tags } = require("../db/models/index");
const { Op } = require("sequelize");

class productosServices {
  //obtener todos los productos
  static getAllProducts() {
    return Productos.findAll();
  }

  //obtener un producto por id
  static getProductById(id) {
    return Productos.findByPk(id);
  }

  //buscar un producto por tag
  static buscarPorTags(tags) {
    return Productos.findAll({
      where: { "$tags.valor$": { [Op.all]: tags } },
      include: Tags,
    });
  }

  //filtrar productos por categorias
  static filtrarPorCategorias(filtro) {
    return Productos.findAll({
      where: { [Op.and]: filtro },
    });
  }

  //admin crea un producto
  static crearProducto(productoNuevo) {
    return Productos.create(productoNuevo);
  }

  //admin actualiza un producto
  static actualizarProducto(productoActualizado, id) {
    return Productos.update(productoActualizado, {
      where: { id },
      returning: true, // Este código y
      plain: true, // este código son necesarios para que el Model.update() devuelva la instancia modificada
    });
  }

  //admin borra un producto
  static eliminarProducto(id) {
    return Productos.destroy({ where: { id } });
  }
}

module.exports = productosServices;
