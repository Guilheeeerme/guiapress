const Sequelize = require("sequelize");
const connection = require("../database/database"); // Conexão com o DB

const Category = connection.define("categories", {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
});

// Category.sync({ force: true }); // Executar uma vez apenas para sincronizar

module.exports = Category;
