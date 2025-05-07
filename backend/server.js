"use client";
import next from "next";
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./app/config/db.js";
import { errorMiddleware } from "./app/middlewares/error.js";
import cookieParser from "cookie-parser";
import authRoutes from "./app/api/auth/authRoutes.js";
import productRoutes from "./app/api/products/productRoutes.js";
import customerRoutes from "./app/api/customers/customerRoutes.js";
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

config({ path: ".env" });

const PORT = process.env.PORT || 4000;
app.prepare().then(async () => {
  await connectDB();

  removeUnverifiedAccounts();

  const server = express();

  server.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
  server.use(express.json());
  server.use(cookieParser());

  server.use("/api/auth", authRoutes);
  server.use("/api/products", productRoutes);
  server.use("/api/customers", customerRoutes);

  server.get("/api/custom", (req, res) => {
    res.json({ message: "This is a custom route!" });
  });

  server.all("*", (req, res) => handle(req, res));

  server.use(errorMiddleware);

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Readyy on http://localhost:${PORT}`);
  });
});
