//import express
const express = require("express");

//create router
const router = express.Router();

const sauceCtrl = require("../controllers/sauce");

//import middleware auth wich is protect access to routes
const auth = require("../middleware/auth");

//import middleware before include in route
const multer = require("../middleware/multer-config");

//routing logique here
//apply auth before controlleur to protect access
//apply multer AFTER auth
router.get("/", auth, multer, sauceCtrl.getAllSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeDislike);

//reexport router
module.exports = router;
