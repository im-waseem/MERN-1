const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userschema');
const router = express.Router();
const authenticate = require("../middleware/authenticate")

router.post('/register', async (req, res) => {
  const { fname, email, password, cpassword } = req.body;

  if (!fname || !email || !password || !cpassword) {
    return res.status(422).json({ error: 'Fill all the details' });
  }

  try {
    const preuser = await User.findOne({ email: email });

    if (preuser) {
      return res.status(422).json({ error: 'This email is already in use' });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: 'Password and Confirm Password do not match' });
    } else {
      const finalUser = new User({
        fname,
        email,
        password,
        cpassword,
      });

      await finalUser.save();
      return res.status(201).json({ status: 201, message: 'User registered successfully' });
    }
  } catch (error) {
    console.error('Error in registration:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: 'Fill all the details' });
  }

  try {
    const userValid = await User.findOne({ email: email });

    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        return res.status(422).json({ error: 'Invalid details' });
      } else {
        const token = await userValid.generateAuthToken();
        console.log(token);
        return res
          .cookie('usercookie', token, {
            expires: new Date(Date.now() + 9000000),
            httpOnly: true,
          })
          .status(201)
          .json({ status: 201, user: userValid, token });
      }
    } else {
      return res.status(422).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});




// user valid
router.get("/validuser", authenticate, async (req, res) => {
  try {
    const ValidUserOne = await userdb.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, ValidUserOne });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});




module.exports = router;
