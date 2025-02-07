import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice"; // Import the login action

// Create an Axios instance with base URL and interceptors
const apiClient = axios.create({
  baseURL: "http://localhost:9090/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor for Authorization headers if needed
apiClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Correct string interpolation
  }
  return config;
});

export class AuthService {
  // Register user
  static async registerUser(userData) {
    try {
      const response = await apiClient.post("/users/register", userData);
      return response.data;
    } catch (error) {
      console.error("Error in Registration Process:", error);
      throw error.response?.data || new Error("Registration failed.");
    }
  }

  // Login user
  static async loginUser(usernameOrEmail, password, dispatch) {
    console.log("Credentials : " + usernameOrEmail + " " + password);
    try {
      const response = await apiClient.post("/users/login", {
        userName: usernameOrEmail,
        password,
      });
      console.log(response.data.user);
      if (response.data) {
        // After login success, dispatch the login action to Redux
        dispatch(
          login({
            token: response.data.token,
            user: response.data.user,
          })
        );

        return response.data;
      }
    } catch (error) {
      console.error("Error during login process:", error);
      throw error.response?.data?.message || new Error("Login failed.");
    }
  }

  // Google login
  static async googleLogin(authCode) {
    try {
      // Send the auth code received from Google to the backend
      const response = await apiClient.post("/oauth2/google", {
        code: authCode,
      });
      return response.data;
    } catch (error) {
      console.error("Error during Google login:", error);
      throw error.response?.data?.message || new Error("Google login failed.");
    }
  }
}

export default AuthService;
