import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const handleLogOut = () => {setClick(!click); localStorage.removeItem("token"); if(isAdmin){localStorage.removeItem("isAdmin")}window.location.reload();}
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>Vjaya Rahasyam</span>
            {/* <i className="fas fa-code"></i> */}
            <span className="icon">
              {/* <CodeIcon /> */}
            </span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              {isAdmin? (<NavLink
                exact
                to="/add-card"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Add Card
              </NavLink>): (<NavLink
                exact
                to="/all-cards"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                All Cards
              </NavLink>)}
            </li>
            
            <li  className="nav-item">
            {isAdmin? (<NavLink
                exact
                to="/admin-dashboard"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                DashBoard
              </NavLink>): (<NavLink
                exact
                to="/profile"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Profile
              </NavLink>)}
            </li>
            <li className="nav-item">
              {token ? (<NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleLogOut}
              >
                Logout
              </NavLink>) : (<NavLink
                exact
                to="/login"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Login
              </NavLink>)}
            </li>
            
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
                <HamburgetMenuClose />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
