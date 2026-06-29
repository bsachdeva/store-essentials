import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  items: { type: [orderItemSchema], required: true },
  createdAt: { type: Date, required: true },
});

export const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
