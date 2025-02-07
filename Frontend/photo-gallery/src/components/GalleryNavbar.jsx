import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const GalleryNavbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="relative">
      <nav className="bg-black text-white fixed h-screen w-64 top-0 z-50 py-4 pl-8 flex flex-col justify-between">
        <div className="flex flex-col items-start space-y-6">
          {/* Left Section - Navigation Links */}
          <ul className="flex flex-col space-y-4 text-gray-300 font-medium">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-white">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/albums" className="hover:text-white">
                Albums
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout Button at the bottom */}
        <div className="mt-auto">
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
      </nav>
    </div>
  );
};

export default GalleryNavbar;
