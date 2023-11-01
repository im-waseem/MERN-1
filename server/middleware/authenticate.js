const jwt = require('jsonwebtoken');
const userdb = require("../models/userschema");
const keysecret = "waseemakramwaseemakramwaseemakramsumaira";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ status: 401, message: "Unauthorized: No token provided" });
    }

    const verifytoken = jwt.verify(token, keysecret);
    const rootUser = await userdb.findOne({ _id: verifytoken._id });

    if (!rootUser) {
      return res.status(401).json({ status: 401, message: "Unauthorized: User not found" });
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: "Unauthorized: Invalid token or other error" });
  }
};

module.exports = authenticate;
