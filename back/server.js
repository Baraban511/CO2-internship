const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 80;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/data", (req, res) => {
  var data = loadJsonFile("./data.json");
  var maxYear = Math.max(...data.map((item) => item.Year));
  // Filtrer les données pour ne renvoyer que les éléments ayant la valeur 'Year' la plus élevée
  var data = data.filter(
    (item) => item.Year > maxYear - 10 && item.Year <= maxYear
  );
  res.json(data);
});

app.post("/add", (req, res) => {
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) {
      res.send(`Error reading file from disk: ${err}`);
      return;
    }
    if (!req.body.Country) {
      res.send("Country is required");
      return;
    }
    if (!req.body.ISO) {
      res.send("ISO is required");
      return;
    }
    if (!req.body.Year && req.body.Year === null) {
      res.send("Year is required");
      return;
    }
    if (maxYear - 10 < req.body.Year < maxYear) {
      res.send("Year have to be less than 2021");
      return;
    }
    if (req.body.ISO.length !== 3) {
      res.send("ISO must be 3 characters");
      return;
    }
    req.body.Total =
      req.body.Coal +
      req.body.Oil +
      req.body.Gas +
      req.body.Cement +
      req.body.Flaring +
      req.body.Other;
    // Convertir les données en JSON
    const databases = JSON.parse(data);

    // Ajouter les nouvelles données
    databases.push(req.body);

    // Réécrire le fichier data.json avec les nouvelles données
    fs.writeFile("./data.json", JSON.stringify(databases, null, 4), (err) => {
      if (err) {
        res.send(`Error writing file: ${err}`);
        return;
      }

      res.send("Data added successfully");
    });
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

function loadJsonFile(filePath) {
  // Supprimer le fichier du cache
  delete require.cache[path.resolve(filePath)];

  // Charger le fichier
  let data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}
