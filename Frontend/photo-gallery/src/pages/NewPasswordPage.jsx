import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const NewPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Function to extract query parameters from URL
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const query = useQuery();
    const token = query.get("token");

    try {
      const response = await axios.get(
        "http://localhost:9090/api/users/reset-password",
        {
          params: { token, newPassword: password },
        }
      );

      if (response.status === 200) {
        alert("Password changed successfully");
        navigate("/login");
      } else {
        alert("Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("An error occurred while changing the password");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Set a New Password</h1>
        <p>Please set a new password for your account.</p>
        <div>
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button
            onClick={handlePasswordChange}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Set Password
          </button>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="padlock_image_url"
            alt="Padlock"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <p>Secure your account with a strong password</p>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
