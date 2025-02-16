import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authTest from "../services/authTest"; // Ensure correct import

const GoogleAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    if (!authCode) {
      console.error("No auth code found.");
      navigate("/");
      return;
    }

    // Send the authorization code to backend for exchange
    authTest
      .exchangeAuthCode(authCode)
      .then(() => navigate("/gallery")) // Redirect to dashboard after login
      .catch(() => navigate("/login")); // Redirect home if login fails
  }, [navigate]);

  return <p>Logging in...</p>;
};

export default GoogleAuthHandler;
