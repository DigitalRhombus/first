require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8001;

// MongoDB Connection
const url = process.env.MongoConnection;
mongoose
  .connect(url, {
    serverSelectionTimeoutMS: 20000,
  })
  .then(() => console.log("✅ Connected to the Database"))
  .catch((e) => console.error("❌ Database connection error:", e.message));

// Middleware
app.use(express.json());
const allowedOrigins = [
  "https://jewellery-client-nikhil.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy error: Not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  helmet({
    crossOriginOpenerPolicy: { policy: "unsafe-none" },
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Routes
const jewelleryRoute = require("./routes/jewellery.route");
const userRoutes = require("./routes/User/index");
const accessoriesRoutes = require("./routes/Accessories/Accessories");
const cartRoutes = require("./routes/Cart/Cart");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use Routes
app.use("/api/products", jewelleryRoute);
app.use("/api/user/", userRoutes);
app.use("/api/accessories/", accessoriesRoutes);
app.use("/api/cart/", cartRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});