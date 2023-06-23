const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Provide your first name"],
    match: [/^[A-Za-z]{1,50}$/, "Provide valid first name"],
  },
  lastName: {
    type: String,
    required: [true, "Provide your last name"],
    match: [/^[A-Za-z]{1,50}$/, "Provide valid last name"],
  },
  email: {
    type: String,
    required: [true, "Provide your email"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Provide valid email"],
  },
  mobileNumber: {
    type: Number,
    required: [true, "Provide your mobile number"],
    match: ["/^d{10}$/", "Provide valid mobile number"],
  },
  gender: {
    type: String,
    required: [true, "Provide your gender"],
  },
  status: {
    type: String,
    required: [true, "Provide your status"],
  },
  location: {
    type: String,
    required: [true, "Provide your location"],
    match: [/^[A-Za-z0-9]{1,50}$/, "Provide valid location"],
  },
  profile: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
