import React, { useState } from "react";
import "./Login.css";

function Login({ setPage, handleLogin, formData, setFormData }) {
  const [errors, setErrors] = useState({ email: false, password: false });

  // Validate a single field while typing
  const validateField = (name, value) => {
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === "", // true = error
    }));
  };

  // Validate on login button click
  const validateAndLogin = (e) => {
    e.preventDefault();

    const newErrors = {
      email: formData.email.trim() === "",
      password: formData.password.trim() === "",
    };

    setErrors(newErrors); // <-- force update

    if (!newErrors.email && !newErrors.password) {
      handleLogin();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>My Company</h2>
        <p>Welcome back! Please log in</p>
      </div>

      <form className="auth-form" onSubmit={validateAndLogin}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => {
            const value = e.target.value;
            setFormData({ ...formData, email: value });
            validateField("email", value);
          }}
          className={errors.email ? "error-input" : ""}
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => {
            const value = e.target.value;
            setFormData({ ...formData, password: value });
            validateField("password", value);
          }}
          className={errors.password ? "error-input" : ""}
        />

        <button type="submit">Login</button>
      </form>

      <div className="auth-link" onClick={() => setPage("register")}>
        Don’t have an account? Register
      </div>
    </div>
  );
}

export default Login;
