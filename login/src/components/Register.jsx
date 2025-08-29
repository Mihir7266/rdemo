import React from "react";

function Register({ setPage, formData, setFormData, handleRegister }) {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Create Account</h2>
        <p>Join us today and get started!</p>
      </div>

      <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
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
        <button type="submit">Register</button>
      </form>

      <div className="auth-link" onClick={() => setPage("login")}>
        Already have an account? Login
      </div>
    </div>
  );
}

export default Register;
