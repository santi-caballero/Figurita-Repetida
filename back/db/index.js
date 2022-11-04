const Sequelize = require("sequelize");

const db = new Sequelize("FiguritaRepetida", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false, 
});

module.exports = db;
