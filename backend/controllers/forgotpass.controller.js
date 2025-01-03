const UserModel = require("../models/user.model");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Temporary OTP storage
let otps = {};

// Email Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "hospifyconnect@gmail.com",
        pass: "741258963Hospify",
    },
});

// Verify Email Controller
const verifymail = async (req, res) => {
    const { mail } = req.body;
    console.log(mail)
    try {
        const matchedUser = await UserModel.findOne({ mail: mail });
        console.log(matchedUser.mail)

        if (!matchedUser) {
            console.log("Not Found");
            return res.status(404).json({ success: false, message: "Email not found." });
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        otps[email] = otp;

        // Send OTP Email
        transporter.sendMail(
            {
                from: "hospifyconnect@gmail.com",
                to: email,
                subject: "Your OTP for Password Reset",
                text: `Your OTP is ${otp}`,
            },
            (error) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).json({ success: false, message: "Failed to send OTP." });
                }
                res.json({ success: true, message: "OTP sent to your email." });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// Verify OTP Controller
const verifyOTP = (req, res) => {
    const { email, otp } = req.body;

    if (otps[email] && otps[email] === otp) {
        delete otps[email]; // OTP is valid, remove it
        return res.json({ success: true, message: "OTP verified. Proceed to reset password." });
    }

    res.status(400).json({ success: false, message: "Invalid OTP." });
};

module.exports = {
    verifymail,
    verifyOTP,
};
