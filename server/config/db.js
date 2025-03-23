const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();
  
// Connect to MongoDB
const ConnecDB = async (req, res) => {
try { 
    mongoose.connect(process.env.MongoConnection);
    console.log("Connected to MongoDB");
    
} catch (error) {
    console.log("Failed to connect to MongoDB");
}}

// Export the function

module.exports = ConnecDB;