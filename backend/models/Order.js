const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true }, // Thêm required true để đảm bảo productId luôn được cung cấp
    quantity: {
      type: Number,
      default: 1,
      required: true, // Thêm required true để đảm bảo luôn có thông tin về số lượng sản phẩm
    },
    status: { type: String, default: "Chờ xác nhận" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
