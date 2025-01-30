import { useState } from "react";
import AuthService from "../services/authTest";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
<<<<<<< HEAD
    userName: '',
    email: '',
    password: ''
=======
    userName: "",
    email: "",
    password: "",
>>>>>>> 59cc755ddb6dfc7d994b60c90e075b5117cfc289
  });
  const [confirmpassword, setConfirmpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmpassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await AuthService.registerUser(formData);
      alert("Signup successful!");
      window.location.href = "/login";
    } catch (error) {
      setErrorMessage("Error during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-screen bg-gray-100">
      {/* Left Section: Form */}
      <div className="flex flex-1 flex-col justify-center items-center bg-white shadow-lg">
        <div className="p-12 flex flex-col items-center w-[30rem]">
        <h1 className="text-5xl font-bold mb-4 font-satisfy text-black">
  नमस्ते
</h1>

          <p className="text-gray-500 mb-6">Join us and start your journey!</p>
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                name="userName"
                placeholder="Enter your username"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/3 transform -translate-y-1/2 text-gray-500 bg-transparent hover:bg-transparent focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-1 top-1/3 transform -translate-y-1/2 text-gray-500 bg-transparent hover:bg-transparent focus:outline-none"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 text-white bg-black rounded-md hover:bg-gray-800"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <div className="flex items-center justify-center p-2 mt-4">
            <p className="text-base text-gray-700">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-white">
        <img
          src="/photo/registrationPage/registrationMain.jpg"
          alt="Signup illustration"
          className="h-screen w-full object-cover bg-white p-4 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default SignupPage;
