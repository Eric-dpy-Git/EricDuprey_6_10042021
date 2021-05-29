//from --> https://www.npmjs.com/package/password-validator

//import model of password
const passwordValidatorModel = require("../models/passwordValidator.js");

module.exports = (req, res, next) => {
  //if password does not respect the model --> return error
  if (!passwordValidatorModel.validate(req.body.password)) {
    return res.status(400).json({
      error:
        "Need two digits minimum, need a upercase, need between 6 and 100 characters",
    });
  } else {
    next();
  }
};
