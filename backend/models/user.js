//import mongoose
const mongoose = require("mongoose");

//import plugin mongoose package for only one user can create
const uniqueValidator = require("mongoose-unique-validator");

//create data schema
const userSchema = mongoose.Schema({
  //create with Schema function
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//inject plugin in schema (only one user)
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
