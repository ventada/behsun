const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },

  accessLevel: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("user", userSchema);
