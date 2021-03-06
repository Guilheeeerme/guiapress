const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("../articles/Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
  Article.findAll({
    include: [{ model: Category }], // Incluindo os dados do Model via o relacionamento
  }).then((articles) => {
    res.render("admin/articles/index", { articles });
  });
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

router.post("/articles/delete", (req, res) => {
  const { id } = req.body;
  if (id) {
    // Garantindo que é number
    if (!isNaN(id)) {
      Article.destroy({
        where: {
          id,
        },
      }).then(() => res.redirect("/admin/articles"));
    } else {
      res.redirect("/admin/articles");
    }
  } else {
    res.redirect("/admin/articles");
  }
});

module.exports = router;
