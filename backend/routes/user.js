//import express
const express = require("express");

//create router
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

//reexport router
module.exports = router;
