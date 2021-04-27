//import mongoose
const mongoose = require("mongoose");

//plugin mongoose
const uniqueValidator = require("mongoose-unique-validator");

//create data schema
const usersSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

usersSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", usersSchema);
