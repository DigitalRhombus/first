const express = require("express");
const router = express.Router();
const User = require("../../model/User");
const Order = require("../../model/Order");
const Accessory = require("../../model/Accessories");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserFromToken } = require("../../lib/User");
const { faker } = require("@faker-js/faker");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const axios = require("axios");

const JWT_SECRET = "Jewellery0To100xSales";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:8001";

// PayPal sandbox credentials (replace with your actual sandbox credentials)
const PAYPAL_CLIENT_ID = "AQRKTjhM3jpx4BSGtQfmClkDaMyA05-QKxjlXAh62g_B9NJM7pG20Uu1dmEhvPzXvjV0swMCLg-XoyJG";
const PAYPAL_CLIENT_SECRET = "EAKqtLT3oCJSrFfIBx-X-vIcjidXeYSyHUVfuVirfhQhsQE77DpARLEOCnGDSr7pKIwUUQP6WiF3Iy6j";
const PAYPAL_API = "https://api-m.sandbox.paypal.com"; // Sandbox API URL

// Function to generate PayPal access token
const generateAccessToken = async () => {
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
    const response = await axios.post(
      `${PAYPAL_API}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error generating PayPal access token:", error.response ? error.response.data : error.message);
    throw new Error("Failed to authenticate with PayPal");
  }
};

router.get("/", (req, res) => {
  res.send("User Route is Up and Running");
});

// ✅ Get All Users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to generate a random name
function generateRandomName() {
  return `${faker.person.firstName()} ${faker.person.lastName()}`;
}

// User Login
router.post("/login", [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").exists().withMessage("Password is required"),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.thirdPartyLogin) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }

    const authToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, authToken, result: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// User Registration
router.post("/register", [
  body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters"),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: errors.array() });
  }

  let { name, email, password, mobile, age, deliveryAddress, addresses } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, error: "Email already exists" });
    }
    addresses = addresses || [];
    deliveryAddress = deliveryAddress || [{
      fullName: "Default User",
      phone: "0000000000",
      addressLine1: "Default Address",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      postalCode: "400001",
    }];

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      age,
      email,
      password: hashedPassword,
      addresses,
      deliveryAddress,
      mobile,
    });
    const savedUser = await newUser.save();
    const authToken = jwt.sign({ userId: savedUser._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ success: true, authToken, result: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Update User Profile
router.put("/update", async (req, res) => {
  const { name, age, mobile, addresses, deliveryAddress, token } = req.body;
  if (!token) return res.status(401).json({ success: false, error: "Unauthorized" });

  const result = await getUserFromToken(token);
  if (!result.success) return res.status(403).json({ success: false, error: result.error });
  try {
    const updatedUser = await User.findByIdAndUpdate(
      result.result._id,
      { $set: { name, age, mobile, addresses, deliveryAddress } },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ success: false, error: "User not found" });

    res.json({ success: true, result: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Third-Party Login
router.post("/thirdpartylogin", async (req, res) => {
  let { email, name, age, mobile, deliveryAddress, addresses } = req.body;
  if (!email) return res.status(400).json({ success: false, error: "Email is required" });

  try {
    let user = await User.findOne({ email });
    addresses = addresses || [];

    if (!user) {
      user = new User({
        name: name || generateRandomName(),
        email,
        thirdPartyLogin: true,
        age,
        mobile,
        addresses,
        deliveryAddress,
      });
      await user.save();
    }

    const authToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, authToken, result: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Validate Token & Get User Data
router.post("/tokentodata", async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ success: false, error: "Token is required" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    res.json({ success: true, result: user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create Order with PayPal Payment Verification
router.post("/web2", async (req, res) => {
  try {
    // Extract payment details from request body
    const { userId, items, totalAmount, deliveryAddress, orderId, captureId, status, amount, currency, payer } = req.body;

    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Get PayPal access token
    const accessToken = await generateAccessToken();

    // Verify the capture with PayPal using the v2 API
    const response = await axios.get(`${PAYPAL_API}/v2/payments/captures/${captureId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const paymentDetails = response.data;

    // Verify payment status and details
    if (paymentDetails.status !== "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
        details: paymentDetails,
      });
    }

    if (paymentDetails.amount.value !== amount.toString() || paymentDetails.amount.currency_code !== currency) {
      return res.status(400).json({
        success: false,
        message: "Payment amount or currency mismatch",
      });
    }

    // Create the order in the database
    const order = new Order({
      userId,
      items,
      totalAmount: parseFloat(totalAmount),
      deliveryAddress,
      status: "Processing", // Payment is successful, so set status to Processing
      transactionId: captureId, // Use captureId as the transaction ID
      paymentMethod: "paypal",
    });

    const savedOrder = await order.save();

    // Clear the user's cart
    user.cart = [];
    await user.save();

    // Send email notification
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    const accessTokenEmail = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessTokenEmail.token,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Castle Jewel - Order Placed Successfully",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #000;">Castle Jewel</h2>
          <h1 style="color: #28a745;">Order Placed Successfully</h1>
          <p>Dear ${user.name},</p>
          <p>Thank you for shopping with <strong>Castle Jewel</strong>.</p>
          <p>Your order has been <strong>successfully placed</strong> and payment has been confirmed.</p>
          <div style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Order Details:</strong></p>
            <ul style="list-style: none; padding-left: 0;">
              <li><strong>Order ID:</strong> ${savedOrder._id}</li>
              <li><strong>Amount:</strong> $${totalAmount}</li>
              <li><strong>Transaction ID:</strong> ${captureId}</li>
              <li><strong>Order Date:</strong> ${new Date().toLocaleString()}</li>
            </ul>
          </div>
          <p>Your payment has been processed successfully via PayPal.</p>
          <p>Thank you,<br> <strong>Castle Jewel Team</strong></p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error("Error while sending email:", err);
      else console.log("Email sent successfully:", info.response);
    });

    // Return success response
    const responseData = {
      success: true,
      message: "Payment verified and order created successfully",
      orderId: orderId,
      captureId: captureId,
      paypalStatus: paymentDetails.status,
      amount: paymentDetails.amount.value,
      currency: paymentDetails.amount.currency_code,
      payerEmail: payer.email_address,
      timestamp: new Date().toISOString(),
      order: savedOrder,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Payment verification error:", error.response ? error.response.data : error.message);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.response ? error.response.data : error.message,
    });
  }
});

// Create Order (for non-PayPal payments like COD, UPI, Stripe)
router.post("/create-order", async (req, res) => {
  const { userId, items, totalAmount, deliveryAddress, transactionId, paymentMethod, stripePaymentIntentId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    if (paymentMethod === "upi" && !transactionId) {
      return res.status(400).json({ success: false, error: "Transaction ID is required for UPI payments" });
    }
    if (paymentMethod === "stripe" && !stripePaymentIntentId) {
      return res.status(400).json({ success: false, error: "Stripe Payment Intent ID is required for Stripe payments" });
    }

    let orderData = {
      userId,
      items,
      totalAmount: parseFloat(totalAmount),
      deliveryAddress,
      paymentMethod,
      status: paymentMethod === "upi" ? "Pending" : paymentMethod === "cod" ? "Pending" : "Processing",
    };

    if (paymentMethod === "upi" || paymentMethod === "cod") {
      orderData.transactionId = transactionId || "N/A";
    } else if (paymentMethod === "stripe") {
      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
      const paymentIntent = await stripe.paymentIntents.retrieve(stripePaymentIntentId);
      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({ success: false, error: "Stripe payment not completed" });
      }
      orderData.transactionId = stripePaymentIntentId;
    }

    const order = new Order(orderData);
    const savedOrder = await order.save();

    // Clear the user's cart if payment is successful (not for UPI or COD until verified)
    if (paymentMethod !== "upi" && paymentMethod !== "cod") {
      user.cart = [];
      await user.save();
    }

    // Send email notification
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Castle Jewel - Order Placed Successfully",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #000;">Castle Jewel</h2>
          <h1 style="color: #28a745;">Order Placed Successfully</h1>
          <p>Dear ${user.name},</p>
          <p>Thank you for shopping with <strong>Castle Jewel</strong>.</p>
          <p>Your order has been <strong>successfully placed</strong> ${
            paymentMethod === "upi" ? "and is awaiting verification" : paymentMethod === "cod" ? "and will be paid on delivery" : "and has been confirmed"
          }.</p>
          <div style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Order Details:</strong></p>
            <ul style="list-style: none; padding-left: 0;">
              <li><strong>Order ID:</strong> ${savedOrder._id}</li>
              <li><strong>Amount:</strong> $${totalAmount}</li>
              <li><strong>Transaction ID:</strong> ${orderData.transactionId}</li>
              <li><strong>Order Date:</strong> ${new Date().toLocaleString()}</li>
            </ul>
          </div>
          <p>${
            paymentMethod === "upi" ? "We will notify you once your payment is verified." : paymentMethod === "cod" ? "Payment will be collected on delivery." : "Your payment has been processed successfully."
          }</p>
          <p>Thank you,<br> <strong>Castle Jewel Team</strong></p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error("Error while sending email:", err);
      else console.log("Email sent successfully:", info.response);
    });

    res.json({ success: true, order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// New Endpoint: Get Orders by User ID
router.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    // Fetch orders for the user and populate accessory details
    const orders = await Order.find({ userId }).populate("items.accessoryId");

    if (!orders || orders.length === 0) {
      return res.status(200).json({ success: true, message: "No orders found for this user", orders: [] });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Get All Orders
router.get("/orders/all", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .lean();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;