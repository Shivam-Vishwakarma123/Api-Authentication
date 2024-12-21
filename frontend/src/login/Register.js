import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

async function registerUser(credentials) {
  try {
    const response = await fetch("http://localhost:5000/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
    
    return data; // Assuming the API returns a token or success message
  } catch (error) {
    throw new Error(error.message || "An error occurred");
  }
}

export default function Register() {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle the form submission
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
      const response = await registerUser({ user_name, password });

      // Navigate to login page after successful registration
      navigate("/login");

    } catch (error) {
      setErrorMessage(error.message); // Show error message
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
              <h3>Please Register</h3>
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
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                  <Link to="/login" className="my-4 float-end">
                    Login
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
