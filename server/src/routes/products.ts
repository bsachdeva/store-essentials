import { Router } from "express";
import { ProductModel } from "../models/Product";

const router = Router();
const seedProducts = [
  { id: 1, title: "Everyday Laptop", description: "A sleek laptop for productivity and entertainment.", price: 999.0 },
  { id: 2, title: "Smartphone Pro", description: "A balanced phone with strong battery life and camera.", price: 699.0 },
  { id: 3, title: "Wireless Headset", description: "Comfortable audio with active noise cancellation.", price: 229.0 },
  { id: 4, title: "Portable Speaker", description: "Rich sound for home and travel.", price: 149.0 },
];

router.get("/", async (_req, res) => {
  const existing = await ProductModel.find().lean();
  if (existing.length === 0) {
    await ProductModel.insertMany(seedProducts);
    return res.json({ products: seedProducts });
  }
  res.json({ products: existing });
});

export default router;
