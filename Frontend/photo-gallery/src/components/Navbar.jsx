import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
// import logo from "../assets/logo.jpg";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "/login";
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
            {/* Conditionally render Gallery link if user is logged in */}
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

          {/* Right Section - Register/Login Button */}
          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition ml-2"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
