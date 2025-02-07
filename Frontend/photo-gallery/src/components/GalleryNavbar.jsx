import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { IoIosArrowDropright } from "react-icons/io";

const GalleryNavbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };
  
  // Default Profile picture
  const defaultProfilePic = "src/assets/photos/gallerynavbar/Default Profile.png";

  return (
    <div className="relative">
      <nav className="bg-black text-white fixed h-screen w-64 top-0 z-50 py-4 pl-6 flex flex-col justify-between">
        <div className="flex flex-col items-start space-y-6">
          {/* Left Section - Navigation Links */}
          <ul className="flex flex-col space-y-4 text-gray-300 font-medium">
            <li>
              <Link to="/profile" className="hover:text-white">
                <div className="grid grid-cols-12 border-b mt-3 mb-2 items-center">
                  <div className="col-span-3 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
                      <img
                        src={user.userProfile?.profileUrl || defaultProfilePic}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="col-span-9 ml-2 mt-3">
                    <p className="font-semibold text-gray-200 mb-0">
                      {user.userProfile?.fullName || user.userName || "User Name"}
                    </p>
                    <p className="text-sm text-gray-400 truncate max-w-[150px]">
                      {user.email || "email@example.com"}
                    </p>
                    <div className="absolute right-1 top-10">
                    <IoIosArrowDropright className="text-gray-400 text-xl" />
                  </div>
                  </div>
                </div>
              </Link>
            </li>
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
