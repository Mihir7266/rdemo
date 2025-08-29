import React, { useRef } from "react";
import "./OTPVerification.css";

function OTPVerification({ enteredOtp, setEnteredOtp, handleOtpVerify, resendOtp, formData }) {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // allow only digits
    const otpArray = enteredOtp.split("");

    otpArray[index] = value;
    const newOtp = otpArray.join("");
    setEnteredOtp(newOtp);

    // Auto move to next box if digit entered
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !enteredOtp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>OTP Verification</h2>
        <p>
          Enter the OTP sent to{" "}
          <strong>{formData?.email || formData?.mobile || "your contact"}</strong>
        </p>
      </div>

      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleOtpVerify();
        }}
      >
        <div className="otp-boxes">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={enteredOtp[index] || ""}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="otp-input"
              required
            />
          ))}
        </div>
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
