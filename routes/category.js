const express = require("express");
const router = express.Router();

// Controller
const categoryController = require("../controllers/categoryController");

// Get list of categories
router.get("/", categoryController.category_list);

// Create
router.get("/create", categoryController.category_create_get);
router.post("/create", categoryController.category_create_post);

// Delete
router.post("/:id/delete", categoryController.category_delete_post);

module.exports = router;
