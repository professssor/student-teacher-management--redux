import React from "react";
import { Link } from "react-router-dom";

const buttonStyle = {
  padding: "10px 20px",
  margin: "0 10px",
  backgroundColor: "#007BFF",
  color: "white",
  textDecoration: "none",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const Dashboard = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <nav>
        <Link to="/student" style={buttonStyle}>
          Student Details
        </Link>
        <Link to="/teacher" style={buttonStyle}>
          Teacher Details
        </Link>
        <Link to="/classview" style={buttonStyle}>
          Class View
        </Link>
        <Link to="/schoolView" style={buttonStyle}>
          School View
        </Link>
      </nav>
    </div>
  );
};

export default Dashboard;
