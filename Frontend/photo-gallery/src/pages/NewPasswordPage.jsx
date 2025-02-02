import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import rectangleImage from "../assets/photos/resetPassword/Rectangle.jpg";

const NewPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Function to extract query parameters from URL
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl flex bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 p-6">
          <h2 className="mt-4 text-2xl font-bold mb-4">Set a New Password</h2>
          <p className="mt-2 text-gray-600">
            Please set a new password for your account.
          </p>
          <form onSubmit={handlePasswordChange} className="mt-6 mb-2">
            <div className="mb-4">
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Set Password
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-gray-50 flex items-center justify-center p-6">
          <img
            src={rectangleImage} // Replace with the correct image URL
            alt="Padlock"
            className="w-3/4"
          />
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
