const mongoose = require("mongoose");
const { Schema } = mongoose;

// Purchase Schema
const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  total_price: Number,
});

// Url virtual property
OrderSchema.virtual("url").get(function () {
  return `/orders/${this._id}`;
});

module.exports = mongoose.model("Order", OrderSchema);
