import React from "react";
import "./Login.css"

function Login({ setPage, handleLogin, formData, setFormData }) {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>My Company</h2>
        <p>Welcome back! Please log in</p>
      </div>

      <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
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
