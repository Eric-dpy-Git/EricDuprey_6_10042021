/* Jwt allows the secure exchange of tokens between several parties.
This security of the exchange is reflected in the verification of the integrity of the data using a digital signature.
It is performed by the HMAC or RSA algorithm. */

//Import jwt (need to be instal with terminal before --> npm install --save jsonwebtoken)
//jwt allows create and verify tokens
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //recover token in header authorization
    const token = req.headers.authorization.split(" ")[1];
    //decode token with verify function and give secret key
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    //recover user id inside
    const userId = decodedToken.userId;
    //compare user id
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      //if ok --> call next --> in routes.js --> sauce we want protect
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error(" Unidentified request !"),
    });
  }
};
