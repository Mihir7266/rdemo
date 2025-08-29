import React from "react";

function Dashboard({ setPage, formData = {} }) {   // ✅ default value
  return (
    <div className="auth-container dashboard">
      <h1>Welcome, {formData.name || "User"} 🎉</h1>
      <p>You have successfully logged in.</p>
      <button onClick={() => setPage("login")}>Logout</button>
    </div>
  );
}

export default Dashboard;
