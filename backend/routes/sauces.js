//import express
const express = require("express");

//create router
const router = express.Router();

const sauceCtrl = require("../controllers/sauce");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, multer, sauceCtrl.getAllSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);

//reexport router
module.exports = router;
