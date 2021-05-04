//http node package importation
const https = require("https");

//import application express from file app.js
const app = require("./app");

//server creation
const server = https.createServer(app); //pass the application to the server

//need to tell express application on wich port it run --> process.env.PORT if 3000 default port not available
app.set("port", process.env.PORT || 3000);

//server have to listen request --> process.env.PORT if 3000 default port not available
server.listen(process.env.PORT || 3000);
