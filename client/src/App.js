import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Nav from "./components/Nav";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Nav />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
