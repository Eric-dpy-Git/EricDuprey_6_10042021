/* Mongoose is an ODM use to manages relationships between data
provides schema validation, and is used to translate between 
objects in code and the representation of those objects in MongoDB. */

//import mongoose
const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  //Schema is a mongoose function
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

//export this schema
module.exports = mongoose.model("Sauce", sauceSchema);
