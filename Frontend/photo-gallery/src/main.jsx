import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider from react-redux
import App from "./App.jsx";
import store from "./redux/store"; // Import your Redux store
import "./index.css";

// Wrap the App component in the Provider and pass the Redux store
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* Redux Provider component to provide the store to your app */}
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
