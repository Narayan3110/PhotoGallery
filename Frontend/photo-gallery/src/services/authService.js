import axios from "axios";

/*
  Axios, which is a popular library is mainly used to send asynchronous 
  HTTP requests(GET,POST,PUT,DELETE) to REST endpoints. 
This library is very useful to perform CRUD operations.
This popular library is used to communicate with the backend. 
Axios supports the Promise API, native to JS ES6.
Using Axios we make API requests in our application. 
Once the request is made we get the data in Return, and then we use this data in our React APPL. 

> npm install axios

*/

// export USER_NAME_SESSION_ATTRIBUTE-NAME

export class AuthService{

// Service class interacts with REST API
    /*
    The async function declaration creates a binding of a new async function to a 
    given name. 
The await keyword is permitted within the function body, enabling asynchronous, promise-based behavior 
to be written in a cleaner style and avoiding the need to explicitly configure promise chains.
They are not coordinated with each other, meaning they could occur simultaneously or not 
because they have their own separate agenda.   
*/ 


// Service method to post RESTAPI of user Information
    static async registerUser(userData) {

    console.log(userData);

        try {
          const response = await axios.post('http://localhost:9090/api/users/register', userData);
          return response.data; // Return the response data (you can modify this as needed)
        } catch (error) {
          console.error("Error in Registration Process:", error);
          throw error; // Throw the error to be caught in the component
        }
      }

  }
  
export default AuthService
  