const Sequelize = require("sequelize");

const db = new Sequelize("FiguritaRepetida", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false, // set to console.log to see the raw SQL queries
});

module.exports = db;
