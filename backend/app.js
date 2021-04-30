// https://www.youtube.com/watch?v=ESpeDdFuKBE

//import body-parser
const bodyParser = require("body-parser");

//import mogoose
const mongoose = require("mongoose");

//import sauces route
const saucesRoutes = require("./routes/sauces");

//import user route
const userRoutes = require("./routes/user");

//access to file system path
const path = require("path");

/* ******************************************* express.js *************************************** */
//Express.js is a framework for building web applications based on Node.js.
//It is in fact the standard framework for server development in Node.js

//import express with command require, it need to be install before
const express = require("express");

//const app wich call express --> create express application
const app = express();

//export this const to use from others files (server.js actually --> server node will serve this application)
module.exports = app;

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

app.use("/images", express.static(path.join(__dirname, "images")));

//instead bodyParser wich is deprecated
app.use(express.json());
/* app.use(bodyParser.json()); */

/* ***************************************** middlewares ********************************************/
//middleware is third-party software that creates a network
// for exchanging information between different computer applications.

app.use("/api/sauces", saucesRoutes); //clear syntax
app.use("/api/auth", userRoutes); //clear syntax
