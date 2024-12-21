import React from "react";
import { Routes, Route } from 'react-router-dom'
import MyRouter from "./router/routes.js"; // Assuming MyRouter handles your app's routes
import Navbar from "./components/navbar.js";
import Login from "./login/Login.js";
import useToken from "./login/useToken.js";
import Register from "./login/Register.js";

function App() {
  const { token, setToken } = useToken();
  console.log('token')
  console.log(token)

  return (
    <>
      {/* Only one Router here at the top level */}
      <div className="App">
        {!token ? (
          // If no token, show login route
          
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              {/* Optionally handle "*" route to redirect to login if needed */}
              <Route path="*" element={<Login setToken={setToken} />} />
            </Routes>
        ) : (
          // If token exists, show the main app layout
          <>
            <Navbar setToken={setToken} />
            <MyRouter />
          </>
        )}
      </div>
    </>
  );
}

export default App;
