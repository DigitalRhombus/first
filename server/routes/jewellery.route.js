require("dotenv").config();
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Product = require("../model/Accessories");

// Route to handle product creation
router.post("/create", upload.single("image"), async (req, res) => {
  console.log("Product creation API hit"); // Debugging Log
  try {
    const { name, description, price, category } = req.body;
    console.log("Request Body:", req.body);
    console.log("File Uploaded:", req.file);

    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return res.status(500).json({ error: "Image upload failed" });
        }

        console.log("Cloudinary Upload Success:", result);

        const product = new Product({
          name,
          description,
          price,
          category,
          imgUrl: result.secure_url,
        });

        await product.save();
        console.log("Product Saved:", product);

        res
          .status(201)
          .json({ message: "Product added successfully!", product });
      }
    );

    Readable.from(req.file.buffer).pipe(stream);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
