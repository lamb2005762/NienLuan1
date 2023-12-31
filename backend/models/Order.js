//Đang phát triển
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String},
    quantity: {
      type: Number,
      default: 1,
    },
    status: { type: String, default: "Chờ xác nhận" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);