const jwt = require('jsonwebtoken');
require("dotenv").config()
 function  generateAccessToken(user) {
     return  jwt.sign( user,process.env.JWT_SECRET);
}

function generateRefreshToken(user) {
    return jwt.sign(user,process.env.JWT_SECRET);
}

module.exports = { generateAccessToken, generateRefreshToken };
