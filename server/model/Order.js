const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      accessoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Accessory", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // Store price at the time of order
    },
  ],
  totalAmount: { type: Number, required: true },
  deliveryAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: {
      type: String,
      required: true,
      enum: [
        "Maharashtra", "Gujarat", "Punjab",
        "Alberta", "British Columbia", "Manitoba", "New Brunswick",
        "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island",
        "Quebec", "Saskatchewan",
      ],
    },
    country: { type: String, enum: ["India", "Canada"], required: true },
    postalCode: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
