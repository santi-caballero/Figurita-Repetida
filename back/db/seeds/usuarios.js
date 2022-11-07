const { Usuarios } = require("../models");

const usuariosFalsos = [
  {
    username: "elSanti",
    nombre: "Santiago",
    apellido: "Caballero",
    email: "santiagocaballero1747@gmail.com",
    password: "UruguayEsElMejorPais",
  },
  {
    username: "GeroZ",
    nombre: "Geronimo",
    apellido: "Zamora",
    email: "geronimo.zamora16@gmail.com",
    password: "MoreLikeZalessa",
  },
  {
    username: "Sr.Etiqueta",
    nombre: "Carlos",
    apellido: "Rampi",
    email: "carampi@gmail.com",
    password: "HagamosLasMaletas",
  },
  {
    username: "DonRamon",
    nombre: "Leandro",
    apellido: "Echezuri",
    email: "leandro.echezuri@gmail.com",
    password: "password",
  },
  {
    username: "Bautista",
    nombre: "Bautista",
    apellido: "González Lazo",
    email: "bautistagonzalezlazo@gmail.com",
    password: "SilenciosoPeroLetal",
  },
  {
    username: "elPayaso",
    nombre: "Francisco",
    apellido: "Alvarez Raineri",
    email: "franciscoalvarezraineri@gmail.com",
    password: "PushAMain",
  },
  {
    username: "1",
    nombre: "1",
    apellido: "1",
    email: "1@1.com",
    password: "1",
  },
];

module.exports = function () {
  return Usuarios.bulkCreate(usuariosFalsos);
};
