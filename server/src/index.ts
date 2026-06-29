import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connect } from "../lib/mongodb";
import productsRouter from "./routes/products";
import ordersRouter from "./routes/orders";

dotenv.config();
const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

connect()
  .then(() => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Store API listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
