const express = require("express");
const router = express.Router();

// Controller
const authController = require("../controllers/authController");

// Sign up to the website
router.get("/signup", authController.signup);
// Sign in to the website
router.get("/signin", authController.signin);

module.exports = router;
