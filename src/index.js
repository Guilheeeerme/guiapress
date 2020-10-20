const express = require("express");
const app = express();
const connectionDB = require("./database/database");

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

app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Server connected at http://localhost:3000");
});
