const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = 3000;

// paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// handlebar engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

console.log("__dirname", __dirname);

// static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather-app",
    name: "LuciferBNK",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "LuciferBNK",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text",
    name: "LuciferBNK",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide a address term" });
  }
  geocode(req.query.address, (error, data) => {
    if (error) return res.send({ error });
    if (data) {
      forecast(data, (error, data) => {
        if (error) return res.send({ error });
        res.send({ forecastData: data, address: req.query.address });
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) =>
  res.render("error", {
    title: "404",
    errorMessage: "Help article not found",
    name: "LuciferBNK",
  })
);

app.get("*", (req, res) =>
  res.render("error", {
    title: "404",
    errorMessage: "Page not found",
    name: "LuciferBNK",
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
