//http node package importation
const http = require("http");

//import application express from file app.js
const app = require("./app");

//server creation
const server = http.createServer(app); //pass the application to the server

//need to tell express application on wich port it run
app.set("port", process.env.PORT || 3000);

//server have to listen request --> process.env.PORT if 3000 default port not available
server.listen(process.env.PORT || 3000);
