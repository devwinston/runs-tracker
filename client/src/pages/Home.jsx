import React, { useEffect, useState } from "react";
import { FaChartLine, FaHistory, FaInfoCircle } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

import { useRunContext } from "../hooks/useRunContext";

const Home = () => {
  const { runs, stats, dispatch } = useRunContext();
  const [editId, setEditId] = useState("");
  const [formData, setFormData] = useState({
    distance: "",
    minutes: "",
    seconds: "",
    temperature: "",
    weight: "",
  });
  const { distance, minutes, seconds, temperature, weight } = formData;

  useEffect(() => {
    const fetchRuns = async () => {
      // add proxy in package.json to prevent Cross Origin Resource Sharing (CORS) error
      const response = await fetch("/api/runs");

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_RUNS", payload: json });
        dispatch({ type: "COMPUTE_STATS" });
      }
    };

    fetchRuns();
  }, [dispatch]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      weekday: "short",
    });

    return formattedDate;
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/runs/${id}`, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_RUN", payload: json });
      dispatch({ type: "COMPUTE_STATS" });
    }
  };

  const handleEdit = async (run) => {
    if (run._id === editId) {
      const response = await fetch(`/api/runs/${run._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "UPDATE_RUN", payload: json });
        dispatch({ type: "COMPUTE_STATS" });
        setEditId("");
      }
    } else {
      setEditId(run._id);
      setFormData({
        distance: run.distance,
        minutes: run.duration.minutes,
        seconds: run.duration.seconds,
        temperature: run.temperature,
        weight: run.weight,
      });
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: Number(e.target.value),
    }));
  };

  return (
    <div className="home">
      <div className="stats">
        <h1>
          <FaChartLine /> Statistics
        </h1>
        <div className="stats-data">
          <div className="card">
            <div className="card-title">
              <h2>
                Cumulative Mileage
                <div className="tooltip">
                  <FaInfoCircle />
                  <span className="tooltip-text">
                    Total mileage in last 30 days.
                  </span>
                </div>
              </h2>
            </div>
            <div className="card-content">
              {stats.cumulativeMileage.toFixed(1)} km
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              <h2>
                Moving Mileage
                <div className="tooltip">
                  <FaInfoCircle />
                  <span className="tooltip-text">
                    Average mileage in last 30 days.
                  </span>
                </div>
              </h2>
            </div>
            <div className="card-content">
              {stats.movingMileage.toFixed(1)} km
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              <h2>
                Moving Pace
                <div className="tooltip">
                  <FaInfoCircle />
                  <span className="tooltip-text">
                    Average pace in last 30 days.
                  </span>
                </div>
              </h2>
            </div>
            <div className="card-content">
              {stats.movingPace.minutes.toFixed(0)} m{" "}
              {stats.movingPace.seconds.toFixed(0)} s
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              <h2>
                Average Pace
                <div className="tooltip">
                  <FaInfoCircle />
                  <span className="tooltip-text">All-time average pace.</span>
                </div>
              </h2>
            </div>
            <div className="card-content">
              {stats.averagePace.minutes.toFixed(0)} m{" "}
              {stats.averagePace.seconds.toFixed(0)} s
            </div>
          </div>
        </div>
      </div>

      <div className="history">
        <h1>
          <FaHistory /> History
        </h1>
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>Date</th>
              <th rowSpan={2}>Distance (km)</th>
              <th colSpan={2}>Duration</th>
              <th colSpan={2}>Pace</th>
              <th rowSpan={2}>Temperature (&deg;C)</th>
              <th rowSpan={2}>Weight (kg)</th>
              <th rowSpan={2}></th>
            </tr>
            <tr>
              <th>min</th>
              <th>sec</th>
              <th>min</th>
              <th>sec</th>
            </tr>
          </thead>

          <tbody>
            {runs && runs.length > 0 ? (
              runs.map((run) => (
                <tr key={run._id}>
                  <td>{formatDate(run.createdAt)}</td>
                  <td>
                    <input
                      type="number"
                      id="distance"
                      value={run._id !== editId ? run.distance : distance}
                      onChange={handleChange}
                      min="0"
                      step="0.1"
                      required
                      disabled={run._id !== editId}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      id="minutes"
                      value={
                        run._id !== editId
                          ? Math.round(run.duration.minutes)
                          : minutes
                      }
                      onChange={handleChange}
                      min="1"
                      required
                      disabled={run._id !== editId}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      id="seconds"
                      value={
                        run._id !== editId
                          ? Math.round(run.duration.seconds)
                          : seconds
                      }
                      onChange={handleChange}
                      min="0"
                      max="59"
                      required
                      disabled={run._id !== editId}
                    />
                  </td>

                  <td>
                    <input
                      value={Math.round(run.pace.minutes)}
                      disabled={true}
                    />
                  </td>

                  <td>
                    <input
                      value={Math.round(run.pace.seconds)}
                      disabled={true}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      id="temperature"
                      value={run._id !== editId ? run.temperature : temperature}
                      onChange={handleChange}
                      min="0"
                      step="0.1"
                      required
                      disabled={run._id !== editId}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      id="weight"
                      value={run._id !== editId ? run.weight : weight}
                      onChange={handleChange}
                      min="0"
                      step="0.1"
                      required
                      disabled={run._id !== editId}
                    />
                  </td>

                  <td>
                    <MdEdit
                      className="edit-icon"
                      onClick={() => handleEdit(run)}
                      style={{
                        color: run._id === editId && "var(--orange)",
                      }}
                    />{" "}
                    <MdDelete
                      className="delete-icon"
                      onClick={() => handleDelete(run._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>No run data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
