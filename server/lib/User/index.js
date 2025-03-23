const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require('../../model/User');
const getUserFromToken = async (token) => {
  try {
    let decode = jwt.decode(token);
    console.log("token - ", token);
    console.log("decode-", decode);

    if (!decode || !decode.userId) {
      return { success: false, error: "Invalid token" };
    }

    let id = decode.userId;
    console.log(id);

    let result = await User.findById(id);
    if (!result) {
      return { success: false, error: "User not found" };
    }

    return { success: true, result };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

module.exports = {getUserFromToken};
