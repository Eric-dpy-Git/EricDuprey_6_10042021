//import mongoose
const mongoose = require("mongoose");

//plugin mongoose
const uniqueValidator = require("mongoose-unique-validator");

//create data schema
const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
