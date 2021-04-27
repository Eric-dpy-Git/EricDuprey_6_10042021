//import mongoose
const mongoose = require("mongoose");

const saucesSchema = mongoose.Schema({
  //creator id
  userId: { type: String, required: true },
  //sauce name
  name: { type: String, required: true },
  //sauce manufacturer
  manufacturer: { type: String, required: true },
  //sauce description
  description: { type: String, required: true },
  //sauce ingredients
  mainPepper: { type: String, required: true },
  //sauce img
  imageUrl: { type: String, required: true },
  //sauce heat
  heat: { type: Number, required: true },
  //sauce likes
  likes: { type: Number },
  //sauce dislikes
  dislikes: { type: Number },
  //liked users
  usersLiked: { type: [String] },
  //disliked users
  usersDisliked: { type: [String] },
});

//export this schema
module.exports = mongoose.model("sauces", saucesSchema);
