import React from "react";
import "./Dashboard.css";

function Dashboard({ setPage, formData = {} }) {
  return (
    <div className="modern-dashboard">
      {/* Top Navbar */}
      <header className="topbar">
        <h2>📊 Dashboard</h2>
        <div className="topbar-right">
          <span>{formData.name || "User"}</span>
          <button className="logout-btn" onClick={() => setPage("login")}>
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Welcome Section */}
        <section className="welcome">
          <h1>Welcome, {formData.name || "User"} 👋</h1>
          <p>Glad to see you back! Stay connected and reach out anytime.</p>
        </section>

        {/* Social Links */}
        <section className="social-links">
          <h3>Connect with Me</h3>
          <div className="social-buttons">
            <a
              href="https://github.com/Mihir7266"
              target="_blank"
              rel="noopener noreferrer"
            >
              🐙 GitHub
            </a>
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
            >
              💼 LinkedIn
            </a>
            <a
              href="https://wa.me/919409431239"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
