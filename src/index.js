const express = require("express");
const app = express();
const connectionDB = require("./database/database");

// prettier-ignore
connectionDB.authenticate().then(() => {
  console.log("Connection made to MySQL");
}).catch((err) => console.log("ERROOO"));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Server connected at http://localhost:3000");
});
