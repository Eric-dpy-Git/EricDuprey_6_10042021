// https://www.youtube.com/watch?v=ESpeDdFuKBE

//app.js manage all request send by server

var helmet = require("helmet");
app.use(helmet());

//import mogoose

//Express instead bodyParser wich is deprecated

//import body-parser
/* const bodyParser = require("body-parser"); */ const mongoose = require("mongoose");

//import sauces route
const saucesRoutes = require("./routes/sauces");

//import user route
const userRoutes = require("./routes/user");

//access to file system path
const path = require("path");

/* ******************************************* express.js *************************************** */
/* Express.js is a framework for building web applications based on Node.js.
It is in fact the standard framework for server development in Node.js*/

//import express with command require, express need to be install before
const express = require("express");

//const app wich call express --> create express application
const app = express();

//export this const to use from others files (server.js actually --> server node will serve this application)
module.exports = app;

//instead bodyParser wich is deprecated
app.use(express.json());
/* app.use(bodyParser.json()); */

/********************************************* connect to mogodb **************************************** */
mongoose
  .connect(
    "mongodb+srv://firstCluster:Wq1AGS5zTHWGBUkX@cluster0.qw5su.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

/* *********************************************************** CORS **************************************** */

/* The Cross-Origin Resource Sharing or Cors (literally "Sharing resources between multiple origins")
is a mechanism that allows restricted resources of a web page to be recovered by another outside 
domain at the domain from which the first resource has been served1. 
A web page can freely integrate resources from different origins such as images, style sheets, scripts, iframes and videos */

//general (app.use --> handle all requests) middleware with no route applied to the server
app.use((req, res, next) => {
  //header on response object allow --> everybody (*)
  res.setHeader("Access-Control-Allow-Origin", "*");
  //allow some requests
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  //allow some methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
/* ******************************* end ************************** */

/* ***************************************** middlewares ********************************************/

/* middleware is third-party software that creates a network
for exchanging information between different computer applications.*/

//app.use --> handle all requests

//for all request sent to /immage file image be serve
app.use("/images", express.static(path.join(__dirname, "images")));

//app.use + endpoint targeted by the application + import from another file
app.use("/api/sauces", saucesRoutes); //clear syntax
app.use("/api/auth", userRoutes); //clear syntax
