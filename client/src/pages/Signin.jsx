import React, { useState } from "react";
import { FaUserCheck, FaCheck } from "react-icons/fa";

import { useSignin } from "../hooks/useSignin";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { signin, error, loading } = useSignin();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signin(formData);

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="sign">
      <h1>
        <FaUserCheck /> Sign In
      </h1>

      <form onSubmit={handleSubmit}>
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
              <FaCheck /> Sign In
            </>
          )}
        </button>

        {error && <p className="error-message">Error: {error}</p>}
      </form>
    </div>
  );
};

export default Signin;
