import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useState } from "react";
import { User, Settings, LogOut, Users, Bell, HelpCircle } from "lucide-react";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    // Remove all authentication-related storage
    localStorage.clear();
    sessionStorage.clear();

    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50 py-2">
        <div className="container mx-auto flex items-center justify-between px-4 max-w-5xl">
          {/* Left Section - Navigation Links */}
          <ul className="flex space-x-4 text-gray-800 font-medium">
            <li>
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-500">
                Team
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-500">
                Contact
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/gallery" className="hover:text-orange-500">
                  Gallery
                </Link>
              </li>
            )}
          </ul>

          {/* Center Section - Logo */}
          <div className="mx-4">
            <img
              src="src/assets/photos/logo/logo.png"
              alt="Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Right Section - Profile or Login/Register */}
          <div className="relative flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  <LogOut className="h-5 w-5 mr-1" /> Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
