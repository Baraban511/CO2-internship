const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 80;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/data", (req, res) => {
  var data = require("./data.json");
  var maxYear = Math.max(...data.map((item) => item.Year));
  // Filtrer les données pour ne renvoyer que les éléments ayant la valeur 'Year' la plus élevée
  var data = data.filter((item) => item.Year === maxYear);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(data);
});

app.post("/add", (req, res) => {
  // Lire le fichier data.json
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) {
      res.status(418).send(`Error reading file from disk: ${err}`);
    } else {
      if (!req.body.Country) {
        res.status(418).send("Country is required");
        return;
      }
      if (!req.body.ISO) {
        res.status(418).send("ISO is required");
        return;
      }
      if (!req.body.Year && req.body.Year === null) {
        res.status(418).send("Year is required");
        return;
      } else {
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
        fs.writeFile(
          "./data.json",
          JSON.stringify(databases, null, 4),
          (err) => {
            if (err) {
              res.status(418).send(`Error writing file: ${err}`);
            }
          }
        );
      }
    }
  });
  res.status(200).send("Data added successfully");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
