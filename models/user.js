const mongoose = require("mongoose");
const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  pic: String,
  email: { type: String, required: true },
  phone: String,
});

// URL virtual property
UserSchema.virtual("url").get(function () {
  return `/account/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
