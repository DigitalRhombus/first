const express = require("express");
const User = require("../../model/User");
const router = express.Router();

// ✅ Test Route
router.get("/", (req, res) => {
    res.send("Accessories Route is Up and Running");
  });

// ✅ Get All Accessories
router.get("/all", async (req, res) => {
    try {
      const accessories = await User.find();
      res.status(200).json(accessories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  