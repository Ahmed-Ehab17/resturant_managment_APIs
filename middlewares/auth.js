require("dotenv").config();
const jwt = require ('jsonwebtoken')
const httpStatusText = require("../utils/httpStatusText");


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ status: httpStatusText.ERROR, message: 'Access Denied. No token provided' });
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }catch (err) {
        res.status(400).json({ status: httpStatusText.ERROR, message: 'Invalid token' });
    }
}

module.exports = verifyToken;