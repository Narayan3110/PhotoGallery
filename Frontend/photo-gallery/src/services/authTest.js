import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice"; // Import the login action

// Get the backend URL from environment variables
const BACKEND_URL =
  import.meta.env.VITE_BACK_END_URL || "http://localhost:9090/api/";

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor for Authorization headers if needed
apiClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export class AuthService {
  // Register user
  static async registerUser(userData) {
    try {
      const response = await apiClient.post("users/register", userData);
      return response.data;
    } catch (error) {
      console.error("Error in Registration Process:", error);
      throw error.response?.data || new Error("Registration failed.");
    }
  }

  // Login user
  static async loginUser(usernameOrEmail, password, dispatch) {
    // console.log("Credentials : " + usernameOrEmail + " " + password);
    try {
      const response = await apiClient.post("/users/login", {
        userName: usernameOrEmail,
        password,
      });
      // console.log(response.data.user);
      if (response.data) {
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

  // // Google login
  // static async googleLogin(authCode) {
  //   try {
  //     const response = await apiClient.post("/oauth2/google", {
  //       code: authCode,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error during Google login:", error);
  //     throw error.response?.data?.message || new Error("Google login failed.");
  //   }
  // }
  static async exchangeAuthCode(authCode) {
    console.log("AuthCode : " + authCode);
    try {
      // Send auth code to backend
      const response = await axios.post(
        "http://localhost:9090/api/users/google-login",
        {
          code: authCode,
        }
      );

      // Store user details & token
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      console.error("Error during Google login:", error);
      throw error.response?.data?.message || new Error("Google login failed.");
    }
  }
}

export default AuthService;
