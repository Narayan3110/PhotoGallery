import axios from 'axios';

// Create an Axios instance with base URL and interceptors
const apiClient = axios.create({
  baseURL: 'http://localhost:9090/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for Authorization headers if needed
apiClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = Bearer$;
    {
      token;
    }
  }
  return config;
});

export class AuthService {
  // Register user
  static async registerUser(userData) {
    try {
      const response = await apiClient.post('/users/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error in Registration Process:', error);
      throw error.response?.data || new Error('Registration failed.');
    }
  }

  // Login user
  static async loginUser(usernameOrEmail, password) {
    try {
      const response = await apiClient.post('/users/login', {
        userName: usernameOrEmail,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error during login process:', error);
      throw error.response?.data?.message || new Error('Login failed.');
    }
  }

  // Google login
  static async googleLogin(authCode) {
    try {
      // Send the auth code received from Google to the backend
      const response = await apiClient.post('/oauth2/google', {
        code: authCode,
      });
      return response.data;
    } catch (error) {
      console.error('Error during Google login:', error);
      throw error.response?.data?.message || new Error('Google login failed.');
    }
  }
}

export default AuthService;
