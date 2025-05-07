import { Product } from "../models/productModel.js";
import fs from "fs";
import path from "path";
// ✅ Create Product
// export const createProduct = async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json({ success: true, product });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

export const createProduct = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    // Make sure you're getting the data
    const { title, description, updatedAt } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const product = await Product.create({
      title,
      description,
      updatedAt: updatedAt || new Date(),
      image,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error creating product",
    });
  }
};

// ✅ Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Product
// export const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.status(200).json({ success: true, product });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const updateProduct = async (req, res) => {
//   try {
//     const { title, description, updatedAt } = req.body;
//     const image = req.file?.filename;

//     const updatedFields = { title, description, updatedAt };
//     if (image) updatedFields.image = image;

//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       updatedFields,
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, product: updatedProduct });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

export const updateProduct = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const updateData = {
      title,
      description,
      updatedAt: new Date(),
    };

    if (image) {
      updateData.imageUrl = `/uploads/${image.filename}`; // Store relative path
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      // Clean up the uploaded file if product wasn't found
      if (image) {
        fs.unlinkSync(path.join(uploadDir, image.filename));
      }
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    // Clean up any uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(path.join(uploadDir, req.file.filename));
    }
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ✅ Delete Product

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // Optional: delete image from uploads folder
    if (product.image) {
      const filePath = path.join("app", "uploads", product.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
