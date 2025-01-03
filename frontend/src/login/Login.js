import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

async function loginUser(credentials) {
  try {
    const response = await fetch("http://localhost:5000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid username or password");
    }

    return data; // Assuming the API returns a token or user data
  } catch (error) {
    throw new Error(error.message || "An error occurred");
  }
}

export default function Login({ setToken }) {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!user_name || !password) {
      setErrorMessage("Username and password are required");
      return;
    }

    setErrorMessage(""); // Clear previous error message
    setIsLoading(true); // Set loading state to true

    try {
      const response = await loginUser({ user_name, password });

      // Assuming the response contains the token
      setToken(response); // Set token in state or storage

      // Navigate to the dashboard or another protected page after successful login
      navigate("/employee");

    } catch (error) {
      setErrorMessage(error.message); // Show error message if login fails
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="container my-5 mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-12">
          <div className="card text-center">
            <div className="card-header" style={{ background: "#d4dcff" }}>
              <h3>Please Log In</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <label>
                  <h5 className="text-start my-2">Username</h5>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    value={user_name}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  <h5 className="text-start">Password</h5>
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <br />
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <div>
                  <button type="submit" className="btn btn-success p-2 my-3 px-4" disabled={isLoading}>
                    {isLoading ? "Logging In..." : "Log In"}
                  </button>
                  <Link to="/register" className="my-4 float-end">
                    Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
