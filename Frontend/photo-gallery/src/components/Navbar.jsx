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
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
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
                <img
                  src={user.profilePic || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="h-10 w-10 rounded-full cursor-pointer border-2 border-gray-300 hover:border-blue-500"
                  onClick={toggleDropdown}
                />

                <button
                  onClick={handleLogout}
                  className="flex items-center bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  <LogOut className="h-5 w-5 mr-1" /> Logout
                </button>

                {isDropdownOpen && (
                  <div>
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border p-4">
                    <div className="flex items-center space-x-3 border-b pb-3 mb-3">
                      <img
                        src={user.profilePic || "https://via.placeholder.com/40"}
                        alt="Profile"
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{user.name || "John Doe"}</p>
                        <p className="text-sm text-gray-500">{user.email || "email@example.com"}</p>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      <li>
                        <Link to="/profile" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                          <User className="h-5 w-5 mr-2" /> View Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/settings" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                          <Settings className="h-5 w-5 mr-2" /> Settings
                        </Link>
                      </li>
                      <li>
                        <Link to="/notifications" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                          <Bell className="h-5 w-5 mr-2" /> Notifications
                        </Link>
                      </li>
                      <li>
                        <Link to="/team" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                          <Users className="h-5 w-5 mr-2" /> Team
                        </Link>
                      </li>
                      <li>
                        <Link to="/support" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                          <HelpCircle className="h-5 w-5 mr-2" /> Support
                        </Link>
                      </li>
                    </ul>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <LogOut className="h-5 w-5 mr-2" /> Sign Out
                      </button>
                  </div>
                  </div>
                )}
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
