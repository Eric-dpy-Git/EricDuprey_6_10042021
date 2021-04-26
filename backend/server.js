//http node package importation
const http = require("http");

//import application express fromm file app.js
const app = require("./app");

//need to tell express application on wich port it run
app.set("port", process.env.PORT || 3000);
//server creation
const server = http.createServer(app);

//server have to listen request --> process.env.PORT if 3000 default port not available
server.listen(process.env.PORT || 3000);
