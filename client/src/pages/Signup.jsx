import React, { useState } from "react";
import { FaUserPlus, FaCheck } from "react-icons/fa";

import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = formData;
  const { signup, error, loading } = useSignup();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(formData);

    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="sign">
      <h1>
        <FaUserPlus /> Sign Up
      </h1>

      <form onSubmit={handleSubmit}>
        <h2>Username</h2>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleChange}
          maxLength={15}
          required
        />

        <h2>Email</h2>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
          required
        />

        <h2>Password</h2>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? (
            "Loading"
          ) : (
            <>
              <FaCheck /> Sign Up
            </>
          )}
        </button>

        {error && <p className="error-message">Error: {error}</p>}
      </form>
    </div>
  );
};

export default Signup;
