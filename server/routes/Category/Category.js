const express = require("express");
const Category = require("../../model/Category");
const router = express.Router();


const { body, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const JWT_Secret = "NikhilGehlot"


router.get("/", (req, res) => {
  res.send("Category Route is Up and Running");
});


// Create a category
router.post("/", async (req, res) => {
  try {
    const { name, description, amount, imgUrl } = req.body;
    const category = new Category({ name, description, imgUrl });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
