import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FaHome,
  FaPlusCircle,
  FaUserPlus,
  FaUserCheck,
  FaSignOutAlt,
} from "react-icons/fa";

import Modal from "./Modal";
import Logo from "../assets/images/logo.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignout } from "../hooks/useSignout";

const Nav = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthContext();
  const { signout } = useSignout();

  const navigate = useNavigate();

  return (
    <div className="nav">
      <div
        className="overlay"
        style={{ display: showModal ? "block" : "none" }}
      >
        <Modal setShowModal={setShowModal} />
      </div>

      <div className="links">
        <img
          className="logo"
          src={Logo}
          alt="logo"
          onClick={() => navigate("/")}
        />
        {user && (
          <>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
            <NavLink onClick={() => setShowModal(true)}>
              <FaPlusCircle /> Create
            </NavLink>
          </>
        )}
      </div>

      <div className="user-links">
        {!user && (
          <>
            <NavLink to="/signup">
              <FaUserPlus /> Sign Up
            </NavLink>
            <NavLink to="/signin">
              <FaUserCheck /> Sign In
            </NavLink>
          </>
        )}

        {user && (
          <>
            <p className="welcome">
              Welcome, <span>{user.username}</span>!
            </p>
            <NavLink to="/signin" onClick={() => signout()}>
              <FaSignOutAlt /> Sign Out
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
