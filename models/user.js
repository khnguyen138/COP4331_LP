const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const UserSchema = new Schema(
  {
    UserId: {
      type: Number,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Login: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    IsVerified: {
      type: Boolean,
      default: false,
    },
    VerificationToken: {
      type: String,
    },
    VerificationExpires: {
      type: Date,
    },
    ResetPasswordToken: {
      type: String,
    },
    ResetPasswordExpires: {
      type: Date,
    },
  },
  { collection: "Users" }
);

module.exports = user = mongoose.model("Users", UserSchema);
