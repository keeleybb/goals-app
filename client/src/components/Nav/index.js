import React, { useContext, Link } from "react";
import userContext from '../../utils/userContext'
import API from "../../utils/API"

function Nav(props) {
  const { user } = useContext(userContext)

  const handleLogout = () => {
    API.logout().then(res => {
      window.location.assign("/");
    });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        {user ? `Hi ${user.username}, Welcome To ` : ""} Surată
      </a>
      <ul className="right hide-on-med-and-down">
        <li><a href="/goals">My Goals</a></li>
        <li><a href="/calendar">My Plan</a></li>
        <li><a href="/pomodor">My Time</a></li>
        <li><a href="/mysoul">My Soul</a></li>
        <li><a href="#">My Food</a></li>
        <li><a onClick={handleLogout}>{props.isLoggedIn ? 'Log Out' : 'Sign Up/Log In'}</a></li>
      </ul>
    </nav>
  );
}

export default Nav;
