const mongoose = require("mongoose");

const solarSchema = new mongoose.Schema({
  modelId: {
    type: Number,
    required: true,
    uniqe: true,
  },
  modelName: {
    type: String,
    required: true,
  },
  inventory: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  vacum: {
    type: String,
    required: true,
  },
  tankVolume: {
    type: Number,
    required: true,
  },
  requiredSpace: {
    type: String,
    required: true,
  },
  // insulationLayer: {
  //   type: String,
  //   required: true,
  // },
  internalTank: {
    type: String,
    required: true,
  },
  externalTank: {
    type: String,
    required: true,
  },
  insulationLayer: {
    type: String,
    required: true,
  },
  vacumTube: {
    type: String,
    required: true,
  },
  heatPipe: {
    type: String,
  },
  desc: {
    type: String,
  },
  images: [
    {
      fileName: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("solar", solarSchema);
