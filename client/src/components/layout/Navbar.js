import React from 'react'
import { Link } from 'react-router-dom';
import depopLogo from'../../img/depop_logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={depopLogo} alt="depopLogo" className="logo"/>
      </Link>
      <Link to="/login" className="login">
        Login
      </Link>
    </nav>
  )
}

export default Navbar