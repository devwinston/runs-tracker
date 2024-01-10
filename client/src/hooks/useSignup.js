import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();

  const signup = async ({ username, email, password }) => {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    } else {
      setLoading(false);
      setError(null);

      // save token to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update auth context
      dispatch({ type: "SIGNIN", payload: json });

      navigate("/");
    }
  };

  return { signup, error, loading };
};
