import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import axios from "axios";

// Get the backend URL from environment variables
const BACKEND_URL =
  import.meta.env.VITE_BACK_END_URL || "http://localhost:9090/api/";

const VerifyPage = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Replaces useHistory()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token"); // Extract token from URL

    if (token) {
      verifyEmail(token);
    } else {
      setMessage("Invalid verification link.");
    }
  }, []);

  const verifyEmail = async (token) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}users/verify?token=${token}`
      );

      setMessage(response.data.message || "Verification successful!");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage("Verification failed: Invalid or expired token.");
    }
  };

  return (
    <div>
      <h3>{message}</h3>
    </div>
  );
};

export default VerifyPage;
