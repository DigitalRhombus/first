const express = require("express")
const router = express.Router()
const User = require("../model/User")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const JWT_Secret = "NikhilGehlot"







module.exports = router