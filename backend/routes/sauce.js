const express = require("express");
const router = express.Router();

//Importing Sauce Controller
const sauceCtrl = require("../controllers/sauce");

//Importing Multer
const multer = require("../middleware/multer-config");

//Importing Authentication
const auth = require("../middleware/auth");

//Post route
router.post("/", auth, multer, sauceCtrl.createSauce);

//Get route
router.get("/", auth, sauceCtrl.getAllSauce);

//Get route one sauce
router.get("/:id", auth, sauceCtrl.getOneSauce);

//Update route one sauce
router.put("/:id", auth, multer, sauceCtrl.modifySauce);

//Delete route
router.delete("/:id", auth, sauceCtrl.deleteSauce);

//Like and Dislike route
router.post("/:id/like", auth, sauceCtrl.likeSauce);

//Exporting the Routes
module.exports = router;
