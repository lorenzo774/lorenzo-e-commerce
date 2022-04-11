const express = require("express");
const router = express.Router();
// Controller
const index_controller = require("../controllers/indexController");

/* GET home page. */
router.get("/", index_controller.index);

module.exports = router;
