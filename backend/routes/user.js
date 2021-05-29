//import express
const express = require("express");

//create router
const router = express.Router();

const userCtrl = require("../controllers/user");

const passwordValidator = require("../controllers/passwordValidator");

router.post("/signup", passwordValidator, userCtrl.signup);
router.post("/login", userCtrl.login);

//reexport router
module.exports = router;
