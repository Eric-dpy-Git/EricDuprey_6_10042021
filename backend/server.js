//package http import
const http = require("http");
//app import to use on serve
const app = require("./app");

//the  normalizePort  function returns a valid port, whether it is provided as a number or a string
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
//listen on port 3000 if no return
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//errorHandler search, manage and save error on server
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};
//create server with express (need to be install with terminal before) and and const for request/response server
const server = http.createServer(app);

//server on --> errorhandler manage & log in console
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});
//server listen on port set in const
server.listen(port);
