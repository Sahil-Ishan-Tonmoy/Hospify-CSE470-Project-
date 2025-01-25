const express = require("express");
const { verifymail, verifyOTP } = require("../controllers/forgotpass.controller");

const router = express.Router();

// Forgot Password Routes
router.post("/forgot-password", verifymail); // Verify email and send OTP
router.post("/verify-otp", verifyOTP); // Verify OTP

module.exports = router;
