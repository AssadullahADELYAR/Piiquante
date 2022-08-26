const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

//Signup and Login Route
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

//Exporting the Routes
module.exports = router;
