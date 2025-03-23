const mongoose  = require("mongoose")
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    thirdPartyLogin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    mobile: { type: String },
    addresses: [
        {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
            city: { type: String, required: true },
            state: { 
                type: String, 
                required: true,
                enum: [
                     // India states
                    "Maharashtra", "Gujarat", "Punjab",
                    // Canada provinces
                    "Alberta", "British Columbia", "Manitoba", "New Brunswick", 
                    "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island",
                    "Quebec", "Saskatchewan" 
                ] 
            },
            country: { 
                type: String, 
                enum: ["India", "Canada"], 
                required: true, 
                default: "India" 
            },
            postalCode: { type: String, required: true },
            
        }
    ],
    cart: [{
        accessoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Accessory" },
        quantity: { type: Number, default: 1 }
    }],
    deliveryAddress: [
        {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
            city: { type: String, required: true },
            state: { 
                type: String, 
                required: true,
                enum: [
                     // India states
                    "Maharashtra", "Gujarat", "Punjab",
                    // Canada provinces
                    "Alberta", "British Columbia", "Manitoba", "New Brunswick", 
                    "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island",
                    "Quebec", "Saskatchewan" 
                ] 
            },
            country: { 
                type: String, 
                enum: ["India", "Canada"], 
                required: true, 
                default: "India" 
            },
            postalCode: { type: String, required: true },
            
        }
    ]
});







module.exports = mongoose.model("User",userSchema)