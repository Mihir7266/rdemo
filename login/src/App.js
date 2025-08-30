import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import Login from "./components/Login";
import Register from "./components/Register";
import OTPVerification from "./components/OTPVerification";
import Dashboard from "./components/Dashboard";
import AlertBox from "./components/AlertBox";
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
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  // On refresh -> Always go to login page
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (storedUser) {
      setFormData((prev) => ({
        ...prev,
        email: storedUser.email,
        name: storedUser.name,
        mobile: storedUser.mobile,
      }));
    }

    setIsLoggedIn(false);
    setPage("login");
    localStorage.removeItem("isLoggedIn");
  }, []);

  // Custom Alert
  const showAlert = (message, type = "info") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Register
  const handleRegister = () => {
    if (!formData.name || !formData.mobile || !formData.email || !formData.password) {
      showAlert("Please fill all fields before registering.", "error");
      return;
    }

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
        showAlert("OTP sent to your email!", "success");
        setPage("otp");
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        showAlert("Failed to send OTP. Try again.", "error");
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
        showAlert("A new OTP has been sent to your email!", "info");
      })
      .catch((err) => {
        console.error("EmailJS Resend Error:", err);
        showAlert("Failed to resend OTP. Try again.", "error");
      });
  };

  // OTP Verify
  const handleOtpVerify = () => {
    if (enteredOtp === generatedOtp) {
      showAlert("OTP Verified! Please login.", "success");

      localStorage.setItem(
        "registeredUser",
        JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          password: formData.password,
        })
      );

      setPage("login");
    } else {
      showAlert("Invalid OTP. Try again.", "error");
    }
  };

  // Login
  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
      storedUser &&
      formData.email === storedUser.email &&
      formData.password === storedUser.password
    ) {
      setIsLoggedIn(true);
      setPage("dashboard");
      localStorage.setItem("isLoggedIn", "true");

      showAlert(`Welcome back, ${storedUser.name}! 🎉`, "success");
    } else {
      showAlert("Invalid email or password!", "error");
    }
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage("login");
    localStorage.removeItem("isLoggedIn");
    showAlert("You have logged out.", "info");
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
        <Dashboard
          setPage={setPage}
          formData={formData}
          handleLogout={handleLogout}
        />
      )}

      {/* Global Alert Box */}
      {alert.show && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ show: false })}
        />
      )}
    </div>
  );
}

export default App;
