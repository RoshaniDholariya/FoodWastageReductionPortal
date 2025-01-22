import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/login", formData);
      alert("Login successful!");
    } catch (error) {
      alert("Error logging in!");
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const { tokenId } = response;
      await axios.post("http://localhost:5000/api/auth/google-login", {
        token: tokenId,
      });
      alert("Google Login successful!");
    } catch (error) {
      alert("Google Login failed!");
    }
  };

  const handleGoogleFailure = () => {
    alert("Google Login failed!");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="Login with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default Login;
