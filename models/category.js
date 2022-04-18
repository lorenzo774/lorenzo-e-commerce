const mongoose = require("mongoose");
const { Schema } = mongoose;

// Category Schema
const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
});

// URL virtual property
CategorySchema.virtual("deleteUrl").get(function () {
  return `/categories/${this._id}/delete`;
});

module.exports = mongoose.model("Category", CategorySchema);
