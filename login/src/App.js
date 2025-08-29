import React, { useState } from "react";
import emailjs from "emailjs-com";
import Login from "./components/Login";
import Register from "./components/Register";
import OTPVerification from "./components/OTPVerification";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  // Register
  const handleRegister = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);

    const expiryTime = new Date(Date.now() + 15 * 60000).toLocaleString();

    const templateParams = {
      email: formData.email,
      passcode: otpCode,
      time: expiryTime,
    };

    emailjs
      .send(
        "service_ifdb2ao", // Service ID
        "template_hyx6a54", // Template ID
        templateParams,
        "T0UbnhT1ITzZotpOi" // Public Key
      )
      .then(() => {
        alert("OTP sent to your email!");
        setPage("otp");
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        alert("Failed to send OTP. Check console.");
      });
  };

  // Resend OTP
  const resendOtp = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);

    const expiryTime = new Date(Date.now() + 15 * 60000).toLocaleString();

    const templateParams = {
      email: formData.email,
      passcode: otpCode,
      time: expiryTime,
    };

    emailjs
      .send("service_ifdb2ao", "template_hyx6a54", templateParams, "T0UbnhT1ITzZotpOi")
      .then(() => {
        alert("🔄 A new OTP has been sent to your email!");
      })
      .catch((err) => {
        console.error("EmailJS Resend Error:", err);
        alert("❌ Failed to resend OTP. Try again.");
      });
  };

  // OTP Verify
  const handleOtpVerify = () => {
    if (enteredOtp === generatedOtp) {
      alert("OTP Verified! Please login.");
      setRegisteredUser({ email: formData.email, password: formData.password });
      setPage("login");
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  // Login
  const handleLogin = () => {
    if (
      registeredUser &&
      formData.email === registeredUser.email &&
      formData.password === registeredUser.password
    ) {
      setIsLoggedIn(true);
      setPage("dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="app-container">
      {page === "login" && (
        <Login
          setPage={setPage}
          formData={formData}
          setFormData={setFormData}
          handleLogin={handleLogin}
        />
      )}

      {page === "register" && (
        <Register
          setPage={setPage}
          formData={formData}
          setFormData={setFormData}
          handleRegister={handleRegister}
        />
      )}

      {page === "otp" && (
        <OTPVerification
          enteredOtp={enteredOtp}
          setEnteredOtp={setEnteredOtp}
          handleOtpVerify={handleOtpVerify}
          resendOtp={resendOtp}
          formData={formData}
        />
      )}

      {page === "dashboard" && isLoggedIn && (
        <Dashboard setPage={setPage} formData={formData} />
      )}
    </div>
  );
}

export default App;
