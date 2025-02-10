import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import axios from "axios";
import rectangleImage from "../assets/photos/resetPassword/Rectangle.jpg";

const ResetEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://photogallery-deployement-latest.onrender.com/api/users/reset-email",
        { email }
      );
      setMessage(
        response.data.message || "A reset link has been sent to your email."
      );
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 ">
      <div className="w-full max-w-3xl flex bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 p-6">
          <Link to="/login" className="text-sm text-gray-500  hover:text-red-500">
            &larr; Back to login
          </Link>
          <h2 className="mt-4 text-2xl font-boldmb-4">
            Forgot your password?
          </h2>
          <p className="mt-2 text-gray-600 ">
            Don't worry, happens to all of us. Enter your email below to recover
            your password.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 mb-2">
            <div className="relative ">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border rounded w-full p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
          {message && <p className="mt-2 text-green-500">{message}</p>}
          {/* <div className="mt-4 flex items-center justify-center gap-2">
            <button className="border px-4 py-2 rounded">Facebook</button>
            <button className="border px-4 py-2 rounded">Google</button>
            <button className="border px-4 py-2 rounded">Apple</button>
          </div> */}
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-gray-50 flex items-center justify-center p-6">
          <img src={rectangleImage} alt="Reset Password" className="w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default ResetEmail;
