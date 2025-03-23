
const express = require("express");
const Accessory = require("../../model/Accessories");
const router = express.Router();
const User = require("../../model/User");

// Test Route
router.get("/", (req, res) => {
  res.send("Cart Route is Up and Running");
});



// Add to Cart
router.post("/add", async (req, res) => {
    try {
        const { userId, accessoryId, quantity } = req.body;
        const user = await User.findById(userId);
        console.log("-- - ",userId)
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const existingItem = user.cart.find(item => item.accessoryId.toString() === accessoryId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ accessoryId, quantity });
        }
        await user.save();
        res.json({ message: "Item added to cart", cart: user.cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Cart
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate("cart.accessoryId");
        if (!user) return res.status(404).json({ message: "User not found" });

        // Filter out cart entries where accessoryId is null or undefined
        user.cart = user.cart.filter(item => item.accessoryId !== null && item.accessoryId !== undefined);

        // Optionally, save the updated user document back to the database
        await user.save();

        res.json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove from Cart
router.post("/remove", async (req, res) => {
    try {
        const { userId, accessoryId, decreaseBy } = req.body; // `decreaseBy` determines the quantity reduction
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const itemIndex = user.cart.findIndex(item => item.accessoryId.toString() === accessoryId);
        if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });

        // Reduce quantity or remove if quantity becomes zero
        if (user.cart[itemIndex].quantity > decreaseBy) {
            user.cart[itemIndex].quantity -= decreaseBy;
        } else {
            user.cart.splice(itemIndex, 1);
        }

        await user.save();
        res.json({ message: "Cart updated", cart: user.cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove Specific Item from Cart
router.post("/remove", async (req, res) => {
    try {
      const { userId, accessoryId, decreaseBy } = req.body;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const itemIndex = user.cart.findIndex((item) => item.accessoryId.toString() === accessoryId);
      if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });
  
      if (user.cart[itemIndex].quantity > decreaseBy) {
        user.cart[itemIndex].quantity -= decreaseBy;
      } else {
        user.cart.splice(itemIndex, 1); 
      }
  
      await user.save();
      res.json({ message: "Cart updated", cart: user.cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Clear Entire Cart
  router.delete("/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(404).json({ success: false, error: "User not found" });
  
      user.cart = [];
      await user.save();
  
      res.status(200).json({ success: true, message: "Cart cleared successfully" });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });
  
module.exports = router;

