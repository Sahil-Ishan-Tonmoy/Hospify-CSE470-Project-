import React, { useState } from "react";

const OtpVerification = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = new URLSearchParams(window.location.search).get("email");
        try {
            const response = await fetch("/api/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message);
                window.location.href = "/reset-password";
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="otp-verification-container">
            <h2>OTP Verification</h2>
            <form onSubmit={handleSubmit}>
                <label>OTP</label>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <button type="submit">Verify</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
};

export default OtpVerification;
