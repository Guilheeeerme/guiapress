const Sequelize = require("sequelize");
const connection = require("../database/database"); // Conexão com o DB

// Importando o Model para fazer o relacionamento
const Category = require("../categories/Category");

const Article = connection.define("articles", {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
  body: { type: Sequelize.TEXT, allowNull: false },
});

Category.hasMany(Article); // UMA Categoria tem MUITOS artigos
Article.belongsTo(Category); // UM artigo pertence a UMA Categoria

// Article.sync({ force: true }); // Executar uma vez apenas para sincronizar, caso já esta sincronizado ele ignora (preciso confirmar)

module.exports = Article;
