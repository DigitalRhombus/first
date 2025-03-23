const express = require("express");
const { check, validationResult } = require("express-validator");
const Accessory = require("../../model/Accessories");
const User = require("../../model/User")
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const router = express.Router();

// ✅ Test Route
router.get("/", (req, res) => {
  res.send("Accessories Route is Up and Running");
});

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Configure Multer with Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "accessories", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed image formats
    public_id: (req, file) => file.originalname.split(".")[0], // Use original file name
  },
});

const upload = multer({ storage: storage });

// ✅ Create an Accessory with Image Upload
router.post(
  "/",
  upload.single("image"), // Multer middleware to handle image upload
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("price").isNumeric().withMessage("Price must be a number"),
    check("category").notEmpty().withMessage("Category is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, price, category } = req.body;
      const imageUrl = req.file ? req.file.path : null; // Cloudinary URL

      const accessory = new Accessory({ name, description, price, category, imgUrl: imageUrl });
      await accessory.save();

      res.status(201).json({ message: "Accessory added successfully", accessory });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


// ✅ Get All Accessories
router.get("/all", async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.status(200).json(accessories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get Accessories by Category
router.get("/category/:category", async (req, res) => {
  try {
    const accessories = await Accessory.find({ category: req.params.category });
    if (accessories.length === 0) {
      return res.status(404).json({ error: "No accessories found in this category" });
    }
    res.status(200).json(accessories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update an Accessory by ID
router.put(
  "/:id",
  [
    check("name").optional().notEmpty().withMessage("Name cannot be empty"),
    check("price").optional().isNumeric().withMessage("Price must be a number"),
    check("category").optional().notEmpty().withMessage("Category cannot be empty"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedAccessory = await Accessory.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
      if (!updatedAccessory) {
        return res.status(404).json({ error: "Accessory not found" });
      }
      res.status(200).json({ message: "Accessory updated successfully", updatedAccessory });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// ✅ Delete an Accessory by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAccessory = await Accessory.findByIdAndDelete(req.params.id);
    if (!deletedAccessory) {
      return res.status(404).json({ error: "Accessory not found" });
    }
    res.status(200).json({ message: "Accessory deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Bulk Delete Accessories (Multiple IDs)
router.post("/bulk-delete", async (req, res) => {
  try {
    const { accessoryIds } = req.body;

    if (!Array.isArray(accessoryIds) || accessoryIds.length === 0) {
      return res.status(400).json({ error: "No accessories selected for deletion" });
    }

    const result = await Accessory.deleteMany({ _id: { $in: accessoryIds } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No accessories found to delete" });
    }

    res.status(200).json({ message: "Selected accessories deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
