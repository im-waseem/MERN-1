require('dotenv').config(); // Load environment variables from .env

const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");

const keysecret = process.env.KEY_SECRET; // Use the environment variable

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        const verifytoken = jwt.verify(token, keysecret);

        const rootUser = await userdb.findOne({ _id: verifytoken._id });

        if (!rootUser) {
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    } catch (error) {
        res.status(401).json({ status: 401, message: "Unauthorized, no token provided" });
    }
}

module.exports = authenticate;
