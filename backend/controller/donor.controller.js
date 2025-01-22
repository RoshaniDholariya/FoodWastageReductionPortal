const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Helper function to generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Register user with email and password
exports.registerDonor = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const donor = await prisma.donor.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generate and store OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes
    await prisma.donor.update({
      where: { id: donor.id },
      data: { otp, otpExpiry },
    });

    // Send OTP
    await transporter.sendMail({
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 15 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering donor', error: error.message });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const donor = await prisma.donor.findUnique({ where: { email } });

    if (!donor || donor.otp !== otp || new Date() > donor.otpExpiry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    await prisma.donor.update({
      where: { email },
      data: { isVerified: true, otp: null, otpExpiry: null },
    });

    const token = jwt.sign({ id: donor.id, email: donor.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'OTP verified', token });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
};

// Add donor details
exports.addDonorDetails = async (req, res) => {
  const { name, address, city, state, pincode, phone, photo, donorType, restaurantName } = req.body;
  const donorId = req.user.id;

  try {
    const donor = await prisma.donor.update({
      where: { id: donorId },
      data: {
        name,
        address,
        city,
        state,
        pincode,
        phone,
        photo,
        donorType,
        restaurantName: donorType === 'RESTAURANT' ? restaurantName : null,
      },
    });

    res.status(200).json({ message: 'Donor details added successfully', donor });
  } catch (error) {
    res.status(500).json({ message: 'Error adding donor details', error: error.message });
  }
};

// Middleware for authentication
exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  console.log("Received Token:", token); // Debugging line

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Extract the actual token
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token Error:", error.message); // Log error details
    res.status(401).json({ message: 'Invalid Token' });
  }
};
