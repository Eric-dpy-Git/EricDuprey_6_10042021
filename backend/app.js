//import express with command require
const express = require("express");

//import body-parser
const bodyParser = require("body-parser");

//import mogoose
const mongoose = require("mongoose");

//import shema
const Thing = require("./models/Thing");

//const app wich is our application with nothings inside but call method express
const app = express();

//connect to mogodb
mongoose
  .connect(
    "mongodb+srv://firstCluster:Wq1AGS5zTHWGBUkX@cluster0.qw5su.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//-------------------------------------CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
//----------------end-------------

//instead bodyParser wich is deprecated
app.use(express.json());

//------------------middlewares

app.post("/api/auth/signup", (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "user load !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.put("/api/auth/signup/:id", (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "yess modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/auth/signup/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

app.get("/api/auth/signup", (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

//----------------end-------------

//export this const to use from other files
module.exports = app;
