// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/authSlice";
// import { useState } from "react";
// import { LogOut, Menu, X } from "lucide-react";
// import logo1 from "@/assets/photos/Navbar/logo1.png";
// import { Button } from "@/components/ui/button";

// const Navbar = () => {
//   const user = useSelector((state) => state.auth.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white py-3 w-full top-0 z-50 shadow-md">
//       <div className="container mx-auto flex items-center justify-between px-6 max-w-6xl">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <img src={logo1} alt="Logo" className="h-8 w-auto" />
//           <span className="text-xl font-bold font-[Satisfy] text-black">
//             SnapSafe
//           </span>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-gray-700"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>

//         {/* Desktop Navigation */}
//         <ul className="hidden md:flex space-x-6 bg-white px-4 py-2 rounded-full shadow-md text-gray-700 font-medium">
//           <li>
//             <Link to="/" className="hover:text-orange-600">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/about" className="hover:text-orange-600">
//               Team
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" className="hover:text-orange-600">
//               Contact
//             </Link>
//           </li>
//           {user && (
//             <li>
//               <Link to="/gallery" className="hover:text-orange-600">
//                 Gallery
//               </Link>
//             </li>
//           )}
//         </ul>

//         {/* Desktop Buttons */}
//         <div className="hidden md:flex items-center space-x-4">
//           {user ? (
//             <button
//               onClick={handleLogout}
//               className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//             >
//               <LogOut className="h-5 w-5 mr-2" /> Logout
//             </button>
//           ) : (
//             <div className="flex space-x-3">
//               <Link
//                 to="/login"
//                 className="px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition shadow-md"
//               >
//                 Log In
//               </Link>
//               <Link
//                 to="/register"
//                 className="px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition shadow-md"
//               >
//                 Register
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Navigation Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow-lg">
//           <ul className="text-gray-700 text-lg">
//             <li>
//               <Link to="/" className="block py-2 hover:text-orange-600">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/about" className="block py-2 hover:text-orange-600">
//                 Team
//               </Link>
//             </li>
//             <li>
//               <Link to="/contact" className="block py-2 hover:text-orange-600">
//                 Contact
//               </Link>
//             </li>
//             {user && (
//               <li>
//                 <Link
//                   to="/gallery"
//                   className="block py-2 hover:text-orange-600"
//                 >
//                   Gallery
//                 </Link>
//               </li>
//             )}
//           </ul>
//           <div className="flex flex-col space-y-3">
//             {user ? (
//               <button
//                 onClick={handleLogout}
//                 className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="block text-center bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition"
//                 >
//                   Log In
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="block text-center bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import logo1 from "@/assets/photos/Navbar/logo1.png";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const isAdmin = user?.role?.roleName === "ADMIN"; // Check if user is ADMIN

  return (
    <nav className="bg-white py-3 w-full top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 max-w-6xl">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo1} alt="Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold font-[Satisfy] text-black">
            SnapSafe
          </span>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 bg-white px-4 py-2 rounded-full shadow-md text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-orange-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-orange-600">
              Team
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-orange-600">
              Contact
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/gallery" className="hover:text-orange-600">
                Gallery
              </Link>
            </li>
          )}
          {/* Show Admin Page Only for ADMIN Users */}
          {isAdmin && (
            <li>
              <Link to="/admin" className="hover:text-orange-600 font-bold">
                Admin
              </Link>
            </li>
          )}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut className="h-5 w-5 mr-2" /> Logout
            </button>
          ) : (
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition shadow-md"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow-lg">
          <ul className="text-gray-700 text-lg">
            <li>
              <Link to="/" className="block py-2 hover:text-orange-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 hover:text-orange-600">
                Team
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 hover:text-orange-600">
                Contact
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to="/gallery"
                  className="block py-2 hover:text-orange-600"
                >
                  Gallery
                </Link>
              </li>
            )}
            {/* Show Admin Page Only for ADMIN Users */}
            {isAdmin && (
              <li>
                <Link
                  to="/admin"
                  className="block py-2 hover:text-orange-600 font-bold"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
          <div className="flex flex-col space-y-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-center bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="block text-center bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
