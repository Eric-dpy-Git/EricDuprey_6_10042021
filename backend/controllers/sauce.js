//import sauces shema from models (created with mongoose function --> mongoose.Schema)
const Sauce = require("../models/sauce");

//import node filesystem to manage images
const fs = require("fs");

//work logic down here

//1-creation logic
exports.createSauce = (req, res, next) => {
  //analyse string before transform in object
  const sauceObject = JSON.parse(req.body.sauce);
  //delette mongoDb id
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    //recover image in dynamique to generate image url
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    //add special feature to like dislike
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  //save sauce in database
  sauce
    .save()
    //to don't have request expiration --> send response to server
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

//2-modify logic
exports.modifySauce = (req, res, next) => {
  //test in wich case we are --> if there is a req.file
  const sauceObject = req.file
    ? //same as route post
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    //_id = id sent in request params
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};
//3-delete logic
exports.deleteSauce = (req, res, next) => {
  //find id to delete file in image folder
  Sauce.findOne({ _id: req.params.id })
    //_id = id sent in request params
    .then((sauce) => {
      //extract file
      const filename = sauce.imageUrl.split("/images/")[1];
      //call unlink to delete file
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//4-get one logic
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    //_id = id sent in request params
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};
//5-get all logic
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

//6- special feature to like dislike
exports.likeDislike = (req, res, next) => {
  let like = req.body.like;
  let userId = req.body.userId;
  let sauceId = req.params.id;
  if (like === 1) {
    Sauce.updateOne(
      { _id: sauceId },
      { $push: { usersLiked: userId }, $inc: { likes: +1 } }
    )
      .then(() => res.status(200).json({ message: "likes added !" }))
      .catch((error) => res.status(400).json({ error }));
  }
  if (like === -1) {
    Sauce.updateOne(
      { _id: sauceId },
      { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
    )
      .then(() => {
        res.status(200).json({
          message: "Dislikes added !",
        });
      })
      .catch((error) => res.status(400).json({ error }));
  }
  if (like === 0) {
    Sauce.findOne({
      _id: sauceId,
    })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          )
            .then(() => res.status(200).json({ message: "Likes remove!" }))
            .catch((error) => res.status(400).json({ error }));
        }
        if (sauce.usersDisliked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
          )
            .then(() =>
              res.status(200).json({
                message: "Dislikes remove !",
              })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(404).json({ error }));
  }
};
