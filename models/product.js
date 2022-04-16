const mongoose = require("mongoose");
const { Schema } = mongoose;

// Product Schema
const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

// URL virtual property
ProductSchema.virtual("url").get(function () {
  return `/products/${this._id}`;
});

module.exports = mongoose.model("Product", ProductSchema);
