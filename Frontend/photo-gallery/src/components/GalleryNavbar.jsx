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
      <nav className="bg-white shadow-md justify-center fixed h-screen w-48 top-0 z-50 py-4 pl-8 pt-12 grid grid-rows-3 gap-y-4">
        <div className="flex flex-col items-start px-6 space-y-6">
          {/* Left Section - Navigation Links */}
          <ul className="flex flex-col space-y-12 text-gray-800 font-medium ">
            <li>
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-orange-500">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/albums" className="hover:text-orange-500">
                Albums
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-500">
                Contact
              </Link>
            </li>
          </ul>

          {/* Logout Button at the bottom */}
          <div className="mt-auto pt-12">
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

export default GalleryNavbar;
