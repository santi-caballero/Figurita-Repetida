const productosServices = require("../services/productosServices");

class productosController {
  static getProductos(req, res) {
    productosServices
      .getAllProducts()
      .then((result) => res.status(200).send(result))
      .catch((err) => console.log(err));
  }

  static getId(req, res) {
    const id = req.params.id;
    productosServices
      .getProductById(id)
      .then((result) => res.status(200).send(result))
      .catch((err) => console.log(err));
  }

  static buscarPorTags(req, res) {
    const tags = req.params.tags.split("_");
    productosServices
      .buscarPorTags(tags)
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
      })
      .catch((err) => console.log(err));
  }

  static filtrarPorCategorias(req, res) {
    const { tipo, rareza, posicion, pais } = req.body;
    const busqueda = [];
    if (tipo) busqueda.push({ tipo });
    if (rareza) busqueda.push({ rareza });
    if (posicion) busqueda.push({ posicion });
    if (pais) busqueda.push({ pais });
    productosServices
      .filtrarPorCategorias(busqueda)
      .then((result) => res.status(200).send(result))
      .catch((err) => console.log(err));
  }

  static adminPost(req, res) {
    const productoCompleto = req.body;
    productosServices
      .crearProducto(productoCompleto)
      .then((result) => res.status(201).send(result))
      .catch((err) => console.log(err));
  }

  static adminUpdate(req, res) {
    const id = req.params.id;
    const valoresActualizados = req.body;
    productosServices
      .actualizarProducto(valoresActualizados, id)
      .then((result) => res.status(202).send(result[1]))
      .catch((err) => console.log(err));
  }

  static adminDelete(req, res) {
    const id = req.params.id;
    productosServices
      .eliminarProducto(id)
      .then(res.status(202).send({}))
      .catch((err) => console.log(err));
  }
}

module.exports = productosController;
