const express = require("express");
const router = express.Router();

// Controller
const categoryController = require("../controllers/categoryController");

const { authAdmin } = require("../middlewares/auth");

// Get list of categories
router.get("/", categoryController.category_list);

// Create
router.get("/create", [authAdmin, categoryController.category_create_get]);
router.post("/create", [authAdmin, categoryController.category_create_post]);

// Delete
router.post("/:id/delete", [
  authAdmin,
  categoryController.category_delete_post,
]);

module.exports = router;
