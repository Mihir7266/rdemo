import React from "react";
import "./AlertBox.css";

function AlertBox({ message, type = "info", onClose }) {
  return (
    <div className={`custom-alert ${type}`}>
      <span className="alert-message">{message}</span>
      <button className="alert-close" onClick={onClose}>×</button>
    </div>
  );
}

export default AlertBox;
