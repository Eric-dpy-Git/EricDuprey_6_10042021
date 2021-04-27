// https://www.youtube.com/watch?v=ESpeDdFuKBE

//import express with command require
const express = require("express");

//import body-parser
const bodyParser = require("body-parser");

//import mogoose
const mongoose = require("mongoose");

//import sauces route
const saucesRoutes = require("./routes/sauces");

//import user route
const userRoutes = require("./routes/user");
/* *********************************************** end import ********************************************* */

//const app wich is our application with nothings inside but call method express
const app = express();

/********************************************* connect to mogodb **************************************** */
mongoose
  .connect(
    "mongodb+srv://firstCluster:Wq1AGS5zTHWGBUkX@cluster0.qw5su.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

/* *********************************************************** CORS **************************************** */
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
/* ******************************* end ************************** */

//instead bodyParser wich is deprecated
app.use(express.json());
/* app.use(bodyParser.json()); */

//------------------middlewares

app.use("/api/sauces", saucesRoutes);

app.use("/api/auth", userRoutes);

//----------------end-------------

//export this const to use from other files
module.exports = app;
