//http node package importation
const http = require("http");

//server creation
const server = http.createServer((req, res) => {
  res.end("voila la réponse du serveur");
});

//server have to listen request --> env.PORT if 3000 default port not available
server.listen(process.env.PORT || 3000);
