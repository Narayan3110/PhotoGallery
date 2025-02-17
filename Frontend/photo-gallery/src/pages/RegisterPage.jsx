import { useState } from "react";
import AuthService from "../services/authTest";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "@/components/ui/toast";
import { ToastProvider } from "@radix-ui/react-toast";

const SignupPage = () => {
  const [formData, setFormData] = useState({ userName: "", email: "", password: "" });
  const [confirmpassword, setConfirmpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

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
      if (response) {
        setShowToast(true);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setErrorMessage("Error during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-screen bg-gray-100 px-4 sm:px-6 md:px-8">
      <ToastProvider>
        <div className="flex flex-1 flex-col justify-center items-center bg-white p-6 sm:p-10">
          <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 font-satisfy text-black text-center">नमस्ते</h1>
            <p className="text-gray-500 text-center mb-4">Join us and start your journey!</p>
            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-1">Username</label>
                <input type="text" name="userName" placeholder="Enter your username"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" 
                  value={formData.userName} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input type="email" name="email" placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm mb-1">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password"
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    value={formData.password} onChange={handleChange} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Confirm Password</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm your password"
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
              <button type="submit" className="w-full py-2 text-white bg-black rounded-md hover:bg-gray-800"
                disabled={isLoading}>{isLoading ? "Signing Up..." : "Sign Up"}</button>
            </form>
            <p className="text-center mt-4 text-gray-700">
              Already have an account? <Link to="/login" className="text-blue-500 hover:underline font-medium">Login</Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-white p-4">
          <img src="/photo/registrationPage/registrationMain.jpg" alt="Signup illustration"
            className="w-full max-w-xl object-cover rounded-lg" />
        </div>

        {showToast && (
          <Toast variant="success" className="bg-white text-black border border-gray-300 shadow-lg">
            <ToastTitle className="text-black">Registration Successful</ToastTitle>
            <ToastDescription className="text-gray-700">Verify your email to complete registration.</ToastDescription>
          </Toast>
        )}
        <ToastViewport className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[100] w-auto max-w-xs p-4" />
      </ToastProvider>
    </div>
  );
};

export default SignupPage;