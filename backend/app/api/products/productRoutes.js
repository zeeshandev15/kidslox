import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../../../controllers/productsControllers.js";
import { upload } from "../../middlewares/upload.js";
import express from "express";

const router = express.Router();
router.post("/", upload.single("image"), createProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);
router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
