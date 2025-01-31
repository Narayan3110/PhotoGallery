import axios from "axios";

// export USER_NAME_SESSION_ATTRIBUTE-NAME

export class AuthService{

// Service class interacts with REST API
// Service method to post RESTAPI of user Information
  static async registerUser(formData) {
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:9090/api/users/register', formData);
      return response.data; // Return the response data (you can modify this as needed)
    } catch (error) {
      console.error("Error in Registration Process:", error);
      throw error; // Throw the error to be caught in the component
    }
  }

  // Service method to POST login credentials and receive user information
  static async loginUser(usernameOrEmail, password) {
    try {
      // Make the POST request to the backend login endpoint
      const response = await axios.post("http://localhost:9090/api/users/login", {
          userName: usernameOrEmail, // Sending username or email
          password, // Sending the password
      });
      // Return the response data if the request is successful
      return response.data;
    } 
    catch (error) {
      console.error("Error during login process:", error);

      // If the backend returns an error response, capture and throw it
      if (error.response && error.response.data) {
          throw new Error(error.response.data);
      } else {
          // Throw a generic error message if no backend message is available
          throw new Error("An error occurred during the login process. Please try again.");
      }
    }
  }
}
  
export default AuthService
  