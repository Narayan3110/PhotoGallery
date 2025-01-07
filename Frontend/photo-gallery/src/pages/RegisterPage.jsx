import React, { useState } from "react";
import AuthService from '../services/authService';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
});
  const [confirmpassword, setConfirmpassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(""); // To handle error messages

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (formData.password !== confirmpassword) {
      setErrorMessage("Passwords do not match!");
//      alert("Passwords do not match!");
      return;
    }

    try {
      // Call AuthService to register the user
      const response = await AuthService.registerUser(formData);
      alert("Signup successful!");
      console.log("User registered successfully:", response);
      // Optionally redirect the user to the login page
      // For example: window.location.href = "/login";
    } catch (error) {
      setErrorMessage("Error during registration. Please try again.");
      console.error("Error during registration:", error);
    }
  };

  //   try {
  //     // Send data to backend
  //     const response = await fetch(("http://localhost:9090/api/users/register"), {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       alert("Signup successful!");
  //       // Optionally redirect the user
  //     } else {
  //       const errorData = await response.json();
  //       alert(`Signup failed: ${errorData.message}`);
  //     }
  //   } catch (error) {
  //     alert(`Error: ${error.message}`);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center">
      <div className="flex-1"></div>

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white bg-opacity-50 shadow-2xl rounded-lg p-8 w-full max-w-md transform transition duration-300 hover:scale-105 hover:bg-opacity-80 backdrop-filter backdrop-blur-lg">
          <div className="text-center mb-6">
            <img
              src="path_to_logo.png"
              alt="Logo"
              className="h-12 mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h2>
            <p className="text-sm text-gray-600">
              Join us and start your journey!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                name="userName"
                placeholder="Enter your username"
                className="form-input w-full border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="form-input w-full border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="form-input w-full border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="form-input w-full border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.confirmPassword}
                // onChange={handleChange}
                onChange={(e) => setConfirmpassword(e.target.value)}
                />
            </div>
            {errorMessage && (<p className="text-red-500 text-center">{errorMessage}</p>)}

            <button
              type="submit"
              className="w-full py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold hover:opacity-90 transition-opacity"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
