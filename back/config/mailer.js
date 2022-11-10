const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "figuritarepetidaecommerce@gmail.com",
    pass: "yltzaditbtbkoogd", // generated ethereal password
  },
});

const emailConfirmacion = function (carrito, usuario) {
  console.log(usuario.nombreCompleto);
  const { email, nombreCompleto } = usuario;
  const tabla =
    carrito.pedidos
      .map(
        (pedido) =>
          `${pedido.producto.nombreCompleto} ${pedido.cantidad}  ${
            pedido.producto.precio * pedido.cantidad
          }<br>`
      )
      .join(" ") + `el precio total es${carrito.preciototal}`;

  transporter.sendMail({
    from: '"Figurita Repetida" <figuritarepetidaecommerce@gmai.com>',
    to: email,
    subject: "Compra realizada",
    html: `<b>Hola ${nombreCompleto}: <br> Ya están en camino tus figus. Este es el detalle de tu compra: <br> ${tabla} <br> Saludos, el equipo de Figurita Repetida </b>`,
  });
};

module.exports = emailConfirmacion;
