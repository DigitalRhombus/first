const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  category: {
    type: String,
    enum: ["Rings", "Earrings", "NecklacesAndPendants", "BraceletsAndBangles", "Chains", "NosePinsAndNath"],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

const Accessory = mongoose.model("Accessory", accessorySchema);
module.exports = Accessory;
