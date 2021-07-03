const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("message", messageSchema);
