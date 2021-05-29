//from --> https://www.npmjs.com/package/password-validator
var passwordValidator = require("password-validator");

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
  .is()
  .min(6) // Minimum length 6
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .has()
  .not()
  .symbols() // No symbols as request !!!
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values for example

module.exports = schema;
