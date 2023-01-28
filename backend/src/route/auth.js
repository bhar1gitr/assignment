const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../model/auth.js');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password ,address} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name: firstName + " " + lastName, phoneNumber,address, email, password: hashedPassword });
    await user.save();
    res.send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('Email not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }
    // req.session.user = user;
    res.send('Logged in successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

router.post('/generate-otp', async (req, res) => {
  try {
    User.findOne({ email: req.body.email })
      .exec((error, user) => {
        if (!user&&error) return res.status(400).json({
          message: "User Not Exist"
        });
      });
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);
    // req.session.otp = otp;
    // Send OTP via email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'singhdivyanshsingh786@gmail.com',
        pass: 'sbiskdfzjbigpngx'
      }
    });
    const mailOptions = {
      from: 'singhdivyanshsingh786@gmail.com',
      to: email,
      subject: 'OTP for password reset',
      text: `Your OTP is: ${otp}`
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({otp, message: 'OTP sent successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).send({error});
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp || otp !== req.body.trueOtp) {
      return res.status(401).send('Invalid OTP');
    }
    res.status(200).send('OTP verified');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying OTP');
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    User.findOne({ email: req.body.email })
      .exec((error, user) => {
        if (!user&&error) return res.status(400).json({
          message: "User Not Exist"
        });
      });
    // if (!req.session.otp) {
    //   return res.status(401).send('OTP not verified');
    // }
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({email: req.body.email}, { password: hashedPassword });
    // req.session.otp = null;
    res.send('Password reset successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error resetting password');
  }
});

module.exports = router;