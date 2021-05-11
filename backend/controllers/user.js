//import package bcrypt (need to be instal before)
const bcrypt = require("bcrypt");

//Import jwt (need to be instal with terminal before --> npm install --save jsonwebtoken)
//jwt allows create and verify tokens
const jwt = require("jsonwebtoken");

//import user shema
const User = require("../models/user");

//Signup function for load new users
exports.signup = (req, res, next) => {
  bcrypt
    //crypt password
    //10 salt = how many hash (it's average)
    .hash(req.body.password, 10)
    .then((hash) => {
      //create new user with Schema
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      //save in DB
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//login function to connect existing users
exports.login = (req, res, next) => {
  //method findOne + object of comparison
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      //function compare
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          //if invalid
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          //if true
          res.status(200).json({
            //send back json object + token
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        //If no connection
        .catch((error) => res.status(500).json({ error }));
    })
    //If no connection
    .catch((error) => res.status(500).json({ error }));
};
