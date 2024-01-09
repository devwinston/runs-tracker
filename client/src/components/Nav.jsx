import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaHome, FaPlusCircle, FaUserPlus, FaUserCheck } from "react-icons/fa";

import Modal from "./Modal";
import Logo from "../assets/images/logo.png";

const Nav = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="nav">
      <div
        className="overlay"
        style={{ display: showModal ? "block" : "none" }}
      >
        <Modal setShowModal={setShowModal} />
      </div>

      <div className="links">
        <img className="logo" src={Logo} alt="logo" onClick={handleClick} />
        <NavLink to="/">
          <FaHome /> Home
        </NavLink>
        <NavLink onClick={() => setShowModal(true)}>
          <FaPlusCircle /> Create
        </NavLink>
      </div>

      <div className="user-links">
        <NavLink to="/signup">
          <FaUserPlus /> Register
        </NavLink>
        <NavLink to="/signin">
          <FaUserCheck /> Log In
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
