import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  updatedAt: { type: Date, required: true },
  image: { type: String }, // store filename here
});

export const Product = mongoose.model("Product", productSchema);
