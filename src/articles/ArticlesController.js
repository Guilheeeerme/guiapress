const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("../articles/Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
  res.render("admin/articles/index");
});

// Faz a busca no DB, renderiza a view com Form POST já com os dados buscados, no then
router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories });
  });
});

router.post("/articles/save", (req, res) => {
  const { title, body, category } = req.body;
  Article.create({
    title,
    slug: slugify(title),
    body,
    categoryId: category, // Chave estrangeira, não ta no Model mas ta la no DB
  }).then(() => {
    res.redirect("/admin/articles");
  });
});

module.exports = router;
