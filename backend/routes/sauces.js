//import express
const express = require("express");

//create router
const router = express.Router();

const sauceCtrl = require("../controllers/sauce");

router.get("/", sauceCtrl.getAllSauce);
router.post("/", sauceCtrl.createSauce);
router.get("/:id", sauceCtrl.getOneSauce);
router.put("/:id", sauceCtrl.modifySauce);
router.delete("/:id", sauceCtrl.deleteSauce);

//reexport router
module.exports = router;
