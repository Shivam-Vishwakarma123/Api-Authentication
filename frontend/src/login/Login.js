import React, { useState } from "react";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch("http://localhost:5000/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((response) => response.json());
}

export default function Login({ setToken }) {

  // Set the state
  const [user_name, setUserName] = useState();
  const [password, setPassword] = useState();

  // Handle the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      user_name,
      password,
    });

    // This set the response fron login as token. In token there is data and token available this token will use as bearer token.
    setToken(token);
  };

  // Return the view
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
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </label>
                <br />
                <br />
                <label>
                  <h5 className="text-start">Password</h5>
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <br />
                <br />
                <div>
                  <button type="submit" className="btn btn-success p-2 px-4">
                    Log In
                  </button>
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
