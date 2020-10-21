const Sequelize = require("sequelize");
require("dotenv").config();

const connection = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASS,
  {
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00",
  }
);

module.exports = connection;
