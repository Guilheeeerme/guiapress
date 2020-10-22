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
    res.render("index", { articles });
  });
});

app.get("/:slug", (req, res) => {
  const { slug } = req.params;
  Article.findOne({
    where: { slug },
  })
    .then((article) => {
      if (article) {
        res.render("article", { article });
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
