import React from "react";
import {Link} from "react-router-dom";
import "./style.css";
import logo from "../Nav/4corners_white.png";
import API from "../../utils/API"

function Nav(props) {

  const logout = () => {
    API.logoutUser()
      .then(props.changeState("isAuthenticated", false))
}

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <img className="navLogo" src={logo} alt="Logo"/>
  
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/Person">{props.userData.firstName}'s Page</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Team">Kanban Board</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Resources">LookUp Resources</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/" onClick={logout}>Logout</a>
        </li> 
      </ul>
    </nav>
  );
}

export default Nav;
