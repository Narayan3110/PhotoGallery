import { useState } from "react";
import AuthService from "../services/authTest";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice"; // Import the login action

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("Admin1");
  const [password, setPassword] = useState("Sanm@3004");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!usernameOrEmail) {
      setError("Username or Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await AuthService.loginUser(
        usernameOrEmail,
        password,
        dispatch
      ); // Pass dispatch to AuthService
      if (response) {
        const name = response.user;
        // alert(`Hello ${name}\nLogin successful!\nRedirecting to HomePage...`);
        window.location.href = "/"; // Redirect to home page after login
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-screen bg-gray-100">
      {/* Left Section: Form */}
      <div className="flex flex-1 flex-col justify-center items-center bg-white shadow-lg">
        <div className="p-12 flex flex-col items-center w-[30rem]">
          <h1 className="text-5xl font-bold mb-4 font-[Satisfy] text-black">
            Welcome
          </h1>
          <p className="text-gray-500 mb-6">
            We are glad to see you back with us
          </p>
          <form className="w-full space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm mb-1">Username</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/7 text-gray-500 bg-transparent hover:bg-transparent focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 text-white bg-black rounded-md hover:bg-gray-800"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Next"}
            </button>
          </form>
          <div className="flex items-center justify-center p-2 mt-1 mb-0">
            <p className="text-base text-gray-700">
              New here?{" "}
              <a
                href="/register"
                className="text-blue-500 hover:underline font-medium"
              >
                Create an account
              </a>
            </p>
          </div>
          <p className="text-center text-gray-500 mt-0 mb-0">
            ---Login with Others---
          </p>
          <div className="flex space-x-4 mt-2">
            <button className="flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm">
              <img
                src="https://img.icons8.com/?size=100&id=17949&format=png"
                alt="Google"
                className="w-4 h-4 mr-2"
              />
              Login with Google
            </button>
          </div>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-white">
        <img
          src="/photo/LoginPage/LoginMain.jpg" // Replace with the actual path
          alt="Login illustration"
          className="h-screen w-full object-cover bg-white p-4 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default LoginPage;
