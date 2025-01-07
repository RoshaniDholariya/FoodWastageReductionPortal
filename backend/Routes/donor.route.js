const express = require('express');
const { registerDonor, verifyOTP, addDonorDetails, authenticate } = require('../controller/donor.controller.js');

const router = express.Router();

// Routes
router.post('/register', registerDonor);
router.post('/verify-otp', verifyOTP);
router.post('/add-details', authenticate, addDonorDetails);

module.exports = router;
