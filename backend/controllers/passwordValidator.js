const passwordValidatorModel = require("../models/passwordValidator.js");

module.exports = (req, res, next) => {
  console.log(req.body);
  console.log(
    passwordValidatorModel.validate(req.body.password, { liste: true })
  );
  if (!passwordValidatorModel.validate(req.body.password)) {
    return res.status(400).json({
      error:
        "Need two digits minimum, need a upercase, need between 6 and 100 characters",
    });
  } else {
    next();
  }
};
