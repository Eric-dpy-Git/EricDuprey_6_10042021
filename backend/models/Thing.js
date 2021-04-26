//import mongoose
const mongoose = require("mongoose");

//create data schema
const thingSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Thing", thingSchema);
