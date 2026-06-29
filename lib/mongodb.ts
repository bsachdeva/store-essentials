import mongoose from "mongoose";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/store-essentials";
let cached = globalThis as typeof globalThis & { mongoose?: typeof mongoose };

if (!cached.mongoose) {
  cached.mongoose = mongoose;
}

export async function connect() {
  if (cached.mongoose?.connection.readyState) {
    return cached.mongoose;
  }
  await mongoose.connect(uri);
  return cached.mongoose;
}
