import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar.jsx";
import Admin from "./pages/Admin.jsx"; 
import AdminUserProfile from "./pages/AdminUserProfile.jsx"; // Import the new page
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
import { Toaster } from "./components/ui/toaster.jsx";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user")); 
  const location = useLocation(); 
  const isAdmin = user?.role?.roleName === "ADMIN"; 

  const isGalleryPage =
    location.pathname.startsWith("/gallery") ||
    location.pathname.startsWith("/albums") ||
    location.pathname.startsWith("/profile");

  return (
    <>
      {isGalleryPage ? <GalleryNavbar /> : <Navbar />}
      <Toaster />
      <Routes>
        <Route path="/" element={<NewHomePage />} />
        <Route path="/gallery" element={user ? <GalleryPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/albums" element={<AlbumPage />} />
        <Route path="/album/:albumId" element={<AlbumDetailPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-email" element={<ResetEmail />} />
        <Route path="/set-password" element={<NewPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/" />} />
        <Route path="/admin/user/:userId" element={isAdmin ? <AdminUserProfile /> : <Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;

