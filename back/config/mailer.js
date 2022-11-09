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

const emailConfirmacion = function (carrito) {
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
    from: '"Figurita Repetida" <figuritarepetidaecommerce@gmai.com>', // sender address
    to: "franciscoalvarezraineri@gmail.com", // list of receivers
    subject: "Compra realizada", // Subject line
    html: `<b> Ya te van a llegar tus figus ${tabla}</b>`, // html body
  });
};

module.exports = emailConfirmacion;
