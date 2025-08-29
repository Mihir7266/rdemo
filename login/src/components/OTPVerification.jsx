import React from "react";
import "./OTPVerification.css";

function OTPVerification({ enteredOtp, setEnteredOtp, handleOtpVerify, resendOtp, formData }) {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <img src="/logo192.png" alt="Company Logo" />
        <h2>OTP Verification</h2>
        <p>
          Enter the OTP sent to <strong>{formData?.email || "your email"}</strong>
        </p>
      </div>

      <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleOtpVerify(); }}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={enteredOtp}
          onChange={(e) => setEnteredOtp(e.target.value)}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>

      <div className="auth-link" onClick={resendOtp}>
        🔄 Resend OTP
      </div>

      <div className="auth-link" onClick={() => window.location.reload()}>
        Back to Login
      </div>
    </div>
  );
}

export default OTPVerification;
