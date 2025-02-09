import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Footer from "./components/Footer.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import NewHomePage from "./pages/NewHomePage.jsx";
import VerifyPage from "./pages/VerifyPage.jsx";
import NewPasswordPage from "./pages/NewPasswordPage.jsx";
import ResetEmail from "./pages/ResetEmail.jsx";
import AlbumPage from "./pages/AlbumPage.jsx";
import AlbumDetailPage from "./pages/AlbumDetailPage.jsx";
import GalleryNavbar from "./components/GalleryNavbar.jsx"; 
import Profile from "./pages/Profile.jsx";

const App = () => {
  const user = useSelector((state) => state.auth.user); // Check if user is logged in
  const location = useLocation(); // Get current route

  // Check if the current path is related to the gallery (you can customize this further if needed)
  const isGalleryPage = location.pathname.startsWith("/gallery") ||
    location.pathname.startsWith("/albums") ||
    location.pathname.startsWith("/profile");

  return (
    <>
      {/* Conditionally render Navbar or GalleryNavbar based on the route */}
      {isGalleryPage ? <GalleryNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<NewHomePage />} />

        {/* Protect Gallery Route */}
        <Route
          path="/gallery"
          element={user ? <GalleryPage /> : <Navigate to="/login" />}
        />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/albums" element={<AlbumPage />} />
        <Route path="/album/:albumId" element={<AlbumDetailPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-email" element={<ResetEmail />} />
        <Route path="/set-Password" element={<NewPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      
      <Footer />
      
    </>
  );
};

export default App;
