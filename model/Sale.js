const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  costumerName: {
    type: String,
    required: true,
  },
  costumerPhone: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "solars",
  },
});

module.exports = mongoose.model("sale", saleSchema);
