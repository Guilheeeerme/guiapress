const express = require("express");
const app = express();
const connectionDB = require("./database/database");
const morgan = require("morgan");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

// prettier-ignore
connectionDB.authenticate().then(() => {
  console.log("Connection made to MySQL");
}).catch((err) => console.log("ERROOO"));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("dev"));

app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles, categories });
    });
  });
});

app.get("/:slug", (req, res) => {
  const { slug } = req.params;
  Article.findOne({
    where: { slug },
  })
    .then((article) => {
      if (article) {
        Category.findAll().then((categories) => {
          res.render("article", { article, categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  const { slug } = req.params;
  Category.findOne({
    where: { slug },
    include: [{ model: Article }], // Relacionamento
  })
    .then((category) => {
      if (category) {
        Category.findAll().then((categories) => {
          res.render("index", { articles: category.articles, categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.listen(3000, () => {
  console.log("Server connected at http://localhost:3000");
});
