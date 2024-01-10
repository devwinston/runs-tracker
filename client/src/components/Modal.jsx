import React, { useState } from "react";
import { FaPlusCircle, FaWindowClose } from "react-icons/fa";

import { useAuthContext } from "../hooks/useAuthContext";
import { useRunContext } from "../hooks/useRunContext";

const Modal = ({ setShowModal }) => {
  const { user } = useAuthContext();
  const { dispatch } = useRunContext();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    distance: "",
    minutes: "",
    seconds: "",
    temperature: "",
    weight: "",
  });
  const { distance, minutes, seconds, temperature, weight } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: Number(e.target.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Not authorised");
      return;
    }

    const response = await fetch("/api/runs", {
      method: "POST",
      headers: {
        authorisation: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      setShowModal(false);

      dispatch({ type: "ADD_RUN", payload: json });
      dispatch({ type: "COMPUTE_STATS" });
      setFormData({
        distance: "",
        minutes: "",
        seconds: "",
        temperature: "",
        weight: "",
      });
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <div className="close-container">
          <FaWindowClose
            className="close-icon"
            onClick={() => setShowModal(false)}
          />
        </div>

        <h2>Distance (km)</h2>
        <input
          type="number"
          id="distance"
          value={distance}
          onChange={handleChange}
          min="0"
          step="0.1"
          autoComplete="off"
          required
        />

        <h2>Minutes</h2>
        <input
          type="number"
          id="minutes"
          value={minutes}
          onChange={handleChange}
          min="0"
          autoComplete="off"
          required
        />

        <h2>Seconds</h2>
        <input
          type="number"
          id="seconds"
          value={seconds}
          onChange={handleChange}
          min="1"
          max="59"
          autoComplete="off"
          required
        />

        <h2>Temperature (&deg;C)</h2>
        <input
          type="number"
          id="temperature"
          value={temperature}
          onChange={handleChange}
          min="0"
          step="0.1"
          autoComplete="off"
          required
        />

        <h2>Weight (kg)</h2>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={handleChange}
          min="0"
          step="0.1"
          autoComplete="off"
          required
        />

        <button type="submit">
          <FaPlusCircle /> Create
        </button>

        {error && <p className="error-message">Error: {error}</p>}
      </form>
    </div>
  );
};

export default Modal;
