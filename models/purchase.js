const mongoose = require("mongoose");
const { Schema } = mongoose;

// Purchase Schema
const PurchaseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  total_price: Number,
});

// Url virtual property
PurchaseSchema.virtual("url").get(function () {
  return `/purchase/${this._id}`;
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
