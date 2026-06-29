import { Router } from "express";
import { OrderModel } from "../models/Order";

const router = Router();

router.post("/", async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Order must include at least one product." });
  }

  const order = await OrderModel.create({ items, createdAt: new Date() });
  res.status(201).json({ orderId: order._id, status: "created" });
});

export default router;
