import React, { useState } from "react";
import "../App.css";

function Register({ setPage, formData, setFormData, handleRegister }) {
  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  
  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password) return "Password is required.";
    if (!strongPasswordRegex.test(password)) {
      return "Must be 8+ chars, include upper, lower, number & special char.";
    }
    return "";
  };

 
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Enter a valid email.";
    return "";
  };

 
  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile) return "Mobile number is required.";
    if (!mobileRegex.test(mobile)) return "Enter a valid 10-digit number.";
    return "";
  };

 
  const validateName = (name) => {
    if (!name) return "Full name is required.";
    return "";
  };

  const onRegister = (e) => {
    e.preventDefault();

  
    const newErrors = {
      name: validateName(formData.name),
      mobile: validateMobile(formData.mobile),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);


    const hasError = Object.values(newErrors).some((error) => error !== "");
    if (hasError) return;

 
    handleRegister();
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Create Account</h2>
        <p>Fill the details to register</p>
      </div>

      <form className="auth-form" onSubmit={onRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <input
          type="text"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={(e) =>
            setFormData({ ...formData, mobile: e.target.value })
          }
        />
        {errors.mobile && <p className="error-text">{errors.mobile}</p>}

        <input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit">Register</button>
      </form>

      <div className="auth-link" onClick={() => setPage("login")}>
        Already have an account? Login
      </div>
    </div>
  );
}

export default Register;
